import { Resend } from "resend";
import { NextResponse } from "next/server";

interface SubscribeRequestBody {
  email?: unknown;
  source?: unknown;
  variant?: unknown;
  path?: unknown;
  website?: unknown;
}

function getSafeString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: SubscribeRequestBody;

  try {
    body = (await request.json()) as SubscribeRequestBody;
  } catch {
    return NextResponse.json(
      { error: "A valid JSON body is required" },
      { status: 400 }
    );
  }

  try {
    const { email, source, variant, path, website } = body;
    const safeEmail = getSafeString(email);
    const honeypotValue = getSafeString(website);

    if (!safeEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (honeypotValue) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!isValidEmail(safeEmail)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: "Newsletter is not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const safeSource = getSafeString(source);
    const safeVariant = getSafeString(variant);
    const safePath = getSafeString(path);
    const existingContact = await resend.contacts.get({
      audienceId,
      email: safeEmail,
    });

    if (existingContact.data?.id) {
      return NextResponse.json({
        success: true,
        source: safeSource,
        variant: safeVariant,
        path: safePath,
      });
    }

    await resend.contacts.create({
      email: safeEmail,
      audienceId,
      properties: {
        signup_source: safeSource ?? null,
        signup_variant: safeVariant ?? null,
        signup_path: safePath ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      source: safeSource,
      variant: safeVariant,
      path: safePath,
    });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
