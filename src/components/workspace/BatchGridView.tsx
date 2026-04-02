"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, CheckSquare, Square, Play, Loader2, Eye } from "lucide-react";

interface Video {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  hasSubtitles?: boolean;
  duration?: string;
  uploader?: string;
  analyzed?: boolean;
}

interface BatchGridViewProps {
  videos: Video[];
  onDownloadSingle?: (video: Video, format: string, lang?: string) => void;
  onDownloadBatch?: (videos: Video[], format: string, lang?: string) => void;
  onVideoClick?: (video: Video) => void;
  isDownloading?: boolean;
  progress?: number;
  statusText?: string;
  userCredits?: number;
}

export function BatchGridView({
  videos,
  onDownloadSingle,
  onDownloadBatch,
  onVideoClick,
  isDownloading = false,
  progress = 0,
  statusText = "",
  userCredits,
}: BatchGridViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [downloadFormat, setDownloadFormat] = useState("srt");

  const selectableVideos = useMemo(
    () => videos.filter((video) => video.hasSubtitles !== false),
    [videos]
  );
  const selectableIds = useMemo(
    () => new Set(selectableVideos.map((video) => video.id)),
    [selectableVideos]
  );
  const normalizedCredits =
    typeof userCredits === "number" && !Number.isNaN(userCredits)
      ? Math.max(0, userCredits)
      : null;

  useEffect(() => {
    setSelectedIds((previous) => {
      const stillValid = new Set(
        [...previous].filter((videoId) => selectableIds.has(videoId))
      );
      if (stillValid.size > 0) return stillValid;

      if (selectableVideos.length <= 0) return new Set();
      return new Set(selectableVideos.map((video) => video.id));
    });
  }, [selectableIds, selectableVideos]);

  const toggleSelect = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!selectableIds.has(id)) return;

    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === selectableVideos.length) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(new Set(selectableVideos.map((video) => video.id)));
  };

  const handleBatchDownload = () => {
    if (selectedIds.size === 0 || !onDownloadBatch) return;
    const selectedVideos = videos.filter((video) => selectedIds.has(video.id));
    onDownloadBatch(selectedVideos, downloadFormat);
  };

  const toggleCardSelection = (video: Video) => {
    if (video.hasSubtitles === false) return;
    const next = new Set(selectedIds);
    if (next.has(video.id)) {
      next.delete(video.id);
    } else {
      next.add(video.id);
    }
    setSelectedIds(next);
  };

  const selectedCount = selectedIds.size;
  const requiredCredits = selectedCount;
  const shortfall =
    normalizedCredits === null
      ? 0
      : Math.max(0, requiredCredits - normalizedCredits);
  const allSelectableSelected =
    selectableVideos.length > 0 && selectedCount === selectableVideos.length;
  const unavailableCount = Math.max(0, videos.length - selectableVideos.length);
  const loadingCount = videos.filter(
    (video) => video.title === "Loading video info..." || video.title.includes("Loading")
  ).length;

  const buttonText = (() => {
    if (selectedCount === 0) return "Select at least 1 video";
    if (shortfall > 0) return `Start now, ${shortfall} pending`;
    return `Download ${selectedCount} (${requiredCredits} credits)`;
  })();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="sticky top-0 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-white border-b border-slate-200 shadow-sm gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
          >
            {allSelectableSelected ? (
              <CheckSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600" />
            ) : (
              <Square className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            )}
            <span className="text-xs font-semibold">
              {selectedCount}/{selectableVideos.length}
            </span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <select
            value={downloadFormat}
            onChange={(event) => setDownloadFormat(event.target.value)}
            className="px-2 sm:px-2.5 py-1.5 text-xs font-medium border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="srt">SRT</option>
            <option value="vtt">VTT</option>
            <option value="txt">TXT</option>
          </select>

          <button
            onClick={handleBatchDownload}
            disabled={selectedCount === 0}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex-1 sm:flex-none justify-center ${
              selectedCount > 0 && shortfall === 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : selectedCount > 0 && shortfall > 0
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">
              {selectedCount > 0 ? `${selectedCount}` : "Download"}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
          {videos.length} videos
          {` | selected ${selectedCount}`}
          {` | cost ${requiredCredits} credits`}
          {normalizedCredits !== null && ` | balance ${normalizedCredits} credits`}
          {unavailableCount > 0 && ` | ${unavailableCount} unavailable`}
        </div>
      </div>

      {normalizedCredits !== null && loadingCount === 0 && (
        <div className="px-3 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <span className="font-medium">
            You have {normalizedCredits} credits. We will start what you can afford now, and keep the rest ready to resume.
          </span>
        </div>
      )}
      <div className="px-3 sm:px-6 py-2 bg-blue-50 border-b border-blue-100 text-xs sm:text-sm text-blue-800 font-medium">
        Click cards to select. Use Preview to open single-video analysis.
      </div>

      {loadingCount > 0 && (
        <div className="px-3 sm:px-6 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-2 text-xs sm:text-sm text-blue-800">
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>
            Fetching video details for {loadingCount} item
            {loadingCount > 1 ? "s" : ""}... Please wait a few seconds before
            downloading.
          </span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
          {videos.map((video) => {
            const isLoading =
              video.title === "Loading video info..." ||
              video.title.includes("Loading");
            const isSelectable = video.hasSubtitles !== false && !isLoading;

            return (
              <div
                key={video.id}
                onClick={() => !isLoading && toggleCardSelection(video)}
                className={`group relative rounded-lg overflow-hidden border-2 transition-all ${
                  isLoading
                    ? "border-slate-200"
                    : selectedIds.has(video.id)
                    ? "border-blue-500 shadow-lg shadow-blue-100 cursor-pointer"
                    : isSelectable
                    ? "border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer"
                    : "border-slate-200 opacity-70"
                }`}
              >
                <div className="relative aspect-video bg-slate-100">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse">
                      <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-400 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play
                            className="w-6 h-6 text-slate-900 ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>

                      <div
                        className="absolute top-2 left-2 z-10"
                        onClick={(event) => toggleSelect(video.id, event)}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            selectedIds.has(video.id)
                              ? "bg-blue-600"
                              : isSelectable
                              ? "bg-white/90 group-hover:bg-white"
                              : "bg-slate-100/90"
                          }`}
                        >
                          {selectedIds.has(video.id) ? (
                            <CheckSquare className="w-4 h-4 text-white" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {onVideoClick && isSelectable && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onVideoClick(video);
                          }}
                          className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md bg-black/70 text-white text-[10px] font-semibold hover:bg-black/80 transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Preview
                        </button>
                      )}

                      {video.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                          {video.duration}
                        </div>
                      )}

                      {video.hasSubtitles === false && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-800 text-white text-[10px] font-medium rounded">
                          No subtitles
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="p-2 sm:p-3 bg-white">
                  {isLoading ? (
                    <>
                      <div className="h-3 sm:h-4 bg-slate-200 rounded animate-pulse mb-1 sm:mb-2" />
                      <div className="h-2 sm:h-3 bg-slate-200 rounded animate-pulse w-2/3" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-2 leading-snug mb-1">
                        {video.title}
                      </h3>
                      {video.uploader && (
                        <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                          {video.uploader}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isDownloading && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center px-6">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {statusText || "Downloading..."}
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
