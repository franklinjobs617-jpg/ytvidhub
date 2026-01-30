"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
  seekTime?: number;
  onTimeUpdate?: (time: number) => void;
}

export function VideoPlayer({
  videoId,
  seekTime,
  onTimeUpdate,
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (seekTime !== undefined && videoId && iframeRef.current) {
      const baseUrl = `https://www.youtube.com/embed/${videoId}`;
      const params = `?autoplay=1&start=${Math.floor(seekTime)}&enablejsapi=1`;
      iframeRef.current.src = baseUrl + params;
    }
  }, [seekTime, videoId]);

  if (!videoId)
    return (
      <div className="aspect-video bg-slate-100 rounded-xl animate-pulse" />
    );

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-md">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
