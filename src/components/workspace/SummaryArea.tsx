"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Target,
  Lightbulb,
  BookOpen,
  Download,
  ChevronRight,
  MessageSquare,
  Zap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  FileText,
  FileDown,
} from "lucide-react";
import { useToast, ToastContainer } from "@/components/ui/Toast";

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  onRegenerate,
  mobileSubTab,
}: any) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'cards'>('summary');
  const { toasts, removeToast, success, error: showError, info: showInfo } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(data || "");
    setCopied(true);
    success("Analysis copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // 解析卡片数据
  const cards = useMemo(() => {
    if (!data) return [];

    // 查找 ---START_CARDS--- 标记
    const startMarker = '---START_CARDS---';
    const startIndex = data.indexOf(startMarker);

    if (startIndex === -1) {
      return parseSimpleQA(data);
    }

    // 提取卡片部分的内容
    const cardsSection = data.substring(startIndex + startMarker.length);
    const cards: any[] = [];

    // 按 --- 分割卡片
    const cardBlocks = cardsSection.split(/\n---\n/).filter((block: string) => block.trim());

    for (const block of cardBlocks) {
      const lines = block.split('\n').map((line: string) => line.trim()).filter((line: string) => line);

      let question = '';
      let answer = '';
      let timeStamp = '';
      let type = '';
      let category = '';

      for (const line of lines) {
        if (line.startsWith('Q: ')) {
          question = line.substring(3).trim();
        } else if (line.startsWith('A: ')) {
          answer = line.substring(3).trim();
        } else if (line.startsWith('T: ')) {
          timeStamp = line.substring(3).trim();
        } else if (line.startsWith('Type: ')) {
          type = line.substring(6).trim();
        } else if (line.startsWith('Category: ')) {
          category = line.substring(10).trim();
        }
      }

      if (question && answer) {
        cards.push({
          question,
          answer,
          time: timeStamp || null,
          type: type || 'general',
          category: category || 'general'
        });
      }
    }

    return cards;
  }, [data]);

  // 简单Q&A格式解析（备用）
  function parseSimpleQA(text: string) {
    const lines = text.split('\n');
    const cards: any[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // 检测问题行 (Q: 或 问: 开头)
      if (line.match(/^(Q|问)\s*[:：]/)) {
        const question = line.replace(/^(Q|问)\s*[:：]\s*/, '');

        // 查找对应的答案
        let answer = '';
        let timeStamp = '';

        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();

          // 如果遇到下一个问题，停止
          if (nextLine.match(/^(Q|问)\s*[:：]/)) {
            break;
          }

          // 如果是答案行
          if (nextLine.match(/^(A|答)\s*[:：]/)) {
            answer = nextLine.replace(/^(A|答)\s*[:：]\s*/, '');

            // 提取时间戳
            const timeMatch = answer.match(/\(Timestamp:\s*(\d{1,2}:\d{2}(?::\d{2})?)\)/);
            if (timeMatch) {
              timeStamp = timeMatch[1];
              answer = answer.replace(/\s*\(Timestamp:.*?\)/, '');
            }
            break;
          }
        }

        if (question && answer) {
          cards.push({
            question,
            answer,
            time: timeStamp || null,
            type: 'general',
            category: 'general'
          });
        }
      }
    }

    return cards;
  }
  // 智能解析AI返回的内容 - 只解析sections，不解析卡片
  const sections = useMemo(() => {
    if (!data) return [];

    console.log("Raw AI data:", data);

    // 尝试解析结构化内容
    const lines = data.split('\n').filter((line: string) => line.trim());
    const sections: any[] = [];

    let currentSection: any = null;
    let currentContent: string[] = [];

    for (const line of lines) {
      // 检测标题（## 或 # 开头）
      if (line.match(/^#{1,3}\s+/)) {
        // 保存上一个section
        if (currentSection && currentContent.length > 0) {
          const filteredContent = currentContent.join('\n').trim();
          if (filteredContent) {
            currentSection.content = filteredContent;
            sections.push(currentSection);
          }
        }

        // 开始新section
        const title = line.replace(/^#{1,3}\s+/, '').trim();
        const level = (line.match(/^#+/) || [''])[0].length;

        // 跳过不需要的section
        if (title.toLowerCase().includes('deprecated') ||
          title.toLowerCase().includes('unused')) {
          currentSection = null;
          currentContent = [];
          continue;
        }

        currentSection = {
          id: title.toLowerCase().replace(/\s+/g, '-'),
          title,
          level,
          content: '',
          type: getContentType(title)
        };
        currentContent = [];
      }
      // 普通内容行
      else if (line.trim() && currentSection) {
        // 过滤掉问答格式的内容行和卡片标记
        if (!line.match(/^(Q|问|A|答|T|时间|Timestamp|Type|Category)\s*[:：]/) &&
          !line.match(/^\s*(Q|问)\s*[:：].*?\s*(A|答)\s*[:：]/) &&
          !line.trim().startsWith('---START_CARDS---') &&
          !line.trim().startsWith('---END_CARDS---') &&
          !line.trim().startsWith('---') &&
          !line.match(/^Type:\s*(concept|definition|insight|action)/) &&
          !line.match(/^Category:\s*(technical|business|design|general)/)) {
          currentContent.push(line);
        }
      }
    }

    // 保存最后一个section
    if (currentSection && currentContent.length > 0) {
      const filteredContent = currentContent.join('\n').trim();
      if (filteredContent) {
        currentSection.content = filteredContent;
        sections.push(currentSection);
      }
    }

    // 如果没有检测到sections，创建一个默认的
    if (sections.length === 0 && data.trim()) {
      // 过滤掉问答格式的内容和卡片标记
      const filteredContent = data
        .split('\n')
        .filter((line: any) =>
          !line.match(/^(Q|问|A|答|T|时间|Timestamp|Type|Category)\s*[:：]/) &&
          !line.match(/^\s*(Q|问)\s*[:：].*?\s*(A|答)\s*[:：]/) &&
          !line.trim().startsWith('---START_CARDS---') &&
          !line.trim().startsWith('---END_CARDS---') &&
          !line.trim().startsWith('---') &&
          !line.match(/^Type:\s*(concept|definition|insight|action)/) &&
          !line.match(/^Category:\s*(technical|business|design|general)/) &&
          line.trim() !== ''
        )
        .join('\n')
        .trim();

      if (filteredContent) {
        sections.push({
          id: 'summary',
          title: 'AI Analysis',
          level: 1,
          content: filteredContent,
          type: 'summary'
        });
      }
    }

    console.log("Parsed sections:", sections);

    return sections;
  }, [data]);

  function getContentType(title: string) {
    const lower = title.toLowerCase();
    if (lower.includes('summary') || lower.includes('总结')) return 'summary';
    if (lower.includes('key') || lower.includes('重点') || lower.includes('要点')) return 'keypoints';
    if (lower.includes('insight') || lower.includes('洞察')) return 'insights';
    if (lower.includes('takeaway') || lower.includes('收获')) return 'takeaways';
    return 'content';
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex h-16 px-6 border-b border-slate-200 bg-white items-center justify-between shrink-0 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookOpen size={20} className="text-slate-700" />
              {isLoading && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                {isLoading ? 'Analyzing...' : 'Analysis'}
              </h2>
              <p className="text-xs text-slate-500">
                {isLoading ? 'AI is processing content' :
                  viewMode === 'summary' ? `${sections.length} sections` : `${cards.length} study cards`}
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          {data && (
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('summary')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'summary'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  }`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  }`}
              >
                Study Cards ({cards.length})
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Loading indicator in header */}
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm font-medium">Processing</span>
            </div>
          )}

          {data && !isLoading && (
            <ReAnalyzeButton onRegenerate={onRegenerate} toast={{ success, error: showError, info: showInfo }} />
          )}

          {data && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
              >
                {copied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>

              <ExportDropdown data={data} toast={{ success, error: showError, info: showInfo }} />
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!data && !isLoading ? (
          <EmptyState onStartAnalysis={onStartAnalysis} />
        ) : isLoading ? (
          <LoadingState />
        ) : viewMode === 'summary' ? (
          <OverviewContent
            sections={sections}
            isLoading={isLoading}
            onSeek={onSeek}
            toast={{ success, error: showError, info: showInfo }}
          />
        ) : (
          <CardsView
            cards={cards}
            isLoading={isLoading}
            onSeek={onSeek}
          />
        )}
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// 加载状态组件 - 显示AI正在工作
function LoadingState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <BookOpen size={28} className="text-blue-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Status */}
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          AI is Analyzing...
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Processing video content and generating study materials. This may take 30-60 seconds.
        </p>

        {/* Progress Animation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>

        {/* What's happening */}
        <div className="text-left space-y-3 bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-slate-700">Extracting key concepts</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-700">Generating study cards</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <p className="text-sm text-slate-500">Creating summary</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Content will appear as it's generated
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// 空状态组件 - NotebookLM风格，添加手动开始按钮
function EmptyState({ onStartAnalysis }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        {/* Simple Icon - NotebookLM style */}
        <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen size={28} className="text-slate-600" />
        </div>

        {/* Content */}
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Ready for Analysis
        </h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Generate AI-powered study materials and insights from this video content.
        </p>

        {/* Start Analysis Button */}
        <button
          onClick={onStartAnalysis}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl mb-6"
        >
          <Sparkles size={20} />
          Start AI Analysis
        </button>

        {/* What to expect */}
        <div className="text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Key Insights</p>
              <p className="text-xs text-slate-500">Important concepts and takeaways</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Study Cards</p>
              <p className="text-xs text-slate-500">Interactive learning materials</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Structured Summary</p>
              <p className="text-xs text-slate-500">Organized content breakdown</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Analysis typically takes 30-60 seconds
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// 概览内容组件 - 支持流式显示
function OverviewContent({ sections, isLoading, onSeek, toast }: any) {
  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 如果有sections就显示，即使还在加载 */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-slate-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-900 mb-2">
                  {sections[0]?.title?.replace(/^#+ /, '') || 'Video Analysis'}
                </h1>
                <p className="text-slate-600 text-sm">
                  {isLoading ? 'Analysis in progress...' : 'Analysis complete'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    Generating...
                  </div>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    ✓ Complete
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 内容区块 */}
        <div className="grid gap-4">
          {sections.map((section: any, index: number) => (
            <SectionCard
              key={section.id || index}
              section={section}
              index={index}
              onSeek={onSeek}
              toast={toast}
            />
          ))}
        </div>

        {/* 加载指示器 - 只在有内容且还在加载时显示 */}
        {isLoading && sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 text-blue-600">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              </div>
              <span className="font-medium">Generating more content...</span>
            </div>
          </motion.div>
        )}

        {/* 如果没有sections且在加载，显示骨架屏 */}
        {isLoading && sections.length === 0 && <LoadingSkeleton />}
      </div>
    </div>
  );
}

// 加载骨架屏
function LoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-12 space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-1/3 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 内容区块组件 - 重新设计为更美观的卡片
function SectionCard({ section, index, onSeek, toast }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'summary': return Sparkles;
      case 'keypoints': return Target;
      case 'insights': return Lightbulb;
      case 'takeaways': return BookOpen;
      default: return BookOpen;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'summary': return 'blue';
      case 'keypoints': return 'green';
      case 'insights': return 'purple';
      case 'takeaways': return 'orange';
      default: return 'slate';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(section.content);
    setCopied(true);
    if (toast) toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const IconComponent = getIcon(section.type);
  const color = getColor(section.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {/* 卡片头部 */}
      <div
        className="flex items-center justify-between p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            ${color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
            ${color === 'green' ? 'bg-green-100 text-green-600' : ''}
            ${color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
            ${color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
            ${color === 'slate' ? 'bg-slate-100 text-slate-600' : ''}
          `}>
            <IconComponent size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              {section.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {section.content.length > 100 ? `${section.content.substring(0, 100)}...` : section.content.substring(0, 50)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              if (!isBookmarked && toast) toast.success("Saved to bookmarks");
            }}
            className={`p-2.5 rounded-lg transition-all ${isBookmarked
              ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            title="Save insight"
          >
            <BookOpen size={18} />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronRight
              size={18}
              className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* 卡片内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2">
              <div className="prose prose-slate max-w-none prose-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.content}
                </ReactMarkdown>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                >
                  {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={() => toast?.info("AI feature coming soon!")}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <MessageSquare size={12} />
                  Ask AI
                </button>

                <button
                  onClick={() => toast?.info("Flashcard creation coming soon!")}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <Zap size={12} />
                  Create Card
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
// 卡片视图组件 - NotebookLM风格重设计
function CardsView({ cards, isLoading, onSeek }: any) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'browse' | 'study'>('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { success, error: showError, info: showInfo } = useToast();

  if (isLoading && cards.length === 0) {
    return <LoadingSkeleton />;
  }

  if (cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
          <Target size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          Ready to Create Study Cards
        </h3>
        <p className="text-slate-600 text-sm max-w-md leading-relaxed">
          Study cards will appear here when the AI analysis includes interactive learning content.
          These cards are designed to help you truly understand and retain key concepts.
        </p>
      </div>
    );
  }

  // 按类型分组卡片
  const cardsByType = cards.reduce((acc: any, card: any) => {
    const type = card.type || 'general';
    if (!acc[type]) acc[type] = [];
    acc[type].push(card);
    return acc;
  }, {});

  const filteredCards = selectedType === 'all' ? cards : cardsByType[selectedType] || [];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-slate-200 p-6 space-y-4">
        {/* Title and Stats */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Study Cards</h2>
            <p className="text-sm text-slate-600 mt-1">
              Interactive learning materials designed for deep understanding
            </p>
          </div>

          {/* Study Mode Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setStudyMode('browse')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${studyMode === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              Browse All
            </button>
            <button
              onClick={() => setStudyMode('study')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${studyMode === 'study'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              Study Mode
            </button>
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedType === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            All Cards ({cards.length})
          </button>

          {Object.entries(cardsByType).map(([type, typeCards]: [string, any]) => {
            const typeInfo = getTypeInfo(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedType === type
                  ? `${typeInfo.bgActive} ${typeInfo.textActive}`
                  : `${typeInfo.bg} ${typeInfo.text} hover:${typeInfo.bgHover}`
                  }`}
              >
                <span>{typeInfo.icon}</span>
                {typeInfo.label} ({typeCards.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {studyMode === 'browse' ? (
          <BrowseCards cards={filteredCards} onSeek={onSeek} toast={{ success, error: showError, info: showInfo }} />
        ) : (
          <StudyCards
            cards={filteredCards}
            currentIndex={currentCardIndex}
            setCurrentIndex={setCurrentCardIndex}
            onSeek={onSeek}
          />
        )}
      </div>
    </div>
  );
}

// 浏览模式 - 显示所有卡片
function BrowseCards({ cards, onSeek, toast }: any) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        {cards.map((card: any, index: number) => (
          <EnhancedCardItem
            key={index}
            card={card}
            index={index}
            onSeek={onSeek}
            toast={toast}
          />
        ))}
      </div>
    </div>
  );
}

// 学习模式 - 专注单卡片学习
function StudyCards({ cards, currentIndex, setCurrentIndex, onSeek }: any) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setConfidence(null);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setConfidence(null);
    }
  };

  if (!currentCard) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="w-full max-w-3xl">
        {/* Progress */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-lg font-semibold text-slate-700">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <div className="flex items-center gap-1">
              {getTypeInfo(currentCard.type).icon}
              <span className="text-sm font-medium text-slate-600">
                {getTypeInfo(currentCard.type).label}
              </span>
            </div>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <StudyCardItem
          card={currentCard}
          showAnswer={showAnswer}
          onToggleAnswer={() => setShowAnswer(!showAnswer)}
          confidence={confidence}
          onSetConfidence={setConfidence}
          onSeek={onSeek}
        />

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <div className="flex items-center gap-3">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Reveal Answer
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">How confident are you?</span>
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setConfidence(level);
                      setTimeout(nextCard, 500);
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${confidence === level
                      ? 'bg-green-500 text-white'
                      : level <= 2
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : level === 3
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// 获取类型信息的辅助函数 - NotebookLM简洁风格
function getTypeInfo(type: string) {
  switch (type) {
    case 'concept':
      return {
        icon: '●',
        label: 'Concept',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        bgHover: 'bg-blue-100',
        bgActive: 'bg-blue-600',
        textActive: 'text-white'
      };
    case 'definition':
      return {
        icon: '◆',
        label: 'Definition',
        bg: 'bg-green-50',
        text: 'text-green-700',
        bgHover: 'bg-green-100',
        bgActive: 'bg-green-600',
        textActive: 'text-white'
      };
    case 'insight':
      return {
        icon: '◐',
        label: 'Insight',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        bgHover: 'bg-purple-100',
        bgActive: 'bg-purple-600',
        textActive: 'text-white'
      };
    case 'action':
      return {
        icon: '▶',
        label: 'Action',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        bgHover: 'bg-orange-100',
        bgActive: 'bg-orange-600',
        textActive: 'text-white'
      };
    default:
      return {
        icon: '○',
        label: 'General',
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        bgHover: 'bg-slate-100',
        bgActive: 'bg-slate-600',
        textActive: 'text-white'
      };
  }
}

// 增强版卡片组件 - NotebookLM风格
function EnhancedCardItem({ card, index, onSeek, toast }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const typeInfo = getTypeInfo(card.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${typeInfo.bg}`}>
              {typeInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeInfo.bg} ${typeInfo.text}`}>
                  {typeInfo.label}
                </span>
                {card.category && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                    {card.category}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 text-lg leading-tight">
                Study Card {index + 1}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {card.time && (
              <button
                onClick={() => onSeek(card.time)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg text-sm font-medium transition-all"
              >
                <Sparkles size={14} />
                {card.time}
              </button>
            )}

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-all ${isBookmarked
                ? 'text-yellow-600 bg-yellow-50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
            >
              <BookOpen size={16} />
            </button>
          </div>
        </div>

        {/* Question Preview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Question</span>
          </div>
          <p className="text-slate-800 font-medium leading-relaxed">
            {card.question}
          </p>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-all"
        >
          <ChevronRight
            size={16}
            className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
          {isExpanded ? 'Hide Answer' : 'Show Answer & Details'}
        </button>
      </div>

      {/* Expandable Answer Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-6 pt-4 bg-slate-50/50">
              {/* Answer */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Answer</span>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">
                    {card.answer}
                  </p>
                </div>
              </div>

              {/* Learning Insights */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Target size={16} />
                    Learning Focus
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {getCardInsight(card.type, 'focus')}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Lightbulb size={16} />
                    Why This Matters
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {getCardInsight(card.type, 'importance')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const cardText = `Q: ${card.question}\n\nA: ${card.answer}`;
                    navigator.clipboard.writeText(cardText);
                    toast.success("Card copied to clipboard");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                >
                  <Copy size={14} />
                  Copy Card
                </button>

                <button
                  onClick={() => {
                    // 这里可以实现AI对话功能
                    alert('Ask Follow-up feature coming soon!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
                >
                  <MessageSquare size={14} />
                  Ask Follow-up
                </button>

                <button
                  onClick={() => {
                    // 这里可以生成更多相关练习
                    alert('Practice More feature coming soon!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-lg text-sm font-medium transition-all"
                >
                  <Zap size={14} />
                  Practice More
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 学习模式专用卡片组件 - NotebookLM简洁风格
function StudyCardItem({ card, showAnswer, onToggleAnswer, confidence, onSetConfidence, onSeek }: any) {
  const typeInfo = getTypeInfo(card.type);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="p-8">
        {/* Card Type Header */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${typeInfo.bg} border border-slate-200`}>
            <span className={`text-lg font-bold ${typeInfo.text}`}>{typeInfo.icon}</span>
            <span className={`font-medium ${typeInfo.text}`}>{typeInfo.label}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showAnswer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center min-h-[200px] flex flex-col justify-center"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-slate-600" />
                </div>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full mb-4">
                  Think about this
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-slate-900 mb-6 leading-relaxed max-w-2xl mx-auto">
                {card.question}
              </h2>

              {card.time && (
                <button
                  onClick={() => onSeek(card.time)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all mx-auto"
                >
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  {card.time}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-[200px]"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-green-600" />
                </div>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                  Answer
                </span>
              </div>

              <div className="prose prose-lg prose-slate max-w-none text-center">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {card.answer}
                </p>
              </div>

              {/* Learning Enhancement */}
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  Key Learning Point
                </h4>
                <p className="text-slate-700 text-center text-sm">
                  {getCardInsight(card.type, 'learning')}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 获取卡片学习洞察的辅助函数
function getCardInsight(type: string, aspect: 'focus' | 'importance' | 'learning') {
  const insights = {
    concept: {
      focus: 'Understanding the fundamental idea and how it connects to other concepts',
      importance: 'Concepts form the building blocks of deeper knowledge and critical thinking',
      learning: 'This concept helps you build a mental framework for understanding related topics'
    },
    definition: {
      focus: 'Memorizing the precise meaning and being able to explain it clearly',
      importance: 'Definitions provide the vocabulary needed for advanced discussions',
      learning: 'Understanding this definition will help you communicate more precisely about this topic'
    },
    insight: {
      focus: 'Grasping the deeper implications and real-world applications',
      importance: 'Insights reveal the "why" behind information and drive innovation',
      learning: 'This insight can change how you approach similar situations in the future'
    },
    action: {
      focus: 'Learning the specific steps and when to apply them',
      importance: 'Actionable knowledge transforms understanding into practical results',
      learning: 'Practice this action to build competence and confidence in real scenarios'
    }
  };

  return insights[type as keyof typeof insights]?.[aspect] || 'This card helps deepen your understanding of the topic';
}

// 导出下拉组件
function ExportDropdown({ data, toast }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const exportAsText = () => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-analysis.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Exported as TXT file");
    setIsOpen(false);
  };

  const exportAsMarkdown = () => {
    const blob = new Blob([data], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-analysis.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Exported as Markdown file");
    setIsOpen(false);
  };

  const exportAsPDF = async () => {
    try {
      // 使用浏览器的打印功能生成PDF
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>AI Analysis Report</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              color: #333;
            }
            h1, h2, h3 { color: #2563eb; margin-top: 2em; }
            h1 { border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5em; }
            pre { background: #f8fafc; padding: 1em; border-radius: 8px; overflow-x: auto; }
            blockquote { border-left: 4px solid #3b82f6; margin: 1em 0; padding-left: 1em; }
            .card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1em; margin: 1em 0; }
            .question { font-weight: bold; color: #1e40af; }
            .answer { margin-top: 0.5em; }
          </style>
        </head>
        <body>
          <h1>AI Analysis Report</h1>
          <div>${formatDataForPDF(data)}</div>
          <footer style="margin-top: 3em; padding-top: 1em; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
            Generated by YTvidHub • ${new Date().toLocaleDateString()}
          </footer>
        </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);

      toast.success("PDF export initiated");
      setIsOpen(false);
    } catch (error) {
      toast.error("PDF export failed");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
      >
        <Download size={16} />
        Export
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-2">
            <button
              onClick={exportAsText}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-all"
            >
              <FileText size={16} />
              <div className="text-left">
                <div className="font-medium">Text File</div>
                <div className="text-xs text-slate-500">.txt format</div>
              </div>
            </button>

            <button
              onClick={exportAsMarkdown}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-all"
            >
              <FileDown size={16} />
              <div className="text-left">
                <div className="font-medium">Markdown</div>
                <div className="text-xs text-slate-500">.md format</div>
              </div>
            </button>

            <button
              onClick={exportAsPDF}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-all"
            >
              <FileText size={16} />
              <div className="text-left">
                <div className="font-medium">PDF Document</div>
                <div className="text-xs text-slate-500">Print to PDF</div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// 格式化数据用于PDF导出
function formatDataForPDF(data: string): string {
  if (!data) return '';

  // 转换Markdown格式为HTML
  let html = data
    // 标题
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 换行
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // 处理卡片格式
  if (data.includes('---START_CARDS---')) {
    const parts = data.split('---START_CARDS---');
    const summary = parts[0];
    const cardsSection = parts[1] || '';

    let cardsHtml = '';
    const cardBlocks = cardsSection.split(/\n---\n/).filter(block => block.trim());

    cardBlocks.forEach((block: string, index: number) => {
      const lines = block.split('\n').filter(line => line.trim());
      let question = '', answer = '', time = '';

      lines.forEach((line: string) => {
        if (line.startsWith('Q: ')) question = line.substring(3);
        if (line.startsWith('A: ')) answer = line.substring(3);
        if (line.startsWith('T: ')) time = line.substring(3);
      });

      if (question && answer) {
        cardsHtml += `
          <div class="card">
            <div class="question">Q${index + 1}: ${question}</div>
            <div class="answer">${answer}</div>
            ${time ? `<div style="font-size: 0.9em; color: #6b7280; margin-top: 0.5em;">⏱️ ${time}</div>` : ''}
          </div>
        `;
      }
    });

    html = `<div>${summary}</div><h2>Study Cards</h2>${cardsHtml}`;
  }

  return `<p>${html}</p>`;
}

// 重新分析按钮组件
function ReAnalyzeButton({ onRegenerate, toast }: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegenerate = () => {
    setShowConfirm(false);
    toast.info("Starting new analysis...");
    onRegenerate();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
      >
        <Sparkles size={16} />
        Re-analyze
      </button>

      {showConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-50"
            onClick={() => setShowConfirm(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Generate New Analysis?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This will create a fresh AI analysis of the video content. This action will consume credits.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerate}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}