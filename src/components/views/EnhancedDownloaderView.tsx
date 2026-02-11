"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  CheckSquare,
  Square,
  MoreHorizontal,
  ChevronDown,
  Filter,
  X,
  Youtube,
  AlertCircle,
  FileText
} from "lucide-react";

export interface VideoResult {
  id: string;
  url: string;
  title: string;
  uploader: string;
  thumbnail: string;
  hasSubtitles: boolean;
  subtitleStatus?: 'checking' | 'available' | 'unavailable' | 'error';
  duration?: string; // Optional: Add duration if available in data
}

interface EnhancedDownloaderViewProps {
  videos: VideoResult[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  isLoading?: boolean;
}

export function EnhancedDownloaderView({
  videos,
  selectedIds,
  onSelectionChange,
  isLoading = false
}: EnhancedDownloaderViewProps) {
  const tActions = useTranslations('actions');
  const tStatus = useTranslations('statusMessages');
  const t = useTranslations('downloaderView');

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectionMenuOpen, setSelectionMenuOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);

  // Filter state: 'all' | 'withSubtitles' | 'withoutSubtitles'
  const [activeFilter, setActiveFilter] = useState<'all' | 'withSubtitles' | 'withoutSubtitles'>('all');

  const filterMenuRef = useRef<HTMLDivElement>(null);
  const selectionMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      if (selectionMenuRef.current && !selectionMenuRef.current.contains(event.target as Node)) {
        setSelectionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering Logic
  const filteredVideos = useMemo(() => {
    let result = videos;

    // 1. Text Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.title.toLowerCase().includes(query) ||
        v.uploader.toLowerCase().includes(query)
      );
    }

    // 2. Status Filter
    if (activeFilter === 'withSubtitles') {
      result = result.filter(v => v.hasSubtitles);
    } else if (activeFilter === 'withoutSubtitles') {
      result = result.filter(v => !v.hasSubtitles);
    }

    return result;
  }, [videos, searchQuery, activeFilter]);

  const visibleVideos = useMemo(() => {
    return filteredVideos.slice(0, displayLimit);
  }, [filteredVideos, displayLimit]);

  // Statistics
  const stats = useMemo(() => {
    const total = videos.length;
    const withSubtitles = videos.filter(v => v.hasSubtitles).length;
    const selected = selectedIds.size;

    return { total, withSubtitles, selected };
  }, [videos, selectedIds]);

  // Bulk Actions
  const handleSelectAll = () => {
    // Select all currently filtered videos that have subtitles
    const videosToSelect = filteredVideos.filter(v => v.hasSubtitles);
    const newSelected = new Set(selectedIds);
    videosToSelect.forEach(v => newSelected.add(v.id));
    onSelectionChange(newSelected);
    setSelectionMenuOpen(false);
  };

  const handleDeselectAll = () => {
    onSelectionChange(new Set());
    setSelectionMenuOpen(false);
  };

  const handleSelectPage = () => {
    const pageVideos = visibleVideos.filter(v => v.hasSubtitles);
    const newSelected = new Set(selectedIds);
    pageVideos.forEach(v => newSelected.add(v.id));
    onSelectionChange(newSelected);
    setSelectionMenuOpen(false);
  };

  const handleVideoToggle = (videoId: string, hasSubtitles: boolean) => {
    if (!hasSubtitles) return;

    const newSelected = new Set(selectedIds);
    if (newSelected.has(videoId)) {
      newSelected.delete(videoId);
    } else {
      newSelected.add(videoId);
    }
    onSelectionChange(newSelected);
  };

  // UI Components
  const StatusChip = ({ status, hasSubtitles }: { status?: string, hasSubtitles: boolean }) => {
    if (isLoading || status === 'checking') {
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100">
          <Clock size={12} className="text-amber-500 animate-spin" />
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">{t('checking')}</span>
        </div>
      );
    }

    if (hasSubtitles) {
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{t('ready')}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200 opacity-60">
        <XCircle size={12} className="text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t('noSubs')}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px] relative overflow-hidden">

      {/* --- Header: Contextual Actions --- */}
      <div className="shrink-0 h-14 border-b border-slate-100 flex items-center justify-between px-4 bg-white z-20 relative">
        <div className="flex items-center gap-3">
          {/* Master Checkbox Dropdown */}
          <div className="relative" ref={selectionMenuRef}>
            <div
              className="flex items-center gap-1 pl-2 pr-1 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer transition-colors group"
              onClick={() => setSelectionMenuOpen(!selectionMenuOpen)}
            >
              {selectedIds.size > 0 && selectedIds.size === filteredVideos.filter(v => v.hasSubtitles).length ? (
                <CheckSquare size={18} className="text-blue-600" />
              ) : selectedIds.size > 0 ? (
                <div className="w-[18px] h-[18px] rounded-[3px] bg-blue-600 flex items-center justify-center">
                  <div className="w-2.5 h-0.5 bg-white rounded-full"></div>
                </div>
              ) : (
                <Square size={18} className="text-slate-400 group-hover:text-slate-600" />
              )}
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${selectionMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Selection Dropdown Menu */}
            {selectionMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                <button
                  onClick={handleSelectAll}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <CheckSquare size={14} className="text-slate-400" /> {t('allWithSubtitles')}
                </button>
                <button
                  onClick={handleSelectPage}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileText size={14} className="text-slate-400" /> {t('visibleOnPage')}
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={handleDeselectAll}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <X size={14} /> {t('deselectAll')}
                </button>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 mx-1"></div>

          {/* Quick Filter Tabs */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            {[
              { id: 'all', label: t('all'), icon: null },
              { id: 'withSubtitles', label: t('subsShort'), icon: <CheckCircle2 size={12} /> },
              { id: 'withoutSubtitles', label: t('noSubsShort'), icon: <AlertCircle size={12} /> }
            ].map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${activeFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 w-64 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder={t('searchVideos')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* --- List Content --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
        {filteredVideos.length > 0 ? (
          <div className="divide-y divide-slate-100 pb-24">
            {visibleVideos.map((video) => (
              <div
                key={video.id}
                className={`group flex items-center gap-4 px-4 py-2.5 transition-all cursor-pointer hover:bg-slate-50 relative ${selectedIds.has(video.id)
                  ? 'bg-blue-50/40 hover:bg-blue-50/60'
                  : !video.hasSubtitles ? 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' : ''
                  }`}
                onClick={() => handleVideoToggle(video.id, video.hasSubtitles)}
              >
                {/* Selection State Indicator Border */}
                {selectedIds.has(video.id) && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500"></div>
                )}

                {/* Checkbox */}
                <div className="shrink-0 pl-1">
                  {video.hasSubtitles ? (
                    selectedIds.has(video.id) ? (
                      <div className="bg-blue-600 text-white rounded-[4px] p-0.5 shadow-sm shadow-blue-200 transition-transform scale-100 active:scale-95">
                        <CheckSquare size={16} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <Square size={20} className="text-slate-300 group-hover:text-slate-400 transition-colors" strokeWidth={1.5} />
                    )
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    </div>
                  )}
                </div>

                {/* Thumbnail - Compact 16:9 */}
                <div className="shrink-0 relative w-24 aspect-video bg-slate-200 rounded-md overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Duration Badge (Mockup if not real) */}
                  <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[9px] font-mono px-1 rounded-sm">
                    {/* Placeholder timestamp if needed, or real data */}
                    {video.duration || "HD"}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className={`font-medium text-sm truncate pr-4 ${selectedIds.has(video.id) ? 'text-blue-900' : 'text-slate-900'}`}>
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <Youtube size={10} /> {video.uploader}
                    </span>
                    {video.hasSubtitles && (
                      <span className="text-[10px] text-slate-300">•</span>
                    )}
                    {video.hasSubtitles && (
                      <span className="text-[10px] text-slate-400 font-medium">{t('ccAvailable')}</span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  <StatusChip status={video.subtitleStatus} hasSubtitles={video.hasSubtitles} />
                </div>
              </div>
            ))}

            {/* Load More Trigger */}
            {displayLimit < filteredVideos.length && (
              <div className="p-4 flex justify-center bg-white">
                <button
                  onClick={() => setDisplayLimit(prev => prev + 20)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-2 rounded-full transition-all uppercase tracking-wider"
                >
                  {t('loadMore', { count: filteredVideos.length - displayLimit })}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">{t('noVideosFound')}</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveFilter('all'); }}
              className="mt-4 text-xs font-bold text-blue-600 hover:underline"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>

      {/* --- Footer: Selection Summary Bar (Gmail Style) --- */}
      {selectedIds.size > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 z-30 animate-in slide-in-from-bottom-4 duration-300 border border-slate-700/50 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">
              {selectedIds.size}
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{t('selected')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDeselectAll}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider px-2"
            >
              {t('clearSelection')}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
