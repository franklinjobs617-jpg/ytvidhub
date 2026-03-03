"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  AlertCircle,
  Music,
  Users,
  Video
} from "lucide-react";

interface PlaylistInfo {
  title: string;
  uploader: string;
  totalVideos: number;
  url: string;
}

interface ProcessingState {
  phase: 'expanding' | 'checking' | 'completed' | 'error' | 'paused';
  currentPlaylist?: PlaylistInfo;
  totalVideos: number;
  processedVideos: number;
  videosWithSubtitles: number;
  currentVideoTitle?: string;
  estimatedTimeRemaining?: number;
  error?: string;
}

interface PlaylistProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onPause: () => void;
  onResume: () => void;
  state: ProcessingState;
}

export function PlaylistProcessingModal({
  isOpen,
  onClose,
  onCancel,
  onPause,
  onResume,
  state
}: PlaylistProcessingModalProps) {
  const t = useTranslations('playlist');
  const tStatus = useTranslations('status');

  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const progressPercentage = state.totalVideos > 0
    ? Math.round((state.processedVideos / state.totalVideos) * 100)
    : 0;

  const getPhaseIcon = () => {
    switch (state.phase) {
      case 'expanding':
        return <Music className="animate-pulse text-blue-500" size={24} />;
      case 'checking':
        return <Clock className="animate-spin text-yellow-500" size={24} />;
      case 'completed':
        return <CheckCircle2 className="text-green-500" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={24} />;
      case 'paused':
        return <Pause className="text-gray-500" size={24} />;
      default:
        return <Clock className="text-gray-400" size={24} />;
    }
  };

  const getPhaseTitle = () => {
    switch (state.phase) {
      case 'expanding':
        return t('processing.expanding');
      case 'checking':
        return t('processing.checking');
      case 'completed':
        return t('processing.completed');
      case 'error':
        return t('processing.error');
      case 'paused':
        return t('processing.paused');
      default:
        return t('processing.unknown');
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {getPhaseIcon()}
          <span className="text-sm font-semibold text-slate-800">{getPhaseTitle()}</span>
        </div>
        <div className="flex items-center gap-1">
          {(state.phase === 'checking' || state.phase === 'paused') && (
            <button onClick={state.phase === 'paused' ? onResume : onPause} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              {state.phase === 'paused' ? <Play size={14} className="text-slate-500" /> : <Pause size={14} className="text-slate-500" />}
            </button>
          )}
          <button onClick={onCancel} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
            <X size={14} className="text-slate-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{state.processedVideos} / {state.totalVideos} videos</span>
          <span className="font-bold text-blue-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {state.currentVideoTitle && state.phase === 'checking' && (
          <p className="text-[11px] text-slate-400 truncate">{state.currentVideoTitle}</p>
        )}
        {state.error && (
          <p className="text-[11px] text-red-500 truncate">{state.error}</p>
        )}
      </div>
    </div>
  );
}