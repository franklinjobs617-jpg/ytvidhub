import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!url) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";
    const backendResponse = await fetch(
      "https://ytdlp.vistaflyer.com/api/guest-ai-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}),
          ...(userAgent ? { "User-Agent": userAgent } : {}),
        },
        body: JSON.stringify({ url }),
      },
    );

    if (!backendResponse.ok) {
      const payload = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(payload, { status: backendResponse.status });
    }

    return new NextResponse(backendResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Accel-Buffering": "no",
        "Cache-Control": "no-cache, no-transform",
        ...(backendResponse.headers.get("x-guest-credits-left")
          ? {
              "X-Guest-Credits-Left": backendResponse.headers.get(
                "x-guest-credits-left",
              )!,
            }
          : {}),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal server error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 },
    );
  }
}
