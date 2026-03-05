"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Target
} from "lucide-react";

interface AnalysisStatusProps {
  isAnalyzing: boolean;
  hasResult: boolean;
  error?: string;
  onRetry?: () => void;
  estimatedTime?: number;
}

const ANALYSIS_STEPS = [
  { id: 'fetch', label: 'Fetching subtitles', icon: FileText, duration: 5000 },
  { id: 'process', label: 'Processing content', icon: Brain, duration: 15000 },
  { id: 'analyze', label: 'Generating insights', icon: Sparkles, duration: 25000 },
  { id: 'finalize', label: 'Finalizing results', icon: Target, duration: 5000 },
];

export function AnalysisStatus({
  isAnalyzing,
  hasResult,
  error,
  onRetry,
  estimatedTime = 45
}: AnalysisStatusProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // 重置状态
  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0);
      setElapsedTime(0);
      setProgress(0);
    }
  }, [isAnalyzing]);

  // 模拟分析进度
  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);

      // 计算总体进度
      const totalDuration = ANALYSIS_STEPS.reduce((sum, step) => sum + step.duration, 0);
      const newProgress = Math.min((elapsedTime * 1000) / totalDuration * 100, 95);
      setProgress(newProgress);

      // 更新当前步骤
      let accumulatedTime = 0;
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        accumulatedTime += ANALYSIS_STEPS[i].duration;
        if (elapsedTime * 1000 < accumulatedTime) {
          setCurrentStep(i);
          break;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnalyzing, elapsedTime]);

  // 完成时设置100%进度
  useEffect(() => {
    if (hasResult && !isAnalyzing) {
      setProgress(100);
      setCurrentStep(ANALYSIS_STEPS.length);
    }
  }, [hasResult, isAnalyzing]);

  if (!isAnalyzing && !hasResult) return null;

  return (
    <AnimatePresence mode="wait">
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-4 mx-4 mb-4"
        >
          <div className="flex items-center gap-4">
            {/* 动画图标 */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center"
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>

              {/* 脉冲效果 */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400 rounded-xl"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  key={currentStep}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  {currentStep < ANALYSIS_STEPS.length && (() => {
                    const IconComponent = ANALYSIS_STEPS[currentStep].icon;
                    return (
                      <>
                        <IconComponent size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          {ANALYSIS_STEPS[currentStep].label}
                        </span>
                      </>
                    );
                  })()}
                </motion.div>

                <div className="flex items-center gap-1 ml-auto">
                  <Clock size={12} className="text-blue-500" />
                  <span className="text-xs text-blue-600 font-medium">
                    {elapsedTime}s / ~{estimatedTime}s
                  </span>
                </div>
              </div>

              {/* 进度条 */}
              <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-600 rounded-full"
                />

                {/* 闪烁效果 */}
                <motion.div
                  animate={{ x: [-20, 200] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full w-5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>

              {/* 步骤指示器 */}
              <div className="flex items-center gap-1 mt-2">
                {ANALYSIS_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index < currentStep ? 'bg-green-500' :
                        index === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 成功状态 */}
      {hasResult && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4 mx-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle size={16} className="text-white" />
            </motion.div>

            <div>
              <p className="text-sm font-medium text-green-900">Analysis Complete</p>
              <p className="text-xs text-green-700">
                Generated insights and study materials in {elapsedTime}s
              </p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="ml-auto"
            >
              <Zap size={16} className="text-green-600" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* 错误状态 - 已移除，改用 toast 通知 */}
    </AnimatePresence>
  );
}