"use client";

import { AlertTriangle, Download, MessageCircleOff } from "lucide-react";
import type { CommentsInfo, VideoObject } from "@/lib/commentsApi";

type Props = {
  video: VideoObject;
  commentsInfo: CommentsInfo;
  onLoadAll: () => void;
};

function formatNumber(n?: string | number): string {
  const num = Number(n ?? 0);
  return isNaN(num) ? "-" : num.toLocaleString();
}

export default function VideoInfoCard({ video, commentsInfo, onLoadAll }: Props) {
  const thumbnail =
    video.snippet.thumbnails?.medium?.url ??
    video.snippet.thumbnails?.default?.url ??
    video.snippet.thumbnails?.high?.url;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={video.snippet.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-32 w-56 shrink-0 rounded-xl border border-slate-100 object-cover"
          />
        ) : (
          <div className="h-32 w-56 shrink-0 rounded-xl bg-slate-100" />
        )}
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 text-lg font-bold text-slate-900">
            {video.snippet.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{video.snippet.channelTitle}</p>
          <p className="mt-2 text-sm text-slate-600">
            {formatNumber(video.statistics?.viewCount)} views ·{" "}
            {formatNumber(video.statistics?.likeCount)} likes ·{" "}
            <span className="font-semibold text-slate-900">
              {formatNumber(commentsInfo.num)} comments
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Published{" "}
            {new Date(video.snippet.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex shrink-0 items-start">
          <button
            onClick={onLoadAll}
            disabled={commentsInfo.disabled}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Load all comments
          </button>
        </div>
      </div>

      {/* commentsInfo 状态横幅 */}
      {commentsInfo.disabled && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <MessageCircleOff className="h-4 w-4 shrink-0" />
          Comments are disabled for this video.
        </div>
      )}
      {commentsInfo.max !== -1 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          This video has more comments than can be loaded at once.{" "}
          {commentsInfo.max.toLocaleString()} comments are shown as hidden.
        </div>
      )}
      {commentsInfo.largeAfterThreshold !== -1 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Loading is temporarily limited for videos with more than{" "}
          {commentsInfo.largeAfterThreshold.toLocaleString()} comments. Please try again later.
        </div>
      )}
      {commentsInfo.error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Could not check the comment status of this video. You can still try loading
          comments below.
        </div>
      )}
    </div>
  );
}
