"use client";

import { CalendarX, ChevronDown, Loader2 } from "lucide-react";
import type { Comment, SortOrder, VideoObject } from "@/lib/commentsApi";
import type { ReplyEntry } from "./useCommentsViewer";
import CommentThread from "./CommentThread";

const SORT_OPTIONS: Array<{ value: SortOrder; label: string }> = [
  { value: "dateOldest", label: "Date (oldest first)" },
  { value: "dateNewest", label: "Date (newest first)" },
  { value: "likesMost", label: "Likes (most first)" },
  { value: "likesLeast", label: "Likes (least first)" },
];

const PAGE_SIZES = [25, 50, 100, 500];

type Props = {
  video: VideoObject;
  videoId: string;
  sort: SortOrder;
  pageSize: number;
  minDate: number | null;
  maxDate: number | null;
  comments: Comment[];
  subCount: number;
  totalCount: number;
  showMore: boolean;
  loadingComments: boolean;
  commentsError: string | null;
  replyState: Record<string, ReplyEntry>;
  onSortChange: (s: SortOrder) => void;
  onPageSizeChange: (n: number) => void;
  onDateRangeChange: (fromMs: number | null, toMs: number | null) => void;
  onLoadMore: () => void;
  onToggleReplies: (id: string) => void;
};

function toLocalDayInput(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function CommentsBrowser(props: Props) {
  const {
    video,
    videoId,
    sort,
    pageSize,
    minDate,
    maxDate,
    comments,
    subCount,
    totalCount,
    showMore,
    loadingComments,
    commentsError,
    replyState,
    onSortChange,
    onPageSizeChange,
    onDateRangeChange,
    onLoadMore,
    onToggleReplies,
  } = props;

  const uploaderChannelId = video.snippet.channelId;
  const hasDateFilter = minDate != null && maxDate != null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* 工具栏 */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500">Sort by</label>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOrder)}
              className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500">From</label>
            <input
              type="date"
              value={minDate != null ? toLocalDayInput(minDate) : ""}
              onChange={(e) => {
                const v = e.target.value;
                if (!v) {
                  onDateRangeChange(null, null);
                  return;
                }
                const from = new Date(`${v}T00:00:00`).getTime();
                onDateRangeChange(from, maxDate ?? from + 86_400_000);
              }}
              className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500">To</label>
            <input
              type="date"
              value={maxDate != null ? toLocalDayInput(maxDate) : ""}
              onChange={(e) => {
                const v = e.target.value;
                if (!v) {
                  onDateRangeChange(minDate, null);
                  return;
                }
                const to = new Date(`${v}T23:59:59.999`).getTime();
                onDateRangeChange(minDate ?? 0, to);
              }}
              className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            />
          </div>
          {hasDateFilter && (
            <button
              onClick={() => onDateRangeChange(null, null)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <CalendarX className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-500">Page size</label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-500">
          Showing <span className="font-bold text-slate-900">{subCount.toLocaleString()}</span>{" "}
          of {totalCount.toLocaleString()} results
        </div>
      </div>

      {/* 评论列表 */}
      <div className="mt-5 space-y-3">
        {loadingComments && comments.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading comments...
          </div>
        ) : commentsError && comments.length === 0 ? (
          <div className="rounded-xl bg-red-50 px-4 py-6 text-center text-sm text-red-700">
            {commentsError}
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No comments found{hasDateFilter ? " in this date range" : ""}.
          </div>
        ) : (
          comments.map((item) => (
            <CommentThread
              key={item.id}
              item={item}
              videoId={videoId}
              uploaderChannelId={uploaderChannelId}
              replyEntry={replyState[item.id]}
              onToggleReplies={onToggleReplies}
            />
          ))
        )}
      </div>

      {/* 分页 */}
      <div className="mt-5 flex items-center justify-center">
        {showMore ? (
          <button
            onClick={onLoadMore}
            disabled={loadingComments}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-50"
          >
            {loadingComments ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
            Show more comments...
          </button>
        ) : (
          comments.length > 0 && (
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              All comments loaded
            </span>
          )
        )}
      </div>
    </div>
  );
}
