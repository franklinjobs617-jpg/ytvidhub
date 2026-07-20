"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// 首页滚动深度追踪
// 目的：诊断首页平均停留13.5秒过短的问题——现有GA的scroll事件是GA4自动埋点，
// 只在滚动过90%时触发一次，无法看出用户具体停在哪个区块离开。
// 这个组件把滚动深度拆成4档，每档只上报一次，能看清用户是被首屏劝退，
// 还是往下滑了一部分才走，为后续首页内容调整提供依据。
const THRESHOLDS = [25, 50, 75, 100] as const;

export default function ScrollDepthTracker({ page = "home" }: { page?: string }) {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const getScrollPercentage = (): number => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;
      if (scrollable <= 0) return 100; // 内容不够一屏，视为已看完全部
      return Math.min(100, Math.round((scrollTop / scrollable) * 100));
    };

    const handleScroll = () => {
      const percentage = getScrollPercentage();
      for (const threshold of THRESHOLDS) {
        if (percentage >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackEvent("scroll_depth", {
            page,
            depth_percentage: threshold,
          });
        }
      }
    };

    // 页面加载时立即检查一次（处理内容不足一屏、或用户带锚点直接落在下方的情况）
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return null;
}
