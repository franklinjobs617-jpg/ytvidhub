export type PendingAction =
  | {
      type: "download_single";
      payload: {
        videoUrl: string;
        title: string;
        format: "srt" | "vtt" | "txt";
        lang: string;
      };
      createdAt: number;
    }
  | {
      type: "download_bulk";
      payload: {
        videos: any[];
        format: string;
        lang: string;
      };
      createdAt: number;
    }
  | {
      type: "playlist_analyze";
      payload: {
        url: string;
      };
      createdAt: number;
    }
  | {
      type: "ai_summary";
      payload: {
        videoUrl: string;
        videoId?: string;
      };
      createdAt: number;
    };

const PENDING_ACTION_KEY = "ytvidhub_pending_action_v1";
const PENDING_ACTION_TTL_MS = 10 * 60 * 1000;

export function savePendingAction(action: Omit<PendingAction, "createdAt">) {
  if (typeof window === "undefined") return;
  const payload: PendingAction = {
    ...action,
    createdAt: Date.now(),
  } as PendingAction;
  localStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(payload));
}

export function getPendingAction(): PendingAction | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PENDING_ACTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingAction;
    if (!parsed?.type || !parsed?.createdAt) return null;
    if (Date.now() - parsed.createdAt > PENDING_ACTION_TTL_MS) {
      clearPendingAction();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingAction() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_ACTION_KEY);
}
