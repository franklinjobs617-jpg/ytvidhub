import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

type GuestQuotaInfo = {
  reset_in_seconds?: number;
  // 以下两个字段依赖后端 guest 额度状态机改造（B部分需求文档）上线后才会返回，
  // 上线前 phase 始终为 undefined，下面的埋点分支会退化为不区分阶段的兜底事件
  phase?: "first_batch" | "daily";
  total_used_count?: number;
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

  // 新增埋点：guest 免费额度耗尽事件
  // phase 字段依赖后端状态机改造（见 backend-guest-quota-spec.md）上线后才会返回
  // 上线前 phase 为 undefined，统一走 "unknown" 兜底事件，方便改造上线前后对比数据
  const quota = getGuestQuota(error);
  if (quota?.phase === "first_batch") {
    trackEvent("guest_first_batch_exhausted", {
      total_used_count: quota.total_used_count,
    });
  } else if (quota?.phase === "daily") {
    trackEvent("guest_daily_quota_hit", {
      total_used_count: quota.total_used_count,
      reset_in_seconds: quota.reset_in_seconds,
    });
  } else {
    trackEvent("guest_quota_exhausted_unknown_phase", {
      reset_in_seconds: quota?.reset_in_seconds,
    });
  }

  openLoginModal();
  return true;
};
