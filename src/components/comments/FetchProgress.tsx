"use client";

import { AlertTriangle, RefreshCcw, Square } from "lucide-react";
import type { FetchStatusPayload } from "@/lib/commentsApi";
import type { Notice } from "./useCommentsViewer";

type Props = {
  status: FetchStatusPayload | null;
  notice: Notice;
  deleting: boolean;
  onRetry: () => void;
  onAbort: () => void;
};

export default function FetchProgress({ status, notice, deleting, onRetry, onAbort }: Props) {
  const indexed = status?.indexed ?? 0;
  const total = status?.total ?? 0;
  const percent = deleting ? null : status?.percent ?? 0;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          {deleting ? "Clearing previous data..." : "Loading comments..."}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {!deleting && (
            <span>
              {indexed.toLocaleString()} / {total.toLocaleString()}
              {percent != null && ` (${percent.toFixed(1)}%)`}
            </span>
          )}
          <button
            onClick={onAbort}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <Square className="h-3 w-3" />
            Stop
          </button>
        </div>
      </div>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ${
            deleting ? "w-1/3 animate-pulse" : ""
          }`}
          style={deleting ? undefined : { width: `${Math.min(100, percent ?? 0)}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        {deleting
          ? "The video is being cleared so comments can be re-fetched from scratch."
          : "Comments are retrieved page by page in the background. You can stop and resume later — progress is saved."}
      </p>

      {notice && notice.kind === "fetchError" && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {notice.text}
          </span>
          <button
            onClick={onRetry}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            <RefreshCcw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}
      {notice && notice.kind === "aborted" && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Square className="h-4 w-4 shrink-0" />
          {notice.text}
        </div>
      )}
      {notice && notice.kind === "info" && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {notice.text}
        </div>
      )}
    </div>
  );
}
