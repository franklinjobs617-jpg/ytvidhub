"use client";

import { useState } from "react";
import { Plus, History, List, ChevronRight, Video } from "lucide-react";

interface WorkspaceSidebarProps {
  currentPlaylist?: {
    title: string;
    videoCount: number;
  };
  onNewVideo?: () => void;
  onHistoryClick?: () => void;
  onPlaylistsClick?: () => void;
}

export function WorkspaceSidebar({
  currentPlaylist,
  onNewVideo,
  onHistoryClick,
  onPlaylistsClick,
}: WorkspaceSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="w-16 h-full bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 gap-3">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={onNewVideo}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
          title="New Video"
        >
          <Plus className="w-5 h-5 text-blue-600" />
        </button>
        <button
          onClick={onHistoryClick}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          title="History"
        >
          <History className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={onPlaylistsClick}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          title="Playlists"
        >
          <List className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-black tracking-tight text-slate-900">
              YTvidHub
            </span>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          <button
            onClick={onNewVideo}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            New Video
          </button>

          <button
            onClick={onHistoryClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          >
            <History className="w-4 h-4" />
            History
          </button>

          <button
            onClick={onPlaylistsClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          >
            <List className="w-4 h-4" />
            Playlists
          </button>
        </nav>

        {/* Current Playlist */}
        {currentPlaylist && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <List className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                  Current
                </span>
              </div>
              <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
                {currentPlaylist.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {currentPlaylist.videoCount} videos
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200">
        <div className="text-xs text-slate-400 text-center">
          Workspace
        </div>
      </div>
    </div>
  );
}
