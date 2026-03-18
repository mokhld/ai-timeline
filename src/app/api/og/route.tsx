import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "AI Timeline";
  const subtitle = searchParams.get("subtitle") ?? "";
  const type = searchParams.get("type") ?? "default";

  const accentColor =
    type === "era"
      ? "#818cf8"
      : type === "milestone"
        ? "#22d3ee"
        : type === "category"
          ? "#34d399"
          : type === "tag"
            ? "#a78bfa"
            : type === "year"
              ? "#fbbf24"
              : "#6366f1";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "80px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          }}
        />

        {/* Type badge */}
        {type !== "default" && (
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: accentColor,
                textTransform: "uppercase",
                letterSpacing: "3px",
                background: `${accentColor}15`,
                padding: "6px 16px",
                borderRadius: "6px",
                border: `1px solid ${accentColor}30`,
              }}
            >
              {type}
            </div>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? "48px" : "56px",
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: subtitle ? "16px" : "0",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "800px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Brand footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${accentColor}, #6366f1)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              AI
            </div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#94a3b8" }}>
              aitimeline.world
            </div>
          </div>
          <div style={{ fontSize: "16px", color: "#475569" }}>
            The Complete History of Artificial Intelligence
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
