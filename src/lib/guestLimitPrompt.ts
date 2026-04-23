import { toast } from "sonner";

type GuestQuotaInfo = {
  reset_in_seconds?: number;
};

type ApiLikeError = {
  code?: string;
  message?: string;
  details?: unknown;
};

const GUEST_LIMIT_TOAST_ID = "guest-preview-limit";
const GUEST_LIMIT_PROMPT_COOLDOWN_MS = 1500;

let lastGuestLimitPromptAt = 0;

const getGuestQuota = (error: unknown): GuestQuotaInfo | null => {
  if (!error || typeof error !== "object") return null;
  const details = (error as ApiLikeError).details;
  if (!details || typeof details !== "object") return null;
  const detailsRecord = details as Record<string, unknown>;

  const quota = detailsRecord.quota;
  if (quota && typeof quota === "object") {
    return quota as GuestQuotaInfo;
  }
  return detailsRecord as GuestQuotaInfo;
};

const formatResetTime = (seconds: number): string => {
  if (seconds <= 0) return "less than 1 minute";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${Math.max(minutes, 1)}m`;
  return `${Math.max(minutes, 1)}m`;
};

export const isGuestLimitError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") return false;
  const maybe = error as ApiLikeError;
  const message = (maybe.message || "").toLowerCase();

  return (
    maybe.code === "GUEST_LIMIT_REACHED" ||
    message.includes("guest preview limit reached")
  );
};

export const getGuestLimitMessage = (error: unknown): string => {
  const quota = getGuestQuota(error);

  return quota?.reset_in_seconds && quota.reset_in_seconds > 0
    ? `Guest preview limit reached. Reset in ${formatResetTime(quota.reset_in_seconds)}. Please login to continue.`
    : "Guest preview limit reached. Please login to continue.";
};

export const promptLoginForGuestLimit = (
  error: unknown,
  openLoginModal: () => void,
): boolean => {
  if (!isGuestLimitError(error)) return false;

  const now = Date.now();
  if (now - lastGuestLimitPromptAt >= GUEST_LIMIT_PROMPT_COOLDOWN_MS) {
    lastGuestLimitPromptAt = now;
    toast.error(getGuestLimitMessage(error), { id: GUEST_LIMIT_TOAST_ID });
  }

  openLoginModal();
  return true;
};
