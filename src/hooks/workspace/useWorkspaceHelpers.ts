import {
  getGuestLimitMessage,
  promptLoginForGuestLimit,
} from "@/lib/guestLimitPrompt";

export function getTranscriptUnlockKey(
  video?: { id?: string; url?: string } | null,
) {
  return video?.id || video?.url || "";
}

export function getReadableErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (error instanceof Error && error.message?.trim()) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}

export function shouldHydrateMetadata(
  video:
    | { url?: string; title?: string; uploader?: string }
    | null
    | undefined,
) {
  if (!video?.url) return false;
  const title = String(video.title || "").trim();
  const uploader = String(video.uploader || "").trim();

  const titleNeedsHydration =
    !title ||
    title === "YouTube Video" ||
    title === "Loading video info..." ||
    title === "Unknown Video";
  const uploaderNeedsHydration =
    !uploader || uploader === "Guest Preview" || uploader === "...";

  return titleNeedsHydration || uploaderNeedsHydration;
}

export function createShowAnalysisError(
  user: any,
  openLoginModal: () => void,
  setAnalysisError: (msg: string) => void,
  toast: any,
) {
  const maybePromptLoginForGuestLimit = (error: unknown): boolean => {
    if (user) return false;
    if (!promptLoginForGuestLimit(error, openLoginModal)) return false;
    setAnalysisError(getGuestLimitMessage(error));
    return true;
  };

  return (
    error: unknown,
    fallback = "Failed to analyze this video. Please try again.",
  ) => {
    if (maybePromptLoginForGuestLimit(error)) return;
    const message = getReadableErrorMessage(error, fallback);
    setAnalysisError(message);
    toast.error(message);
  };
}

export function handleSeek(timeStr: string, setSeekTime: (t: number) => void, setActiveTab: (t: "video" | "analysis") => void) {
  const parts = timeStr.split(":").map(Number);
  const secs =
    parts.length === 2
      ? parts[0] * 60 + parts[1]
      : parts[0] * 3600 + parts[1] * 60 + parts[2];
  setSeekTime(secs);
  if (window.innerWidth < 768) setActiveTab("video");
}
