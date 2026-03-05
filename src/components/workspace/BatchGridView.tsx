"use client";

import { useState } from "react";
import { Download, CheckSquare, Square, Play } from "lucide-react";

interface Video {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
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
}

export function BatchGridView({
  videos,
  onDownloadSingle,
  onDownloadBatch,
  onVideoClick,
  isDownloading = false,
  progress = 0,
  statusText = ""
}: BatchGridViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [downloadFormat, setDownloadFormat] = useState("srt");

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === videos.length ? new Set() : new Set(videos.map(v => v.id)));
  };

  const handleBatchDownload = () => {
    if (selectedIds.size > 0 && onDownloadBatch) {
      const selectedVideos = videos.filter(v => selectedIds.has(v.id));
      onDownloadBatch(selectedVideos, downloadFormat);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sticky 顶部工具栏 */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
          >
            {selectedIds.size === videos.length && videos.length > 0 ? (
              <CheckSquare className="w-4 h-4 text-blue-600" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span className="text-xs font-semibold">
              {selectedIds.size > 0 ? `${selectedIds.size} Selected` : "Select All"}
            </span>
          </button>

          <div className="h-5 w-px bg-slate-200" />

          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-2.5 py-1.5 text-xs font-medium border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="srt">SRT</option>
            <option value="vtt">VTT</option>
            <option value="txt">TXT</option>
          </select>

          <button
            onClick={handleBatchDownload}
            disabled={selectedIds.size === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedIds.size > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Batch Download
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {videos.length} videos
        </div>
      </div>

      {/* 九宫格卡片视图 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos.map((video) => {
            const isLoading = video.title === "Loading video info..." || video.title.includes("Loading");

            return (
              <div
                key={video.id}
                className={`group relative rounded-lg overflow-hidden border-2 transition-all ${
                  isLoading ? "border-slate-200" :
                  selectedIds.has(video.id)
                    ? "border-blue-500 shadow-lg shadow-blue-100 cursor-pointer"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer"
                }`}
              >
                {/* 缩略图容器 */}
                <div
                  className="relative aspect-video bg-slate-100"
                  onClick={() => !isLoading && onVideoClick?.(video)}
                >
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

                      {/* Hover 播放按钮 */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* 选择框 */}
                      <div
                        className="absolute top-2 left-2 z-10"
                        onClick={(e) => toggleSelect(video.id, e)}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            selectedIds.has(video.id)
                              ? "bg-blue-600"
                              : "bg-white/90 group-hover:bg-white"
                          }`}
                        >
                          {selectedIds.has(video.id) ? (
                            <CheckSquare className="w-4 h-4 text-white" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* 时长 */}
                      {video.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                          {video.duration}
                        </div>
                      )}

                      {/* 状态标签 */}
                      {video.analyzed && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                          ✓
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* 视频信息 */}
                <div className="p-3 bg-white">
                  {isLoading ? (
                    <>
                      <div className="h-4 bg-slate-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-slate-200 rounded animate-pulse w-2/3" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug mb-1">
                        {video.title}
                      </h3>
                      {video.uploader && (
                        <p className="text-xs text-slate-500 truncate">
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

      {/* 下载进度覆盖层 */}
      {isDownloading && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center px-6">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">{statusText || "Downloading..."}</h3>
            <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
        </div>
      )}
    </div>
  );
}
