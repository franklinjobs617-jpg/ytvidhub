import { PendingBulkTask, PENDING_BULK_TASK_KEY } from "./useSubtitleDownloader.types";

export function savePendingBulkTask(task: PendingBulkTask) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PENDING_BULK_TASK_KEY, JSON.stringify(task));
}

export function readPendingBulkTask(): PendingBulkTask | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PENDING_BULK_TASK_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingBulkTask;
  } catch {
    return null;
  }
}

export function clearPendingBulkTask() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_BULK_TASK_KEY);
}
