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
  Loader2
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
}

export function VideoSwitcher({ videos, activeId, onSelect, isLoading = false }: VideoSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  return (
    <div className="bg-white border-b border-slate-100 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 左箭头 */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0 || isTransitioning}
          className="p-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          <ChevronLeft size={18} className="text-slate-600" />
        </button>

        {/* 视频列表 */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {videos.map((video, index) => (
              <motion.button
                key={video.id}
                onClick={() => handleSelect(video, index)}
                disabled={isTransitioning}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl transition-all shrink-0 min-w-0
                  ${video.id === activeId 
                    ? 'bg-violet-100 border-2 border-violet-500' 
                    : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                  }
                  ${isTransitioning ? 'opacity-60' : ''}
                `}
                whileHover={{ scale: video.id === activeId ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 缩略图 */}
                <div className="relative">
                  <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-200">
                    <img 
                      src={video.thumbnail} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 播放状态指示器 */}
                  {video.id === activeId && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader2 size={8} className="text-white animate-spin" />
                      ) : (
                        <Play size={8} className="text-white fill-current" />
                      )}
                    </motion.div>
                  )}
                </div>

                {/* 视频信息 */}
                <div className="min-w-0 text-left">
                  <h3 className={`
                    text-sm font-medium line-clamp-1 transition-colors
                    ${video.id === activeId ? 'text-violet-900' : 'text-slate-700'}
                  `}>
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {video.uploader && (
                      <div className="flex items-center gap-1">
                        <Users size={10} className="text-slate-400" />
                        <span className="text-xs text-slate-500 truncate max-w-20">
                          {video.uploader}
                        </span>
                      </div>
                    )}
                    
                    {video.duration && (
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {formatDuration(video.duration)}
                        </span>
                      </div>
                    )}
                    
                    {video.hasSubtitles && (
                      <CheckCircle size={10} className="text-green-500" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 右箭头 */}
        <button
          onClick={goToNext}
          disabled={currentIndex === videos.length - 1 || isTransitioning}
          className="p-2 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          <ChevronRight size={18} className="text-slate-600" />
        </button>

        {/* 计数器 */}
        <div className="text-xs text-slate-500 font-medium shrink-0">
          {currentIndex + 1} / {videos.length}
        </div>
      </div>
    </div>
  );
}