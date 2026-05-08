"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MarkdownContent } from "@/components/ui/MarkdownContent";

// P1: 流式显示优化组件
export function StreamingText({
  content,
  isLoading,
}: {
  content: string;
  isLoading: boolean;
}) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!content) {
      setDisplayedContent("");
      setWordCount(0);
      setIsComplete(false);
      return;
    }

    // 如果内容没有变化，直接显示
    if (content === displayedContent) return;

    // 打字机效果
    let currentIndex = displayedContent.length;
    const targetLength = content.length;

    if (currentIndex >= targetLength) {
      setIsComplete(true);
      return;
    }

    const interval = setInterval(() => {
      if (currentIndex < targetLength) {
        // 每次显示1-3个字符，模拟真实的流式效果
        const charsToAdd = Math.min(
          Math.floor(Math.random() * 3) + 1,
          targetLength - currentIndex,
        );
        const newContent = content.slice(0, currentIndex + charsToAdd);
        setDisplayedContent(newContent);
        setWordCount(
          newContent.split(/\s+/).filter((word) => word.length > 0).length,
        );
        currentIndex += charsToAdd;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30); // 30ms 间隔，比较流畅

    return () => clearInterval(interval);
  }, [content, displayedContent]);

  return (
    <div className="relative">
      {/* 字数统计 - 生成中显示 */}
      {isLoading && displayedContent && (
        <div className="absolute -top-8 right-0 flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span>{wordCount} words</span>
        </div>
      )}

      {/* 内容 */}
      <div className="prose prose-slate max-w-none">
        <MarkdownContent content={displayedContent} />
      </div>

      {/* 打字机光标 */}
      {isLoading && !isComplete && (
        <span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-1 align-text-bottom"></span>
      )}

      {/* 完成动画 */}
      {isComplete && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Check size={16} />
          </motion.div>
          <span>Analysis complete &bull; {wordCount} words</span>
        </motion.div>
      )}
    </div>
  );
}
