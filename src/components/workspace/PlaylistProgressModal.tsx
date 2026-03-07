"use client";

import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface PlaylistProgressModalProps {
  isOpen: boolean;
  phase: 'expanding' | 'checking' | 'completed' | 'error';
  totalVideos: number;
  processedVideos: number;
  videosWithSubtitles: number;
  currentVideoTitle?: string;
  playlistTitle?: string;
  error?: string;
}

export function PlaylistProgressModal({
  isOpen,
  phase,
  totalVideos,
  processedVideos,
  videosWithSubtitles,
  currentVideoTitle,
  playlistTitle,
  error
}: PlaylistProgressModalProps) {
  if (!isOpen) return null;

  const progress = totalVideos > 0 ? (processedVideos / totalVideos) * 100 : 0;
  const isComplete = phase === 'completed';
  const isError = phase === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {phase === 'expanding' && '正在解析播放列表'}
            {phase === 'checking' && '正在检查字幕'}
            {phase === 'completed' && '解析完成'}
            {phase === 'error' && '解析失败'}
          </h2>
          {playlistTitle && (
            <p className="text-xs sm:text-sm text-slate-600 mt-1 truncate">{playlistTitle}</p>
          )}
        </div>

        <div className="p-4 sm:p-6">
          {phase === 'expanding' && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          )}

          {phase === 'checking' && (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
                  <span className="text-slate-700">检查进度</span>
                  <span className="text-slate-900">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-slate-900">{totalVideos}</div>
                  <div className="text-[10px] sm:text-xs text-slate-600 mt-1">总数</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">{processedVideos}</div>
                  <div className="text-[10px] sm:text-xs text-blue-700 mt-1">已检查</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">{videosWithSubtitles}</div>
                  <div className="text-[10px] sm:text-xs text-green-700 mt-1">有字幕</div>
                </div>
              </div>

              {currentVideoTitle && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-blue-900">正在检查</div>
                    <div className="text-xs text-blue-700 truncate mt-1">{currentVideoTitle}</div>
                  </div>
                </div>
              )}
            </>
          )}

          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-green-900">解析完成</div>
                <div className="text-xs text-green-700 mt-1">
                  找到 {videosWithSubtitles} 个有字幕的视频
                </div>
              </div>
            </div>
          )}

          {isError && error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-red-900">解析失败</div>
                <div className="text-xs text-red-700 mt-1">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
