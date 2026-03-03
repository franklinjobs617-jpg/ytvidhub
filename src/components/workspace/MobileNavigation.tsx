"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Video, Sparkles, MoreHorizontal } from "lucide-react";

interface MobileNavigationProps {
  activeTab: "video" | "analysis";
  onTabChange: (tab: "video" | "analysis") => void;
  hasAnalysis: boolean;
  isAnalyzing: boolean;
}

const TABS = [
  { 
    id: "video" as const, 
    label: "Video", 
    icon: Video,
    description: "Watch & Navigate"
  },
  { 
    id: "analysis" as const, 
    label: "AI Summary", 
    icon: Sparkles,
    description: "Insights & Cards"
  },
];

export function MobileNavigation({ 
  activeTab, 
  onTabChange, 
  hasAnalysis, 
  isAnalyzing 
}: MobileNavigationProps) {
  return (
    <nav className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-sm shrink-0 z-[70] safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 pt-2 pb-safe">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.id === "analysis" && !hasAnalysis && !isAnalyzing;
          
          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onTabChange(tab.id)}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200
                ${isActive 
                  ? "text-violet-600 bg-violet-50" 
                  : isDisabled
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 active:scale-95"
                }
              `}
            >
              {/* 图标容器 */}
              <div className="relative">
                <tab.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                
                {/* 分析中的加载指示器 */}
                {tab.id === "analysis" && isAnalyzing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-3 h-3 border border-violet-500 border-t-transparent rounded-full"
                  />
                )}
                
                {/* 新内容指示器 */}
                {tab.id === "analysis" && hasAnalysis && !isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>

              {/* 标签文字 */}
              <div className="text-center">
                <span className={`
                  text-[10px] font-bold uppercase tracking-wide leading-none
                  ${isActive ? "text-violet-700" : ""}
                `}>
                  {tab.label}
                </span>
                
                {/* 描述文字 - 仅在激活时显示 */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="block text-[8px] text-violet-500 font-medium mt-0.5"
                  >
                    {tab.description}
                  </motion.span>
                )}
              </div>

              {/* 激活指示器 */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-violet-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      
      {/* 手势提示 - 首次使用时显示 */}
      <GestureHint />
    </nav>
  );
}

// 手势提示组件
function GestureHint() {
  const [showHint, setShowHint] = useState(true);
  
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('mobile-gesture-hint-seen');
    if (hasSeenHint) {
      setShowHint(false);
    } else {
      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('mobile-gesture-hint-seen', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showHint) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap"
    >
      <div className="flex items-center gap-2">
        <MoreHorizontal size={12} />
        <span>Swipe left/right to switch tabs</span>
      </div>
      
      {/* 箭头 */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
    </motion.div>
  );
}