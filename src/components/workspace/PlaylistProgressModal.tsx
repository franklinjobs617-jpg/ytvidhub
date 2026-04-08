"use client";

import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface PlaylistProgressModalProps {
  isOpen: boolean;
  phase: "expanding" | "checking" | "completed" | "error" | "paused";
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
  error,
}: PlaylistProgressModalProps) {
  if (!isOpen) return null;

  const progress = totalVideos > 0 ? (processedVideos / totalVideos) * 100 : 0;
  const isComplete = phase === "completed";
  const isError = phase === "error";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {phase === "expanding" && "Analyzing Playlist"}
            {phase === "checking" && "Checking Subtitles"}
            {phase === "completed" && "Analysis Complete"}
            {phase === "error" && "Analysis Failed"}
          </h2>
          {playlistTitle && (
            <p className="text-sm text-purple-100 mt-1 truncate">
              {playlistTitle}
            </p>
          )}
        </div>

        <div className="p-5 sm:p-6">
          {phase === "expanding" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <p className="text-sm text-slate-600 font-medium">
                Fetching playlist videos...
              </p>
            </div>
          )}

          {phase === "checking" && (
            <>
              <div className="mb-5">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-600">Checking Progress</span>
                  <span className="text-slate-900">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">
                    {totalVideos}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Total
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">
                    {processedVideos}
                  </div>
                  <div className="text-xs text-blue-600 mt-1 font-medium">
                    Checked
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                  <div className="text-2xl font-bold text-green-600">
                    {videosWithSubtitles}
                  </div>
                  <div className="text-xs text-green-600 mt-1 font-medium">
                    Available
                  </div>
                </div>
              </div>

              {currentVideoTitle && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                      Checking
                    </div>
                    <div className="text-sm text-purple-700 truncate mt-1">
                      {currentVideoTitle}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <div className="text-base font-bold text-green-900">
                  Analysis Complete
                </div>
                <div className="text-sm text-green-700 mt-1">
                  Found {videosWithSubtitles} videos with subtitles
                </div>
              </div>
            </div>
          )}

          {isError && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <div className="text-base font-bold text-red-900">
                  Analysis Failed
                </div>
                <div className="text-sm text-red-700 mt-1">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
