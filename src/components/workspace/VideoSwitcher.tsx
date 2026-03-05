"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  Users,
  CheckCircle,
  Loader2,
  Plus
} from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  uploader?: string;
  duration?: number;
  hasSubtitles?: boolean;
}

interface VideoSwitcherProps {
  videos: Video[];
  activeId: string;
  onSelect: (video: Video) => void;
  isLoading?: boolean;
  onAddVideo?: () => void;
}

export function VideoSwitcher({ videos, activeId, onSelect, isLoading = false, onAddVideo }: VideoSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 更新当前索引
  useEffect(() => {
    const index = videos.findIndex(v => v.id === activeId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [activeId, videos]);

  const handleSelect = async (video: Video, index: number) => {
    if (video.id === activeId || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // 添加短暂延迟，让用户感知到切换动作
    setTimeout(() => {
      onSelect(video);
      setIsTransitioning(false);
    }, 150);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      handleSelect(videos[currentIndex - 1], currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < videos.length - 1) {
      handleSelect(videos[currentIndex + 1], currentIndex + 1);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (videos.length <= 1) return null;

  const currentVideo = videos[currentIndex];

  return (
    <>
      {/* 紧凑的视频切换栏 */}
      <div className="bg-white border-b border-slate-100 px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* 左箭头 */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0 || isTransitioning}
            className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            <ChevronLeft size={16} className="text-slate-600" />
          </button>

          {/* 当前视频信息 - 可点击展开列表 */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-lg transition-all text-left min-w-0"
          >
            {/* 缩略图 */}
            <div className="relative shrink-0">
              <div className="w-14 h-9 rounded-md overflow-hidden bg-slate-200">
                <img
                  src={currentVideo.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {isLoading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-md">
                  <Loader2 size={12} className="text-white animate-spin" />
                </div>
              )}
            </div>

            {/* 视频标题 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-slate-800 line-clamp-1">
                {currentVideo.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentVideo.uploader}
              </p>
            </div>

            {/* 计数器 */}
            <div className="shrink-0 px-2.5 py-1 bg-slate-100 rounded-full">
              <span className="text-xs font-medium text-slate-700">
                {currentIndex + 1}/{videos.length}
              </span>
            </div>
          </button>

          {/* 右箭头 */}
          <button
            onClick={goToNext}
            disabled={currentIndex === videos.length - 1 || isTransitioning}
            className="p-1.5 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 展开的视频列表 */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />

            {/* 视频列表弹窗 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-4 right-4 max-w-2xl mx-auto bg-white rounded-xl shadow-2xl z-50 max-h-[70vh] overflow-hidden flex flex-col"
            >
              {/* 标题栏 */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Playlist ({videos.length} videos)
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={18} className="text-slate-600 rotate-90" />
                </button>
              </div>

              {/* 视频列表 */}
              <div className="flex-1 overflow-y-auto p-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      handleSelect(video, index);
                      setIsExpanded(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left
                      ${video.id === activeId
                        ? 'bg-violet-50 border border-violet-200'
                        : 'hover:bg-slate-50'
                      }
                    `}
                  >
                    {/* 序号 */}
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                      ${video.id === activeId
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}>
                      {index + 1}
                    </div>

                    {/* 缩略图 */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-12 rounded-md overflow-hidden bg-slate-200">
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {video.id === activeId && (
                        <div className="absolute inset-0 bg-violet-600/20 flex items-center justify-center rounded-md">
                          <Play size={16} className="text-white fill-current" />
                        </div>
                      )}
                    </div>

                    {/* 视频信息 */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        text-sm font-medium line-clamp-2
                        ${video.id === activeId ? 'text-violet-900' : 'text-slate-800'}
                      `}>
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {video.uploader && (
                          <span className="text-xs text-slate-500 truncate">
                            {video.uploader}
                          </span>
                        )}
                        {video.duration && (
                          <span className="text-xs text-slate-400">
                            • {formatDuration(video.duration)}
                          </span>
                        )}
                      </div>
                    </div>

                    {video.id === activeId && (
                      <CheckCircle size={18} className="text-violet-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}