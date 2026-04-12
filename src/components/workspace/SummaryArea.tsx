"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { subtitleApi } from "@/lib/api";
import {
  Sparkles,
  Copy,
  Check,
  BookOpen,
  Download,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  FileText,
  FileDown,
  Clock,
  Loader2,
  MoreHorizontal,
  Zap,
  X
} from "lucide-react";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { InsufficientCreditsModal } from './InsufficientCreditsModal';
import { extractVideoId } from "@/lib/youtube";

// 学习卡片缓存
const cardsCache = new Map<string, StudyCard[]>();

interface StudyCard {
  question: string;
  answer: string;
  type: 'concept' | 'definition' | 'insight' | 'action' | string;
  category?: string;
  time?: string;
}

interface SummaryAreaProps {
  data: string;
  isLoading: boolean;
  onSeek: (time: string) => void;
  onStartAnalysis: () => void;
  onRegenerate: () => void;
  mobileSubTab?: string;
  videoUrl?: string;
}

interface CardsViewProps {
  cards: StudyCard[];
  isLoading: boolean;
  isCardsLoading: boolean;
  cardsStatus: string;
  onSeek: (time: string) => void;
  videoUrl?: string;
  onGenerateCards: () => void;
}

interface BrowseCardsProps {
  cards: StudyCard[];
  onSeek: (time: string) => void;
  toast: { success: (msg: string) => void; error: (msg: string) => void; info: (msg: string) => void };
  masteredCards: Set<number>;
  onToggleMastered: (index: number) => void;
}

