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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {getPhaseIcon()}
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {getPhaseTitle()}
              </h3>
              {state.currentPlaylist && (
                <p className="text-sm text-gray-500 truncate max-w-48">
                  {state.currentPlaylist.title}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Playlist Info Card */}
          {state.currentPlaylist && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-900 truncate">
                    {state.currentPlaylist.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-blue-700">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {state.currentPlaylist.uploader}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video size={14} />
                      {state.currentPlaylist.totalVideos} videos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Section */}
          <div className="space-y-4">
            {/* Main Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {t('progress.overall')}
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-lg font-bold text-gray-900">
                  {state.totalVideos}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {t('stats.total')}
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-lg font-bold text-yellow-700">
                  {state.processedVideos}
                </div>
                <div className="text-xs text-yellow-600 uppercase tracking-wide">
                  {t('stats.processed')}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-lg font-bold text-green-700">
                  {state.videosWithSubtitles}
                </div>
                <div className="text-xs text-green-600 uppercase tracking-wide">
                  {t('stats.withSubtitles')}
                </div>
              </div>
            </div>

            {/* Current Status */}
            {state.phase === 'checking' && state.currentVideoTitle && (
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <div className="text-sm text-yellow-800">
                  <span className="font-medium">{t('status.currentVideo')}:</span>
                  <div className="truncate mt-1 text-yellow-700">
                    {state.currentVideoTitle}
                  </div>
                </div>
              </div>
            )}

            {/* Time Estimation */}
            {state.estimatedTimeRemaining && state.phase === 'checking' && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>
                  {t('time.estimated')}: {formatTime(state.estimatedTimeRemaining)}
                </span>
              </div>
            )}

            {/* Error Message */}
            {state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    {state.error}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showDetails ? t('actions.hideDetails') : t('actions.showDetails')}
          </button>
          
          <div className="flex items-center gap-3">
            {state.phase === 'checking' && (
              <button
                onClick={state.phase === 'paused' ? onResume : onPause}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {state.phase === 'paused' ? (
                  <>
                    <Play size={16} />
                    {t('actions.resume')}
                  </>
                ) : (
                  <>
                    <Pause size={16} />
                    {t('actions.pause')}
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              {t('actions.cancel')}
            </button>
          </div>
        </div>

        {/* Details Panel */}
        {showDetails && (
          <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-3">
            <h4 className="font-medium text-gray-900">{t('details.title')}</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Phase: {state.phase}</div>
              <div>Progress: {state.processedVideos}/{state.totalVideos}</div>
              <div>Success Rate: {state.totalVideos > 0 ? Math.round((state.videosWithSubtitles / state.processedVideos) * 100) : 0}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}