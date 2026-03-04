"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  activeTab: "video" | "analysis";
  onTabChange: (tab: "video" | "analysis") => void;
  leftWidth: number;
  onLeftWidthChange: (width: number) => void;
}

export function ResponsiveLayout({
  children,
  leftPanel,
  rightPanel,
  activeTab,
  onTabChange,
  leftWidth,
  onLeftWidthChange
}: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 拖拽调整大小
  const startResizing = useCallback(() => {
    if (isMobile) return;
    
    resizeRef.current = true;
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [isMobile]);

  const stopResizing = useCallback(() => {
    resizeRef.current = false;
    setIsResizing(false);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!resizeRef.current || isMobile) return;

    requestAnimationFrame(() => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 25 && newWidth < 75) {
        onLeftWidthChange(newWidth);
      }
    });
  }, [isMobile, onLeftWidthChange]);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing, isMobile]);

  // 移动端手势支持
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeTab === "video") {
      onTabChange("analysis");
    }
    if (isRightSwipe && activeTab === "analysis") {
      onTabChange("video");
    }
  };

  if (isMobile) {
    // 移动端布局
    return (
      <div 
        className="flex-1 flex flex-col overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {activeTab === "video" ? (
            <motion.div
              key="video"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {leftPanel}
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {rightPanel}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 滑动指示器 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {["video", "analysis"].map((tab, index) => (
            <div
              key={tab}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeTab === tab ? "bg-violet-600 w-6" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // 桌面端布局
  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* 拖动遮罩层 - 防止 iframe 捕获鼠标事件 */}
      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}

      {/* 左侧面板 */}
      <div
        className={`flex flex-col bg-white ${isResizing ? '' : 'transition-all duration-200 ease-out'}`}
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>

      {/* 拖拽分隔器 */}
      <div
        onMouseDown={startResizing}
        className={`
          w-1 hover:w-2 -ml-0.5 z-20 cursor-col-resize transition-all shrink-0
          flex items-center justify-center group relative
          ${isResizing ? "bg-violet-400/30" : "bg-transparent hover:bg-violet-400/20"}
        `}
      >
        <div className={`
          w-px h-full transition-colors
          ${isResizing ? "bg-violet-500" : "bg-slate-200 group-hover:bg-violet-400"}
        `} />

        {/* 拖拽提示 */}
        {isResizing && (
          <div className="absolute top-1/2 -translate-y-1/2 left-2 px-2 py-1 bg-violet-600 text-white text-xs rounded whitespace-nowrap z-[60]">
            {Math.round(leftWidth)}% / {Math.round(100 - leftWidth)}%
          </div>
        )}
      </div>

      {/* 右侧面板 */}
      <div className="flex-1 overflow-hidden bg-slate-50">
        {rightPanel}
      </div>
    </div>
  );
}