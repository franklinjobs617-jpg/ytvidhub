"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Link,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Clock,
  Play
} from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (url?: string) => void;
  isLoading: boolean;
  className?: string;
}

export function UrlInput({ value, onChange, onSubmit, isLoading, className = "" }: UrlInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [validationState, setValidationState] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  // URL 验证
  useEffect(() => {
    if (!value.trim()) {
      setValidationState('idle');
      return;
    }

    const isValidYouTubeUrl = value.includes("youtube.com") || value.includes("youtu.be");
    setValidationState(isValidYouTubeUrl ? 'valid' : 'invalid');
  }, [value]);

  // 开始加载时自动失去焦点
  useEffect(() => {
    if (isLoading && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && validationState === 'valid' && !isLoading) {
      onSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText && (pastedText.includes("youtube.com") || pastedText.includes("youtu.be"))) {
      // 自动提交有效的 YouTube URL
      setTimeout(() => {
        if (validationState === 'valid') {
          onSubmit();
        }
      }, 100);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 size={16} className="animate-spin text-blue-500" />;
    if (validationState === 'valid') return <CheckCircle size={16} className="text-green-500" />;
    if (validationState === 'invalid') return <AlertCircle size={16} className="text-red-500" />;
    return <Link size={16} className="text-slate-400" />;
  };

  const getPlaceholder = () => {
    if (isFocused) return "https://youtube.com/watch?v=...";
    return "Paste YouTube URL to analyze...";
  };

  return (
    <div className={`relative ${className} w-full`}>
      <div className={`
        relative flex items-center bg-slate-100 hover:bg-slate-200/50 rounded-lg transition-all duration-200 h-[36px] overflow-hidden group
        ${isFocused ? 'bg-white ring-2 ring-violet-500/80 shadow-sm hover:bg-white' : 'ring-1 ring-slate-200/60'}
        ${validationState === 'valid' && isFocused ? 'ring-emerald-500' : ''}
        ${validationState === 'invalid' && isFocused ? 'ring-red-500' : ''}
      `}>
        {/* 状态图标 */}
        <div className="pl-3 pr-2 flex items-center justify-center">
          {isLoading ? (
            <Loader2 size={15} className="animate-spin text-slate-400" />
          ) : (
            <Link size={15} className={`transition-colors ${isFocused ? 'text-violet-500' : 'text-slate-400 group-hover:text-slate-500'}`} />
          )}
        </div>

        {/* 输入框 */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={getPlaceholder()}
          disabled={isLoading}
          className="flex-1 bg-transparent text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:opacity-60 h-full w-full"
          spellCheck="false"
        />

        {/* 快捷键提示 或 按钮组 */}
        <div className="flex items-center space-x-2 pr-1.5 shrink-0">
          <AnimatePresence mode="popLayout">
            {!value.trim() && !isFocused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="hidden sm:flex items-center gap-1 opacity-60"
              >
                <kbd className="inline-flex h-5 items-center justify-center rounded border border-slate-200 bg-white px-1.5 text-[10px] font-medium text-slate-500 shadow-sm">
                  ⌘
                </kbd>
                <kbd className="inline-flex h-5 items-center justify-center rounded border border-slate-200 bg-white px-1.5 text-[10px] font-medium text-slate-500 shadow-sm">
                  K
                </kbd>
              </motion.div>
            )}

            {(value.trim() && validationState === 'valid') && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => onSubmit()}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 px-3 py-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-65 text-white text-xs font-semibold rounded-md transition-all shadow-sm h-6"
              >
                {isLoading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Sparkles size={12} />
                )}
                <span className="hidden sm:inline">Analyze</span>
                <span className="inline sm:hidden">Go</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 验证提示 */}
      <AnimatePresence>
        {validationState === 'invalid' && value.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-10 w-full p-2.5 bg-red-50 border border-red-100 rounded-lg shadow-xl shadow-red-500/10 z-50"
          >
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-700">Invalid YouTube URL</p>
                <p className="text-[11px] text-red-600/80 mt-0.5 leading-tight">
                  Please enter a valid YouTube video, playlist, or channel URL
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 快捷提示 */}
      <AnimatePresence>
        {isFocused && !value.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-10 w-full p-3 bg-white border border-slate-200/60 rounded-lg shadow-xl shadow-slate-200/40 z-50"
          >
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Input Guide</p>
              <div className="space-y-1.5 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2 px-1 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                  <Play size={13} className="text-slate-400 shrink-0" />
                  <span>Supports videos, playlists, & channels</span>
                </div>
                <div className="flex items-center gap-2 px-1 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                  <Clock size={13} className="text-slate-400 shrink-0" />
                  <span>Returns full analysis in seconds</span>
                </div>
                <div className="flex items-center gap-2 px-1 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                  <Sparkles size={13} className="text-slate-400 shrink-0" />
                  <span>Paste URL to start instantly</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}