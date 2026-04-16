import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

type NullableString = string | null;

interface FeedbackContextPayload {
  pageUrl?: unknown;
  pagePath?: unknown;
  actionPath?: unknown;
  referrer?: unknown;
  timezone?: unknown;
  browserLang?: unknown;
  deviceType?: unknown;
  platform?: unknown;
  userAgent?: unknown;
  viewport?: {
    width?: unknown;
    height?: unknown;
  };
  screen?: {
    width?: unknown;
    height?: unknown;
  };
  screenshot?: unknown;
}

interface FeedbackPayload {
  message?: unknown;
  contact?: unknown;
  quickType?: unknown;
  helpfulVote?: unknown;
  triggerSource?: unknown;
  context?: FeedbackContextPayload;
}

const MAX_MESSAGE_LENGTH = 5000;
const MAX_CONTACT_LENGTH = 320;
const MAX_TEXT_FIELD_LENGTH = 2000;
const MAX_SCREENSHOT_LENGTH = 2_500_000;
const MAX_ACTION_PATH_ITEMS = 12;
const QUICK_TYPES = new Set([
  "bug",
  "feature",
  "content",
  "other",
]);

function asTrimmedString(
  value: unknown,
  maxLength: number,
): NullableString {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, maxLength);
}

function asSizeNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const rounded = Math.round(value);
  if (rounded < 0 || rounded > 20000) return null;
  return rounded;
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  return null;
}

function toActionPath(value: unknown): NullableString {
  if (!Array.isArray(value)) {
    return asTrimmedString(value, MAX_TEXT_FIELD_LENGTH);
  }

  const cleaned = value
    .map((item) => asTrimmedString(item, 300))
    .filter((item): item is string => Boolean(item))
    .slice(-MAX_ACTION_PATH_ITEMS);

  if (cleaned.length === 0) return null;
  return cleaned.join(" -> ");
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "0.0.0.0";
}

function escapeHtml(content: string): string {
  return content
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FeedbackPayload;
    const context = body.context ?? {};

    const rawMessage = asTrimmedString(body.message, MAX_MESSAGE_LENGTH);
    const contact = asTrimmedString(body.contact, MAX_CONTACT_LENGTH);
    const quickTypeRaw = asTrimmedString(body.quickType, 50);
    const quickType =
      quickTypeRaw && QUICK_TYPES.has(quickTypeRaw) ? quickTypeRaw : null;
    const helpfulVote = asBoolean(body.helpfulVote);
    const triggerSource = asTrimmedString(body.triggerSource, 80);

    if (!rawMessage && !quickType && helpfulVote === null) {
      return NextResponse.json(
        { error: "Provide message or quick feedback selection" },
        { status: 400 },
      );
    }

    const autoMessage = [
      quickType ? `Type: ${quickType}` : null,
      helpfulVote === null
        ? null
        : `Helpful vote: ${helpfulVote ? "yes" : "no"}`,
    ]
      .filter(Boolean)
      .join(" | ");
    const message = rawMessage || autoMessage || "Quick feedback";

    const pageUrl = asTrimmedString(context.pageUrl, MAX_TEXT_FIELD_LENGTH);
    const pagePath = asTrimmedString(context.pagePath, 500);
    const actionPath = toActionPath(context.actionPath);
    const referrer =
      asTrimmedString(context.referrer, MAX_TEXT_FIELD_LENGTH) ||
      asTrimmedString(request.headers.get("referer"), MAX_TEXT_FIELD_LENGTH);
    const timezone = asTrimmedString(context.timezone, 100);
    const browserLang = asTrimmedString(context.browserLang, 50);
    const deviceType = asTrimmedString(context.deviceType, 50);
    const platform = asTrimmedString(context.platform, 100);
    const userAgent =
      asTrimmedString(context.userAgent, MAX_TEXT_FIELD_LENGTH) ||
      asTrimmedString(request.headers.get("user-agent"), MAX_TEXT_FIELD_LENGTH);
    const screenshot = asTrimmedString(
      context.screenshot,
      MAX_SCREENSHOT_LENGTH,
    );

    const viewportWidth = asSizeNumber(context.viewport?.width);
    const viewportHeight = asSizeNumber(context.viewport?.height);
    const screenWidth = asSizeNumber(context.screen?.width);
    const screenHeight = asSizeNumber(context.screen?.height);

    const feedback = await prisma.feedback.create({
      data: {
        message,
        contact,
        quickType,
        helpfulVote,
        triggerSource,
        pageUrl,
        pagePath,
        actionPath,
        referrer,
        timezone,
        browserLang,
        deviceType,
        platform,
        userAgent,
        viewportWidth,
        viewportHeight,
        screenWidth,
        screenHeight,
        ip: getClientIp(request),
        screenshot,
      },
      select: { id: true, createdAt: true },
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const feedbackToEmail = process.env.FEEDBACK_EMAIL_TO;
    const feedbackFromEmail =
      process.env.FEEDBACK_EMAIL_FROM ||
      "YTVidHub Feedback <onboarding@resend.dev>";

    let emailSent = false;

    if (resendApiKey && feedbackToEmail) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: feedbackFromEmail,
          to: feedbackToEmail,
          subject: `New Feedback #${feedback.id}`,
          html: `
            <h2>New Feedback Received</h2>
            <p><strong>Feedback ID:</strong> ${feedback.id}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background:#f9f9f9;padding:10px;border-left:3px solid #ccc;">
              ${escapeHtml(message)}
            </blockquote>
            <p><strong>Contact Info:</strong> ${escapeHtml(contact || "Anonymous")}</p>
            <p><strong>Quick Type:</strong> ${escapeHtml(quickType || "N/A")}</p>
            <p><strong>Helpful Vote:</strong> ${escapeHtml(
              helpfulVote === null ? "N/A" : helpfulVote ? "yes" : "no",
            )}</p>
            <p><strong>Trigger Source:</strong> ${escapeHtml(triggerSource || "manual_button")}</p>
            <p><strong>Page URL:</strong> ${escapeHtml(pageUrl || "N/A")}</p>
            <p><strong>Page Path:</strong> ${escapeHtml(pagePath || "N/A")}</p>
            <p><strong>Action Path:</strong> ${escapeHtml(actionPath || "N/A")}</p>
            <p><strong>Device:</strong> ${escapeHtml(deviceType || "N/A")} / ${escapeHtml(platform || "N/A")}</p>
            <p><strong>Timezone:</strong> ${escapeHtml(timezone || "N/A")}</p>
            <p><strong>Created At:</strong> ${feedback.createdAt.toISOString()}</p>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error("Feedback email failed:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      data: feedback,
      emailSent,
    });
  } catch (error) {
    console.error("Feedback Error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
