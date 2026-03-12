import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const getMock = vi.fn();
const createMock = vi.fn();

class MockResend {
  contacts = {
    get: getMock,
    create: createMock,
  };
}

vi.mock("resend", () => ({
  Resend: MockResend,
}));

async function loadHandler() {
  const routeModule = await import("./route");
  return routeModule.POST;
}

describe("POST /api/subscribe", () => {
  const originalApiKey = process.env.RESEND_API_KEY;
  const originalAudienceId = process.env.RESEND_AUDIENCE_ID;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_AUDIENCE_ID = "aud_test";
    getMock.mockReset();
    createMock.mockReset();
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalApiKey;
    process.env.RESEND_AUDIENCE_ID = originalAudienceId;
  });

  test("rejects malformed request bodies", async () => {
    const POST = await loadHandler();
    const request = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{invalid",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "A valid JSON body is required",
    });
  });

  test("returns success without creating a duplicate contact when the email already exists", async () => {
    const POST = await loadHandler();
    getMock.mockResolvedValue({
      data: { id: "contact_123" },
      error: null,
    });

    const request = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "person@example.com",
        source: "homepage",
        variant: "default",
        path: "/",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(createMock).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      source: "homepage",
      variant: "default",
      path: "/",
    });
  });

  test("creates a contact with attribution properties for new subscribers", async () => {
    const POST = await loadHandler();
    getMock.mockResolvedValue({
      data: null,
      error: { message: "Not found" },
    });
    createMock.mockResolvedValue({
      data: { id: "contact_456" },
      error: null,
    });

    const request = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "new@example.com",
        source: "history-hub",
        variant: "default",
        path: "/history",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(createMock).toHaveBeenCalledWith({
      email: "new@example.com",
      audienceId: "aud_test",
      properties: {
        signup_source: "history-hub",
        signup_variant: "default",
        signup_path: "/history",
      },
    });
    await expect(response.json()).resolves.toMatchObject({
      success: true,
    });
  });

  test("short-circuits honeypot submissions without calling Resend", async () => {
    const POST = await loadHandler();

    const request = new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "bot@example.com",
        website: "https://spam.example",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(getMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toMatchObject({
      success: true,
    });
  });
});
