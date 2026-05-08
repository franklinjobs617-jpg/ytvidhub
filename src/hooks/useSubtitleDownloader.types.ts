export interface PlaylistProcessingState {
  phase: "expanding" | "checking" | "completed" | "error" | "paused";
  currentPlaylist?: {
    title: string;
    uploader: string;
    totalVideos: number;
    url: string;
  };
  totalVideos: number;
  processedVideos: number;
  videosWithSubtitles: number;
  currentVideoTitle?: string;
  estimatedTimeRemaining?: number;
  error?: string;
  canPause: boolean;
  canCancel: boolean;
}

export interface BulkDownloadState {
  phase: "processing" | "completed" | "error";
  totalVideos: number;
  processedVideos: number;
  successCount: number;
  failedCount: number;
  currentVideoTitle?: string;
  failedVideos: Array<{ title: string; error: string }>;
  error?: string;
}

export type BatchVideo = {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string | number;
};

export interface BulkCreditsGuardState {
  videos: BatchVideo[];
  format: string;
  lang: string;
  currentCredits: number;
  requiredCredits: number;
  affordableCount: number;
  shortfall: number;
}

export interface PendingBulkTask {
  videos: BatchVideo[];
  format: string;
  lang: string;
  createdAt: number;
  source: string;
}

export interface PostPartialUpsellState {
  completedCount: number;
  remainingCount: number;
  totalSelected: number;
  currentCredits: number;
  shortfall: number;
}

export type BulkPlanId = "a" | "b" | "c";

export const PENDING_BULK_TASK_KEY = "ytvidhub_pending_bulk_resume_v1";

export const STRIPE_SUBSCRIPTION_TYPE_MAP: Record<BulkPlanId, string> = {
  a: "ytvid_a_monthly",
  b: "ytvid_b_monthly",
  c: "ytvid_c_yearly",
};

export const STRIPE_SUBSCRIPTION_PRICE_ID_MAP: Record<
  BulkPlanId,
  string | undefined
> = {
  a: process.env.NEXT_PUBLIC_STRIPE_YTVID_A_MONTHLY_PRICE_ID,
  b: process.env.NEXT_PUBLIC_STRIPE_YTVID_B_MONTHLY_PRICE_ID,
  c: process.env.NEXT_PUBLIC_STRIPE_YTVID_C_YEARLY_PRICE_ID,
};

export const STRIPE_PURCHASE_META_MAP: Record<
  BulkPlanId,
  { item_name: string; value: number; item_variant: string }
> = {
  a: {
    item_name: "YTVidHub Pro Subscription",
    value: 19.99,
    item_variant: "monthly",
  },
  b: {
    item_name: "YTVidHub Premium Subscription",
    value: 29.99,
    item_variant: "monthly",
  },
  c: {
    item_name: "YTVidHub Researcher Subscription",
    value: 199,
    item_variant: "yearly",
  },
};