interface StudyCardsProps {
  cards: StudyCard[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onSeek: (time: string) => void;
  masteredCards: Set<number>;
  onToggleMastered: (index: number) => void;
}

interface StudyCardItemProps {
  card: StudyCard;
  isFlipped: boolean;
  onFlip: () => void;
  onMastered: () => void;
  onStillLearning: () => void;
  isMastered: boolean;
}

interface EnhancedCardItemProps {
  card: StudyCard;
  index: number;
  onSeek: (time: string) => void;
  toast: { success: (msg: string) => void; error: (msg: string) => void; info: (msg: string) => void };
  isMastered: boolean;
  onToggleMastered: () => void;
}

// Parse complete card blocks from streamed text
function extractCards(text: string, isFinal = false): { cards: StudyCard[]; remaining: string } {
  const cards: StudyCard[] = [];
  const blockRegex = /---\n([\s\S]*?)\n---/g;
  let match;
  let lastIndex = 0;

  while ((match = blockRegex.exec(text)) !== null) {
    const card = parseCardBlock(match[1]);
    if (card) cards.push(card);
    lastIndex = match.index + match[0].length;
  }

  return { cards, remaining: lastIndex > 0 ? text.substring(lastIndex) : text };
}

function parseCardBlock(block: string): StudyCard | null {
  const card: Partial<StudyCard> = {};
  for (const line of block.split('\n')) {
    if (line.startsWith('Q: ')) card.question = line.substring(3).trim();
    else if (line.startsWith('A: ')) card.answer = line.substring(3).trim();
    else if (line.startsWith('Type: ')) card.type = line.substring(6).trim();
    else if (line.startsWith('Category: ')) card.category = line.substring(10).trim();
    else if (line.startsWith('T: ') && line.substring(3).trim() !== 'null') card.time = line.substring(3).trim();
  }
  if (!card.question || !card.answer) return null;
  return card as StudyCard;
}

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  onRegenerate,
  mobileSubTab: _mobileSubTab,
  videoUrl,
}: SummaryAreaProps) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'cards'>('summary');
  const [cardsData, setCardsData] = useState<StudyCard[]>([]);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [cardsStatus, setCardsStatus] = useState('');
  const { toasts, removeToast, success, error: showError, info: showInfo } = useToast();

  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ required: 1, current: 0, feature: "this feature" });

  // 视频切换时检查缓存和数据库历史
  useEffect(() => {
    if (!videoUrl) return;

    // 1. 先查内存缓存
    const cached = cardsCache.get(videoUrl);
    if (cached && cached.length > 0) {
      setCardsData(cached);
      return;
    }

    // 2. 再查数据库历史
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      subtitleApi.getHistoryContent(videoId).then(content => {
        if (content.studyCards) {
          try {
            const parsed = JSON.parse(content.studyCards);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCardsData(parsed);
              cardsCache.set(videoUrl, parsed);
            }
          } catch (e) {
            console.error("Failed to parse study cards from history:", e);
          }
        }
      }).catch(() => { });
    }
  }, [videoUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data || "");
    setCopied(true);
    success("Analysis copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCards = async () => {
    if (!videoUrl || isCardsLoading) return;

    // 再次确认缓存
    const cached = cardsCache.get(videoUrl);
    if (cached && cached.length > 0) {
      setCardsData(cached);
      setViewMode('cards');
      return;
    }

    setIsCardsLoading(true);
    setCardsData([]);
    setCardsStatus('');

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) {
        showError('Authentication Required', 'Authentication is required to perform this action.');
        return;
      }

      const res = await fetch('/api/study-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ url: videoUrl, transcript: data }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        if (res.status === 402) {
          const currentCredits = typeof window !== 'undefined' ? parseInt(localStorage.getItem('user_credits') || "0") : 0;
          setModalConfig({
            required: 1,
            current: currentCredits,
            feature: "Study Cards"
          });
          setIsCreditsModalOpen(true);
        } else {
          showError('Generation Failed', json.error || 'An error occurred. Please try again later.');
        }
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No response body');

      let buffer = '';
      let allParsedCards: StudyCard[] = [];
      setViewMode('cards');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes('__STATUS__:')) {
          const parts = chunk.split('__STATUS__:');
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue;
            if (i > 0) {
              const lineEnd = part.indexOf('\n');
              if (lineEnd !== -1) {
                setCardsStatus(part.substring(0, lineEnd).trim());
                buffer += part.substring(lineEnd + 1);
              }
            } else {
              buffer += part;
            }
          }
        } else if (chunk.includes('__ERROR__:')) {
          showError(chunk.split('__ERROR__:')[1] || 'Failed to generate study cards');
          return;
        } else {
          buffer += chunk;
        }

        const result = extractCards(buffer);
        if (result.cards.length > 0) {
          allParsedCards = [...allParsedCards, ...result.cards];
          setCardsData([...allParsedCards]);
          buffer = result.remaining;
        }
      }

      const final = extractCards(buffer, true);
      if (final.cards.length > 0) {
        allParsedCards = [...allParsedCards, ...final.cards];
        setCardsData(allParsedCards);
      }

      if (allParsedCards.length > 0) {
        cardsCache.set(videoUrl, allParsedCards);

        // 【关键】保存到历史记录
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
          // 尝试获取视频标题（从 DOM 或状态中获取并不总是可靠，这里简单处理，后台会有标题保护）
          const title = document.title.split(' - ')[0] || "Unknown Video";

          subtitleApi.upsertHistory({
            videoId,
            videoUrl,
            title,
            lastAction: "ai_summary", // 复用 ai_summary 动作，或可以用一个新的动作类型
            studyCards: JSON.stringify(allParsedCards)
          }).catch(() => { });
        }
      }

      setCardsStatus('');
    } catch (err: any) {
      showError('Generation Failed', 'An error occurred. Please try again later.');
    } finally {
      setIsCardsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="flex h-[52px] border-b border-slate-100 bg-white items-center justify-between shrink-0 sticky top-0 z-30 px-2 lg:px-4">
        <div className="flex items-center h-full">
          <button
            onClick={() => setViewMode('summary')}
            className={`
              relative flex items-center h-full px-4 lg:px-6 text-[13px] lg:text-sm font-semibold transition-all duration-300
              ${viewMode === 'summary' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}
            `}
          >
            {viewMode === 'summary' && (
              <motion.div
                layoutId="summaryActiveTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-1px_10px_rgba(37,99,235,0.3)]"
              />
            )}
            <FileText size={16} className={`mr-2.5 transition-transform duration-300 ${viewMode === 'summary' ? 'scale-110 text-blue-600' : 'text-slate-400'}`} />
            Summary
          </button>

          {/* Study (Cards) Tab */}
          <button
            onClick={() => setViewMode('cards')}
            disabled={!videoUrl}
            className={`
              relative flex items-center h-full px-4 lg:px-6 text-[13px] lg:text-sm font-semibold transition-all duration-300
              ${!videoUrl
                ? 'text-slate-200 cursor-not-allowed opacity-50'
                : viewMode === 'cards'
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }
            `}
          >
            {viewMode === 'cards' && (
              <motion.div
                layoutId="summaryActiveTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-1px_10px_rgba(37,99,235,0.3)]"
              />
            )}
            <BookOpen size={16} className={`mr-2.5 transition-transform duration-300 ${viewMode === 'cards' ? 'scale-110 text-blue-600' : 'text-slate-400'}`} />
            Study
            {cardsData.length > 0 && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                {cardsData.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">

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

      {/* Content Area - Keep mounted to avoid remount/reload on tab switch */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            viewMode === 'summary' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {!data && !isLoading ? (
            <EmptyState onStartAnalysis={onStartAnalysis} />
          ) : (isLoading && !data) ? (
            <LoadingState title="Generating Summary" subtitle="Synthesizing video content" />
          ) : (
            <SummaryContent
              data={data}
              isLoading={isLoading}
              onGenerateCards={generateCards}
              isCardsLoading={isCardsLoading}
              hasCards={cardsData.length > 0}
              onViewCards={() => setViewMode('cards')}
            />
          )}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            viewMode === 'cards' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <CardsView
            cards={cardsData}
            isLoading={isLoading}
            isCardsLoading={isCardsLoading}
            cardsStatus={cardsStatus}
            onSeek={onSeek}
            videoUrl={videoUrl}
            onGenerateCards={generateCards}
          />
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <InsufficientCreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        requiredAmount={modalConfig.required}
        featureName={modalConfig.feature}
      />
    </div>
  );
}

// 加载状态组件 - 具体化、工程化风格 (Deterministic & Practical)
function LoadingState({ title = "Processing", subtitle = "Extracting and structuring" }: { title?: string, subtitle?: string }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white">
      <div className="w-full max-w-[340px] flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200">
              <Loader2 size={18} className="text-blue-600 animate-spin" />
            </div>
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2>
              <p className="text-[11px] text-slate-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 shadow-sm">
              <Clock size={12} className="text-slate-400" />
              <span className="text-[11px] font-medium font-mono tabular-nums">
                {elapsed}s / ~45s
              </span>
            </div>
          </div>
        </div>

        {/* Progress tracks (Fake steps to make it feel deterministic) */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <Check size={14} className="text-green-500" /> Initializing Task
              </span>
              <span className="text-slate-400">Done</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-900 flex items-center gap-2">
                <Loader2 size={14} className="text-blue-600 animate-spin" /> Heavy Processing
              </span>
              <span className="text-blue-600 font-medium">{Math.min(99, Math.floor((elapsed / 45) * 100))}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: "5%" }}
                animate={{ width: "95%" }}
                transition={{ duration: 45, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 opacity-40">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <div className="w-3.5 h-3.5 border border-slate-300 rounded-full" /> Finalizing Result
              </span>
              <span className="text-slate-400">Waiting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 空状态组件 - 实用工具风格 (Practical Tool Style)
function EmptyState({ onStartAnalysis }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white relative overflow-hidden text-center">
      <div className="w-full max-w-[420px] flex flex-col items-center relative z-10">

        {/* 实用图标容器 */}
        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
          <FileText size={22} className="text-slate-600" />
        </div>

        {/* 标题与描述 */}
        <h2 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">
          Study Notes Ready to Generate
        </h2>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-8 max-w-[320px]">
          Convert this video into structured notes and interactive flashcards to accelerate your learning.
        </p>

        {/* CTA 按钮: 更明确的动作与时间 */}
        <button
          onClick={onStartAnalysis}
          className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 outline-none rounded-lg text-white text-[13px] font-semibold transition-all shadow-sm w-full max-w-[260px]"
        >
          <FileText size={16} className="opacity-90" />
          <span>Generate Notes</span>
        </button>

        <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
          <Clock size={12} className="text-slate-400" />
          Estimated processing time: ~45 seconds
        </p>
      </div>
    </div>
  );
}

// P1: 流式显示优化组件
function StreamingText({ content, isLoading }: { content: string; isLoading: boolean }) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!content) {
      setDisplayedContent('');
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
        const charsToAdd = Math.min(Math.floor(Math.random() * 3) + 1, targetLength - currentIndex);
        const newContent = content.slice(0, currentIndex + charsToAdd);
        setDisplayedContent(newContent);
        setWordCount(newContent.split(/\s+/).filter(word => word.length > 0).length);
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
          <span>Analysis complete • {wordCount} words</span>
        </motion.div>
      )}
    </div>
  );
}

