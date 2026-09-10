"use client";

import { ChevronDown, ChevronUp, Loader2, ThumbsUp } from "lucide-react";
import { sanitizeCommentHtml } from "@/lib/comments/commentHtml";
import type { Comment } from "@/lib/commentsApi";
import type { ReplyEntry } from "./useCommentsViewer";

type Props = {
  item: Comment;
  videoId: string;
  uploaderChannelId: string;
  replyEntry?: ReplyEntry;
  onToggleReplies: (commentId: string) => void;
};

function formatTimestamp(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function CommentRow({
  item,
  videoId,
  uploaderChannelId,
  isReply = false,
}: {
  item: Comment;
  videoId: string;
  uploaderChannelId: string;
  isReply?: boolean;
}) {
  const isOp = item.authorChannelId !== "" && item.authorChannelId === uploaderChannelId;
  const edited = item.updatedAt !== item.publishedAt;
  const commentUrl = `https://www.youtube.com/watch?v=${videoId}&lc=${item.id}`;

  return (
    <div className={`flex gap-3 ${isReply ? "pl-10" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.authorProfileImageUrl}
        alt={item.authorDisplayName}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-9 w-9 shrink-0 rounded-full border border-slate-100"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="font-semibold text-slate-900">{item.authorDisplayName}</span>
          {isOp && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
              OP
            </span>
          )}
          <a
            href={commentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 transition hover:text-blue-600"
          >
            {formatTimestamp(item.publishedAt)}
          </a>
          {edited && <span className="text-xs text-slate-400">(edited)</span>}
        </div>
        <div
          className="comment-text mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700"
          dangerouslySetInnerHTML={{ __html: sanitizeCommentHtml(item.textDisplay) }}
        />
        {item.likeCount > 0 && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
            <ThumbsUp className="h-3 w-3" />
            {item.likeCount.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentThread({
  item,
  videoId,
  uploaderChannelId,
  replyEntry,
  onToggleReplies,
}: Props) {
  const hasReplies = item.totalReplyCount > 0;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <CommentRow item={item} videoId={videoId} uploaderChannelId={uploaderChannelId} />

      {hasReplies && (
        <div className="mt-2 pl-12">
          <button
            onClick={() => onToggleReplies(item.id)}
            className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            {replyEntry && replyEntry.status !== "error" ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            {item.totalReplyCount.toLocaleString()} replies
          </button>

          {replyEntry?.status === "loading" && (
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading replies...
            </div>
          )}
          {replyEntry?.status === "error" && (
            <button
              onClick={() => onToggleReplies(item.id)}
              className="mt-2 block text-xs text-red-600 hover:underline"
            >
              Failed to load replies — click to retry
            </button>
          )}
          {replyEntry?.status === "loaded" && (
            <div className="mt-3 space-y-3">
              {replyEntry.items.map((reply) => (
                <CommentRow
                  key={reply.id}
                  item={reply}
                  videoId={videoId}
                  uploaderChannelId={uploaderChannelId}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
