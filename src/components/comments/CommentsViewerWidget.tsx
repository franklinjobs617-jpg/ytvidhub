"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useCommentsViewer } from "./useCommentsViewer";
import UrlResolverPanel from "./UrlResolverPanel";
import VideoInfoCard from "./VideoInfoCard";
import FetchProgress from "./FetchProgress";
import StatsCards from "./StatsCards";
import CommentTrendChart from "./CommentTrendChart";
import CommentsBrowser from "./CommentsBrowser";

export default function CommentsViewerWidget() {
  const viewer = useCommentsViewer();

  const {
    setUrl,
    video,
    commentsInfo,
    phase,
    fetchStatus,
    notice,
    fatal,
  } = viewer;

  const showVideo = Boolean(video && commentsInfo && phase !== "idle");
  const showProgress =
    phase === "startFetch" || phase === "fetching" || phase === "deleting";
  const showBrowsing = phase === "browsing";

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 text-left">
      <UrlResolverPanel
        onSubmit={(raw) => {
          setUrl(raw);
          void viewer.submitUrl(raw);
        }}
        onClear={viewer.clearAll}
        loading={phase === "resolving"}
        hasVideo={showVideo}
      />

      {/* 阻塞性错误 */}
      {fatal && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">
              {fatal.reason === "idInvalid"
                ? "Could not resolve this link. Please check the URL and try again."
                : fatal.reason === "quotaExceeded"
                  ? "The comment service has reached its API quota. Please try again later."
                  : "Something went wrong."}
            </p>
            {fatal.status > 0 && (
              <p className="mt-1 text-xs text-red-500">
                [{fatal.status}] {fatal.reason}: {fatal.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 解析中 */}
      {phase === "resolving" && (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Resolving video...
        </div>
      )}

      {/* 视频信息 + Load all（startFetch 期间显示进度条，此处 loading 恒为 false） */}
      {showVideo && !showProgress && (
        <VideoInfoCard
          video={video!}
          commentsInfo={commentsInfo!}
          onLoadAll={() => void viewer.loadAll()}
        />
      )}

      {/* 抓取进度 */}
      {showProgress && (
        <FetchProgress
          status={fetchStatus}
          notice={notice}
          deleting={phase === "deleting"}
          onRetry={viewer.retryFetch}
          onAbort={() => void viewer.handleAbort()}
        />
      )}

      {/* 浏览态：统计 + 图表 + 评论 */}
      {showBrowsing && video && commentsInfo && viewer.videoId && (
        <div className="space-y-4">
          <StatsCards stats={viewer.stats} loading={viewer.stats === null} />

          {commentsInfo.graph && viewer.dates && viewer.dates.length >= 10 && (
            <CommentTrendChart
              dates={viewer.dates}
              videoPublishedAtMs={new Date(video.snippet.publishedAt).getTime()}
            />
          )}

          <CommentsBrowser
            video={video}
            videoId={viewer.videoId}
            sort={viewer.sort}
            pageSize={viewer.pageSize}
            minDate={viewer.minDate}
            maxDate={viewer.maxDate}
            comments={viewer.comments}
            subCount={viewer.subCount}
            totalCount={viewer.totalCount}
            showMore={viewer.showMore}
            loadingComments={viewer.loadingComments}
            commentsError={viewer.commentsError}
            replyState={viewer.replyState}
            onSortChange={viewer.changeSort}
            onPageSizeChange={viewer.changePageSize}
            onDateRangeChange={viewer.setDateRange}
            onLoadMore={viewer.loadMore}
            onToggleReplies={(id) => void viewer.toggleReplies(id)}
          />

          {/* 部分数据 + 可恢复提示 */}
          {(notice?.kind === "aborted" || notice?.kind === "fetchError") && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
              <button
                onClick={viewer.retryFetch}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Load all comments
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
