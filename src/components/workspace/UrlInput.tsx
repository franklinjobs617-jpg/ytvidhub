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
    <div className={`relative ${className}`}>
      <div className={`
        relative flex items-center bg-white border-2 rounded-xl transition-all duration-200
        ${isFocused ? 'border-violet-500 shadow-lg shadow-violet-500/10' : 'border-slate-200'}
        ${validationState === 'valid' ? 'border-green-500' : ''}
        ${validationState === 'invalid' ? 'border-red-500' : ''}
      `}>
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
          className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none disabled:opacity-60"
        />

        {/* 状态图标 */}
        <div className="px-3">
          {getStatusIcon()}
        </div>

        {/* 提交按钮 */}
        <AnimatePresence>
          {(value.trim() && validationState === 'valid') && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              onClick={() => onSubmit()}
              disabled={isLoading}
              className="mr-2 flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span className="hidden sm:inline">Analyze</span>
                  <ArrowRight size={14} className="sm:hidden" />
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 验证提示 */}
      <AnimatePresence>
        {validationState === 'invalid' && value.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700">Invalid YouTube URL</p>
                <p className="text-xs text-red-600 mt-1">
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-50 border border-slate-200 rounded-lg"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">Quick tips:</p>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Play size={12} className="text-slate-400" />
                  <span>Supports individual videos, playlists, and channels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-slate-400" />
                  <span>Analysis typically takes 30-60 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-slate-400" />
                  <span>Press Enter or paste URL to start automatically</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}