// 摘要内容组件 - P1 优化：使用流式显示
function SummaryContent({ data, isLoading, onGenerateCards, isCardsLoading, hasCards, onViewCards }: any) {
  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {/* P1: 使用流式显示组件 */}
          <StreamingText content={data || ''} isLoading={isLoading} />

          {/* Generate Study Cards 按钮 - 仅在摘要完成后显示 */}
          {!isLoading && data && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              {hasCards ? (
                <button
                  onClick={onViewCards}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                  <BookOpen size={16} />
                  View Study Cards
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={onGenerateCards}
                    disabled={isCardsLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    {isCardsLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Cards...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Generate Study Cards
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400">Uses 1 credit</p>
                </div>
              )}
            </div>
          )}
        </div>
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

// 卡片视图组件 - NotebookLM风格重设计
function CardsView({ cards, isLoading, isCardsLoading, cardsStatus, onSeek, videoUrl, onGenerateCards }: any) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'browse' | 'study'>('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { success, error: showError, info: showInfo } = useToast();

  const [masteredCards, setMasteredCards] = useState<Set<number>>(() => {
    if (typeof window === 'undefined' || !videoUrl) return new Set();
    try {
      const saved = localStorage.getItem(`study-progress-${videoUrl}`);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleMastered = (index: number) => {
    setMasteredCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      if (videoUrl) {
        try {
          localStorage.setItem(`study-progress-${videoUrl}`, JSON.stringify([...next]));
        } catch { }
      }
      return next;
    });
  };

  if (isCardsLoading && cards.length === 0) {
    return <LoadingState title="Generating Study Cards" subtitle={cardsStatus || "Creating contextual flashcards"} />;
  }

  if (cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden">
        <div className="w-full max-w-[420px] flex flex-col items-center relative z-10">

          {/* 实用图标容器 - 与 Summary 保持一致 */}
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 shadow-sm">
            <BookOpen size={22} className="text-slate-600" />
          </div>

          {/* 标题与描述 */}
          <h2 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">
            Study Cards Ready to Generate
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-8 max-w-[320px]">
            Generate AI flashcards to test your knowledge and retain key concepts from this video.
          </p>

          {/* CTA 按钮 - 与 Summary 保持一致的蓝色 */}
          <button
            onClick={onGenerateCards}
            disabled={isCardsLoading}
            className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 outline-none rounded-lg text-white text-[13px] font-semibold transition-all shadow-sm w-full max-w-[260px]"
          >
            {isCardsLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} className="opacity-90" />
            )}
            <span>{isCardsLoading ? "Generating Cards..." : "Generate Study Cards"}</span>
          </button>

          <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
            <Clock size={12} className="text-slate-400" />
            Estimated processing time: ~45 seconds (1 Credit)
          </p>
        </div>
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
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Study Cards</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isCardsLoading ? (
                <span className="text-violet-600 font-medium animate-pulse">
                  {cardsStatus || `${cards.length} cards generated...`}
                </span>
              ) : (
                <><span className="text-green-600 font-semibold">{masteredCards.size}</span> mastered · {cards.length - masteredCards.size} remaining</>
              )}
            </p>
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setStudyMode('browse')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${studyMode === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              Browse
            </button>
            <button
              onClick={() => { setStudyMode('study'); setCurrentCardIndex(0); }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${studyMode === 'study'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              Study
            </button>
          </div>
        </div>

        {/* Mastery progress bar */}
        <div className="flex gap-0.5">
          {cards.map((_: StudyCard, i: number) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${masteredCards.has(i) ? 'bg-green-500' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedType === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            All ({cards.length})
          </button>
          {Object.entries(cardsByType).map(([type, typeCards]: [string, any]) => {
            const typeInfo = getTypeInfo(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedType === type
                  ? `${typeInfo.bgActive} ${typeInfo.textActive}`
                  : `${typeInfo.bg} ${typeInfo.text}`
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
          <BrowseCards
            cards={filteredCards}
            onSeek={onSeek}
            toast={{ success, error: showError, info: showInfo }}
            masteredCards={masteredCards}
            onToggleMastered={toggleMastered}
          />
        ) : (
          <StudyCards
            cards={filteredCards}
            currentIndex={currentCardIndex}
            setCurrentIndex={setCurrentCardIndex}
            onSeek={onSeek}
            masteredCards={masteredCards}
            onToggleMastered={toggleMastered}
          />
        )}
      </div>
    </div>
  );
}

// 浏览模式 - 显示所有卡片
function BrowseCards({ cards, onSeek, toast, masteredCards, onToggleMastered }: BrowseCardsProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6 space-y-3">
        {cards.map((card: StudyCard, index: number) => (
          <EnhancedCardItem
            key={index}
            card={card}
            index={index}
            onSeek={onSeek}
            toast={toast}
            isMastered={masteredCards.has(index)}
            onToggleMastered={() => onToggleMastered(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 学习模式 - 专注单卡片学习，支持3D翻牌 + 掌握标记
function StudyCards({ cards, currentIndex, setCurrentIndex, onSeek, masteredCards, onToggleMastered }: StudyCardsProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // 切换卡片时重置翻转状态
  const goTo = (index: number) => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(index), 50);
  };

  // 完成屏：所有卡片都过完了
  if (currentIndex >= cards.length) {
    return (
      <CompletionScreen
        cards={cards}
        masteredCards={masteredCards}
        onRestart={() => goTo(0)}
      />
    );
  }

  const currentCard = cards[currentIndex];

  const handleMastered = () => {
    onToggleMastered(currentIndex);
    setTimeout(() => goTo(currentIndex + 1), 350);
  };

  const handleStillLearning = () => {
    setTimeout(() => goTo(currentIndex + 1), 200);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50/20">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">
              {currentIndex + 1} / {cards.length}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {masteredCards.size} mastered
            </span>
          </div>
          <div className="flex gap-0.5">
            {cards.map((_: StudyCard, i: number) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${masteredCards.has(i)
                  ? 'bg-green-500'
                  : i < currentIndex
                    ? 'bg-slate-300'
                    : i === currentIndex
                      ? 'bg-blue-400'
                      : 'bg-slate-200'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* 3D Flip Card */}
        <StudyCardItem
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(true)}
          onMastered={handleMastered}
          onStillLearning={handleStillLearning}
          isMastered={masteredCards.has(currentIndex)}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => goTo(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl hover:bg-white transition-all"
          >
            Skip
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// 完成屏
function CompletionScreen({ cards, masteredCards, onRestart }: { cards: StudyCard[]; masteredCards: Set<number>; onRestart: () => void }) {
  const total = cards.length;
  const mastered = masteredCards.size;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-green-50/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Complete</h2>
        <p className="text-slate-500 mb-2">
          You mastered{' '}
          <span className="font-bold text-green-600">{mastered}</span>
          {' '}of{' '}
          <span className="font-bold text-slate-700">{total}</span>
          {' '}cards
        </p>
        <p className="text-4xl font-black text-slate-900 mb-8">{pct}%</p>

        <div className="flex gap-0.5 mb-8">
          {cards.map((_: StudyCard, i: number) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${masteredCards.has(i) ? 'bg-green-500' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-slate-900 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
        >
          Study Again
        </button>
      </motion.div>
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

// 增强版卡片组件 - 浏览模式
function EnhancedCardItem({ card, index, onSeek, toast, isMastered, onToggleMastered }: EnhancedCardItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = getTypeInfo(card.type);
  const questionPreview = card.question.length > 80 ? card.question.slice(0, 80) + '…' : card.question;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden ${isMastered ? 'border-green-200' : 'border-slate-200'}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${typeInfo.bg}`}>
              {typeInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${typeInfo.bg} ${typeInfo.text}`}>
                  {typeInfo.label}
                </span>
                {isMastered && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-600 border border-green-200">
                    <Check size={10} />
                    Mastered
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">{questionPreview}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {card.time && (
              <button
                onClick={() => onSeek(card.time!)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg text-xs font-medium transition-all"
              >
                {card.time}
              </button>
            )}
            <button
              onClick={onToggleMastered}
              className={`p-1.5 rounded-lg transition-all ${isMastered ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              title={isMastered ? 'Mark as not mastered' : 'Mark as mastered'}
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            >
              <ChevronRight size={15} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="p-5 pt-4 bg-slate-50/60">
              <div className="mb-4">
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Answer</span>
                <p className="mt-2 text-slate-700 leading-relaxed text-sm">{card.answer}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Q: ${card.question}\n\nA: ${card.answer}`);
                  toast.success('Card copied to clipboard');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-all"
              >
                <Copy size={12} />
                Copy Card
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 学习模式专用卡片组件 - CSS 3D 翻牌
function StudyCardItem({ card, isFlipped, onFlip, onMastered, onStillLearning, isMastered }: StudyCardItemProps) {
  const typeInfo = getTypeInfo(card.type);

  return (
    <div style={{ perspective: '1200px' }} className="w-full">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: '300px' }}
        className="w-full"
      >
        {/* Front - Question */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer group"
          onClick={onFlip}
        >
          {isMastered && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
              <Check size={12} className="text-green-600" />
              <span className="text-xs font-semibold text-green-600">Mastered</span>
            </div>
          )}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${typeInfo.bg} mb-6`}>
            <span className={`text-sm font-bold ${typeInfo.text}`}>{typeInfo.icon}</span>
            <span className={`text-xs font-semibold ${typeInfo.text}`}>{typeInfo.label}</span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Question</p>
          <h2 className="text-xl font-semibold text-slate-900 text-center leading-relaxed max-w-lg">
            {card.question}
          </h2>
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-600 transition-colors">
            <div className="w-4 h-4 border border-current rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full" />
            </div>
            Tap to reveal answer
          </div>
        </div>

        {/* Back - Answer */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 bg-white rounded-2xl border border-green-200 shadow-lg p-8 flex flex-col"
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-5">Answer</p>
            <p className="text-lg text-slate-700 leading-relaxed text-center max-w-lg">
              {card.answer}
            </p>
          </div>
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={onStillLearning}
              className="flex-1 py-3 border-2 border-orange-200 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all text-sm"
            >
              Still Learning
            </button>
            <button
              onClick={onMastered}
              className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all shadow-sm text-sm"
            >
              Got it ✓
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
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
