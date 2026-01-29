"use client";

import { useEffect, useState } from "react";
import { Sparkles, Video, Brain } from "lucide-react";

interface LoadingTransitionProps {
  stage: "analyzing" | "preparing" | "ready";
  videoTitle?: string;
}

export function LoadingTransition({ stage, videoTitle }: LoadingTransitionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (stage === "analyzing" && prev < 60) return prev + 2;
        if (stage === "preparing" && prev < 90) return prev + 3;
        if (stage === "ready") return 100;
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [stage]);

  const stages = [
    { id: "analyzing", label: "Analyzing Video", icon: Video, color: "blue" },
    { id: "preparing", label: "Preparing AI Workspace", icon: Sparkles, color: "violet" },
    { id: "ready", label: "Ready!", icon: Brain, color: "green" }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-md w-full px-6">
        {/* 主要图标 */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-violet-200 blur-2xl opacity-30 rounded-full"></div>
          <div className="relative w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center">
            <Sparkles size={40} className="text-violet-600 animate-pulse" />
          </div>
        </div>

        {/* 视频标题 */}
        {videoTitle && (
          <h2 className="text-lg font-bold text-slate-800 text-center mb-2 line-clamp-2">
            {videoTitle}
          </h2>
        )}

        {/* 进度条 */}
        <div className="mb-8">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-violet-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 阶段指示器 */}
        <div className="space-y-4">
          {stages.map((stageItem, index) => {
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;
            const IconComponent = stageItem.icon;

            return (
              <div 
                key={stageItem.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-white shadow-md ring-1 ring-slate-200" 
                    : isCompleted
                    ? "bg-green-50"
                    : "bg-slate-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive 
                    ? "bg-violet-100 text-violet-600" 
                    : isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-200 text-slate-400"
                }`}>
                  <IconComponent size={16} className={isActive ? "animate-pulse" : ""} />
                </div>
                <span className={`text-sm font-medium ${
                  isActive 
                    ? "text-slate-900" 
                    : isCompleted
                    ? "text-green-700"
                    : "text-slate-500"
                }`}>
                  {stageItem.label}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                  </div>
                )}
                {isCompleted && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 底部提示 */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Setting up your AI-powered workspace...
        </p>
      </div>
    </div>
  );
}