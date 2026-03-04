"use client";

import { useEffect, useRef } from "react";
import React from "react";

interface VideoPlayerProps {
  videoId: string;
  seekTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export const VideoPlayer = React.forwardRef<any, VideoPlayerProps>(({ videoId, seekTime, onTimeUpdate }, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastUpdateRef = useRef<number>(0);

  // 暴露播放控制方法给父组件
  React.useImperativeHandle(ref, () => ({
    togglePlayPause: () => {
      if (iframeRef.current?.contentWindow) {
        // 先尝试暂停，如果已经暂停则播放
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        );
        // 延迟一点再尝试播放（如果视频已经暂停）
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
            "*"
          );
        }, 100);
      }
    },
    seekTo: (time: number) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [Math.floor(time), true] }),
          "*"
        );
      }
    }
  }));

  // Subscribe to YouTube infoDelivery events for current time
  useEffect(() => {
    if (!onTimeUpdate) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.event === "infoDelivery" && data?.info?.currentTime !== undefined) {
          // Throttle to once per second to avoid excessive re-renders
          const now = Date.now();
          if (now - lastUpdateRef.current >= 1000) {
            lastUpdateRef.current = now;
            onTimeUpdate(data.info.currentTime);
          }
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onTimeUpdate]);

  // After iframe loads, subscribe to YouTube events
  const handleIframeLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening" }),
      "*"
    );
  };

  // 切换视频时使用 loadVideoById，避免重新加载 iframe
  useEffect(() => {
    if (!videoId || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "loadVideoById", args: [videoId] }),
      "*"
    );
  }, [videoId]);

  // Seek without reloading
  useEffect(() => {
    if (seekTime === undefined || !iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "seekTo", args: [Math.floor(seekTime), true] }),
      "*"
    );
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*"
    );
  }, [seekTime]);

  if (!videoId)
    return <div className="aspect-video bg-slate-100 rounded-xl animate-pulse" />;

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-md">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title="Video Player"
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleIframeLoad}
      />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
