"use client";

import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";

export interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  hasSubtitles: boolean;
  url?: string;
}

interface DownloaderViewProps {
  videos: VideoResult[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

export function DownloaderView({
  videos,
  selectedIds,
  onSelectionChange,
}: DownloaderViewProps) {
  // 全选/反选逻辑
  const handleSelectAll = () => {
    if (selectedIds.size === videos.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(videos.map((v) => v.id)));
    }
  };

  // 单选逻辑
  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  // 判断是否显示批量处理升级提示
  const shouldShowUpgradeBanner = videos.length >= 10;

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
      {/* 批量处理升级 Banner */}
      {shouldShowUpgradeBanner && (
        <div className="mx-4 mt-4 mb-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-900">
                  Bulk processing detected!
                </h3>
                <p className="text-xs text-blue-700">
                  Use our Pro features to export all {videos.length}+ subtitles in one ZIP file.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-bold"
            >
              Upgrade <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* 顶部工具栏：全选 */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/50">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Found {videos.length} Videos
        </span>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="hidden"
            checked={selectedIds.size === videos.length && videos.length > 0}
            onChange={handleSelectAll}
          />
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              selectedIds.size === videos.length && videos.length > 0
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-slate-300 group-hover:border-blue-400"
            }`}
          >
            {selectedIds.size === videos.length && videos.length > 0 && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600 select-none">
            Select All
          </span>
        </label>
      </div>

      {/* 视频网格 */}
      <div className="p-4 md:p-6 overflow-y-auto max-h-[400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 custom-scrollbar">
        {videos.map((v) => (
          <div
            key={v.id}
            onClick={() => v.hasSubtitles && toggleSelection(v.id)}
            className={`group relative flex flex-col border-2 rounded-xl p-2 cursor-pointer transition-all duration-200 ${
              selectedIds.has(v.id)
                ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500"
                : "border-slate-100 hover:border-slate-300 bg-white"
            } ${
              !v.hasSubtitles && "opacity-50 grayscale cursor-not-allowed"
            }`}
          >
            {/* 缩略图 */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-200">
              <img
                src={v.thumbnail}
                className="object-cover w-full h-full"
                alt=""
              />

              {/* 勾选图标 */}
              <div
                className={`absolute top-2 left-2 w-6 h-6 rounded-md border-2 shadow-sm flex items-center justify-center transition-all ${
                  selectedIds.has(v.id)
                    ? "bg-blue-600 border-blue-600 scale-110"
                    : "bg-white/90 border-slate-300 group-hover:border-blue-400"
                }`}
              >
                {selectedIds.has(v.id) && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {!v.hasSubtitles && (
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">
                  No Subs
                </span>
              )}
            </div>

            {/* 标题 */}
            <h4 className="text-xs font-bold text-slate-700 line-clamp-2 leading-relaxed h-8">
              {v.title}
            </h4>
            <div className="mt-2 flex justify-between items-center px-1">
              <span className="text-[10px] font-medium text-slate-400">
                {v.duration || "00:00"}
              </span>
              {selectedIds.has(v.id) && (
                <span className="text-[10px] font-bold text-blue-600">
                  Selected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}