"use client";

import { useState, useEffect } from "react";
import { Play, Sparkles, ArrowRight, FileText, Zap, Brain } from "lucide-react";

interface EmptyStateProps {
  onUrlSubmit: (url: string) => void;
}

export function EmptyState({ onUrlSubmit }: EmptyStateProps) {
  const [inputUrl, setInputUrl] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 渐进式进入动画
    setIsAnimating(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onUrlSubmit(inputUrl.trim());
    }
  };

  const exampleUrls = [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Music Video",
      type: "music",
    },
    {
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      title: "Tech Talk",
      type: "tech",
    },
    {
      url: "https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMHjMZOz59Oq8HmPME",
      title: "Course Playlist",
      type: "playlist",
    },
  ];

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-4 md:p-8">
      <div
        className={`max-w-lg w-full transition-all duration-700 ease-out ${
          isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 主图标 - 精致但简洁 */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl opacity-10"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
          </div>

          {/* 文案 - 友好直接 */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Ready to analyze?
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Get insights and key points from any YouTube video
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative group">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="w-full px-4 py-4 pr-14 border border-slate-200 rounded-xl text-base bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 group-hover:border-slate-300"
              aria-label="YouTube URL input"
              autoComplete="url"
            />
            <button
              type="submit"
              disabled={!inputUrl.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Start analysis"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {/* 示例链接 - 简洁但有用 */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 text-center">
            Or try an example:
          </p>
          <div className="grid gap-2">
            {exampleUrls.map((example, index) => (
              <button
                key={index}
                onClick={() => onUrlSubmit(example.url)}
                className="group flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-200 active:scale-[0.98] md:active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                aria-label={`Try example: ${example.title}`}
              >
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  {example.type === "music" && (
                    <Play size={14} className="text-slate-600" />
                  )}
                  {example.type === "tech" && (
                    <Zap size={14} className="text-slate-600" />
                  )}
                  {example.type === "playlist" && (
                    <Brain size={14} className="text-slate-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-700">
                    {example.title}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {example.url}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 功能预览 - 极简但信息丰富，移动端优化 */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-4 md:gap-8 text-xs text-slate-500 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Key Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="hidden sm:inline">Interactive </span>
              <span>Transcript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Study Cards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
