"use client";

import { useState } from "react";
import {
  Download,
  CheckSquare,
  Square,
  DownloadCloud,
  FileText,
  Clock,
} from "lucide-react";

interface PlaylistManagerProps {
  videos: any[];
  onDownloadSingle?: (video: any, format: string) => void;
  onBatchDownload?: (videoIds: string[], format: string) => void;
}

export function PlaylistManager({
  videos,
  onDownloadSingle,
  onBatchDownload,
}: PlaylistManagerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFormatMenu, setShowFormatMenu] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === videos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(videos.map((v: any) => v.id)));
    }
  };

  const handleDownload = (video: any, format: string) => {
    onDownloadSingle?.(video, format);
    setShowFormatMenu(null);
  };

  const handleBatchDownload = (format: string) => {
    onBatchDownload?.(Array.from(selectedIds), format);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {selectedIds.size === videos.length ? (
              <CheckSquare className="w-4 h-4 text-blue-600" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            {selectedIds.size > 0
              ? `${selectedIds.size} selected`
              : "Select All"}
          </button>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBatchDownload("srt")}
                className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-colors"
              >
                <DownloadCloud className="w-4 h-4 inline mr-1" />
                Batch Download
              </button>
            </div>
          )}
        </div>

        <div className="text-sm text-slate-500 font-medium">
          {videos.length} videos
        </div>
      </div>

      {/* 视频列表 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {videos.map((video: any) => (
            <div
              key={video.id}
              className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <button onClick={() => toggleSelect(video.id)}>
                {selectedIds.has(video.id) ? (
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 truncate">
                  {video.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {video.duration}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDownload(video, "srt")}
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 inline mr-1" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
