"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ResponsiveLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  activeTab: "video" | "analysis";
  onTabChange: (tab: "video" | "analysis") => void;
  leftWidth: number;
  onLeftWidthChange: (width: number) => void;
}

export function ResponsiveLayout({
  leftPanel,
  rightPanel,
  activeTab,
  onTabChange,
  leftWidth,
  onLeftWidthChange,
}: ResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!resizeRef.current || isMobile) return;

      requestAnimationFrame(() => {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 25 && newWidth < 75) {
          onLeftWidthChange(newWidth);
        }
      });
    },
    [isMobile, onLeftWidthChange]
  );

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing, isMobile]);

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
    return (
      <div
        className="relative flex flex-1 flex-col overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex-1 overflow-hidden pb-[92px]">
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden transition-all duration-200 ease-out ${
              activeTab === "video"
                ? "z-[2] translate-x-0 opacity-100"
                : "z-[1] -translate-x-3 opacity-0 pointer-events-none"
            }`}
          >
            {leftPanel}
          </div>

          <div
            className={`absolute inset-0 flex flex-col overflow-hidden transition-all duration-200 ease-out ${
              activeTab === "analysis"
                ? "z-[2] translate-x-0 opacity-100"
                : "z-[1] translate-x-3 opacity-0 pointer-events-none"
            }`}
          >
            {rightPanel}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 overflow-hidden">
      {isResizing && <div className="fixed inset-0 z-50 cursor-col-resize" />}

      <div
        className={`flex flex-col bg-white ${isResizing ? "" : "transition-all duration-200 ease-out"}`}
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>

      <div
        onMouseDown={startResizing}
        className={`
          group relative z-20 -ml-0.5 flex w-1 shrink-0 cursor-col-resize items-center justify-center transition-all hover:w-2
          ${isResizing ? "bg-violet-400/30" : "bg-transparent hover:bg-violet-400/20"}
        `}
      >
        <div
          className={`
            h-full w-px transition-colors
            ${isResizing ? "bg-violet-500" : "bg-slate-200 group-hover:bg-violet-400"}
          `}
        />

        {isResizing && (
          <div className="absolute left-2 top-1/2 z-[60] -translate-y-1/2 whitespace-nowrap rounded bg-violet-600 px-2 py-1 text-xs text-white">
            {Math.round(leftWidth)}% / {Math.round(100 - leftWidth)}%
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden bg-slate-50">{rightPanel}</div>
    </div>
  );
}
