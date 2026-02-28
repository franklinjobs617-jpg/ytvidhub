"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
  seekTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({ videoId, seekTime, onTimeUpdate }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastUpdateRef = useRef<number>(0);

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
}
