"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { subtitleApi } from "@/lib/api";
import { Search, Copy, Check, ClipboardCopy, Download, ChevronUp, ChevronDown } from "lucide-react";
import {
  parseVtt,
  groupTranscriptByTime,
  formatTime,
  highlightText,
} from "@/utils/transcriptUtils";

export function TranscriptArea({
  videoUrl,
  currentTime,
  onSeek,
  searchInputRef,
  onLoadingChange,
  videoId,
  initialSubtitleContent,
  lang = 'en',
  onLangChange,
}: {
  videoUrl: string;
  currentTime: number;
  onSeek?: (time: number) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  onLoadingChange?: (loading: boolean) => void;
  videoId?: string;
  initialSubtitleContent?: string;
  lang?: string;
  onLangChange?: (lang: string) => void;
}) {
  const [transcriptVtt, setTranscriptVtt] = useState<string>(initialSubtitleContent || "");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(true);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [availableLangs, setAvailableLangs] = useState<{ code: string, label: string }[]>([]);
  const internalSearchRef = useRef<HTMLInputElement>(null);
  const searchRef = searchInputRef || internalSearchRef;

  // 获取可用语言列表
  useEffect(() => {
    if (!videoUrl) return;
    subtitleApi.getVideoInfo(videoUrl).then(info => {
      if (info.languages && Array.isArray(info.languages)) {
        setAvailableLangs(info.languages);
        
        // 智能语言选择逻辑
        if (onLangChange && info.languages.length > 0) {
          const currentLangExists = info.languages.some((l: any) => l.code === lang);
          
          if (!currentLangExists) {
            // 当前语言不存在，按优先级选择：
            
            // 1. 如果请求的是中文，优先选择简体中文变体
            if (lang.startsWith('zh')) {
              const chinesePriority = ['zh-CN', 'zh-cn', 'zh-Hans', 'zh-hans', 'zh', 'zh-Hant', 'zh-hant', 'zh-TW', 'zh-tw'];
              const chineseLang = chinesePriority.find(priorityLang => 
                info.languages.some((l: any) => l.code === priorityLang)
              );
              
              if (chineseLang) {
                const selectedLang = info.languages.find((l: any) => l.code === chineseLang);
                console.log(`🔄 Switching to Chinese variant: ${selectedLang.code}`);
                onLangChange(selectedLang.code);
                return;
              }
            }
            
            // 2. 英文（如果存在）
            const englishLang = info.languages.find((l: any) => 
              l.code === 'en' || l.code === 'en-US' || l.code === 'en-orig'
            );
            
            if (englishLang) {
              console.log(`🔄 Switching to English: ${englishLang.code}`);
              onLangChange(englishLang.code);
            } else {
              // 3. 如果没有英文，选择第一个可用语言
              console.log(`🔄 No English available, switching to: ${info.languages[0].code}`);
              onLangChange(info.languages[0].code);
            }
          }
        }
      }
    }).catch(console.error);
  }, [videoUrl]);

  const [isStreamLoading, setIsStreamLoading] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamStatus, setStreamStatus] = useState("");

  // 检测是否为长视频，决定使用流式加载
  const isLongVideo = useMemo(() => {
    // 这里可以通过视频时长判断，暂时用简单的启发式方法
    return transcriptVtt.length > 100000; // 如果字幕内容很长，可能是长视频
  }, [transcriptVtt]);

  useEffect(() => {
    if (!videoUrl) return;

    // 优先从缓存加载对应语言的字幕
    try {
      const cached = sessionStorage.getItem(`ytvidhub_transcript_${videoUrl}_${lang}`);
      if (cached) {
        const { text, format } = JSON.parse(cached);
        if (format === 'vtt') { 
          setTranscriptVtt(text); 
          console.log(`📋 Loaded cached subtitles for language: ${lang}`);
          return; 
        }
      }
    } catch { }

    console.log(`🔄 Fetching subtitles for language: ${lang}`);
    
    // 对于可能的长视频，使用流式加载
    const shouldUseStream = false; // 暂时禁用流式，可以后续启用
    
    if (shouldUseStream) {
      handleStreamSubtitleLoad();
    } else {
      handleNormalSubtitleLoad();
    }
  }, [videoUrl, lang, onLoadingChange]);

  const handleStreamSubtitleLoad = async () => {
    setIsStreamLoading(true);
    setStreamProgress(0);
    setStreamStatus("Initializing...");
    onLoadingChange?.(true);

    try {
      const response = await fetch('/api/subtitle_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: videoUrl,
          lang: lang,
          format: 'vtt'
        })
      });

      if (!response.ok) throw new Error('Stream request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No stream reader available');

      let buffer = '';
      let contentChunks: string[] = [];
      let isReceivingContent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '{\"type\": \"content_start\"}') {
              isReceivingContent = true;
              continue;
            }
            
            if (data === '{\"type\": \"content_end\"}') {
              isReceivingContent = false;
              // 合并所有内容块
              const fullContent = contentChunks.join('');
              setTranscriptVtt(fullContent);
              
              // 缓存结果
              try {
                sessionStorage.setItem(`ytvidhub_transcript_${videoUrl}_${lang}`, 
                  JSON.stringify({ text: fullContent, format: 'vtt' }));
              } catch { }
              
              console.log(`✅ Stream completed for language: ${lang}`);
              break;
            }

            if (isReceivingContent) {
              try {
                const chunkData = JSON.parse(data);
                if (chunkData.type === 'content_chunk') {
                  // 解码 base64 内容
                  const decodedChunk = atob(chunkData.data);
                  contentChunks.push(decodedChunk);
                }
              } catch { }
              continue;
            }

            try {
              const eventData = JSON.parse(data);
              
              switch (eventData.type) {
                case 'status':
                  setStreamStatus(eventData.message);
                  break;
                case 'progress':
                  setStreamProgress(eventData.progress);
                  break;
                case 'error':
                  throw new Error(eventData.message);
                case 'completed':
                  setStreamProgress(100);
                  setStreamStatus('Completed');
                  break;
              }
            } catch (parseError) {
              // 忽略解析错误，继续处理
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Stream failed for language ${lang}:`, error);
      setTranscriptVtt("");
      // 回退到普通加载
      handleNormalSubtitleLoad();
    } finally {
      setIsStreamLoading(false);
      setStreamProgress(0);
      setStreamStatus("");
      onLoadingChange?.(false);
    }
  };

  const handleNormalSubtitleLoad = () => {
    setLoading(true);
    onLoadingChange?.(true);

    // 设置超时处理
    const timeoutId = setTimeout(() => {
      console.warn(`⏰ Subtitle loading timeout for language: ${lang}`);
      setLoading(false);
      onLoadingChange?.(false);
      setTranscriptVtt("");
    }, 45000); // 45秒超时，给长视频更多时间

    subtitleApi
      .downloadSingle({ url: videoUrl, lang: lang, format: "vtt", title: "transcript", isPreview: true })
      .then(async (blob) => {
        clearTimeout(timeoutId);
        const text = await blob.text();
        // 简单的空检查，防止下载到错误页面
        if (text.trim().startsWith('{') && text.includes('"error"')) {
          console.error(`❌ Error response for language ${lang}:`, text);
          setTranscriptVtt("");
          return;
        }
        console.log(`✅ Successfully loaded subtitles for language: ${lang}`);
        setTranscriptVtt(text);
        // 存入带语言标识的缓存
        try {
          sessionStorage.setItem(`ytvidhub_transcript_${videoUrl}_${lang}`, JSON.stringify({ text, format: 'vtt' }));
        } catch { }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error(`❌ Failed to load transcript for language ${lang}:`, err);
        setTranscriptVtt("");
        
        // 显示更友好的错误信息
        if (err.message && err.message.includes('No subtitles found')) {
          console.log(`ℹ️ No subtitles available for language: ${lang}`);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setLoading(false);
        onLoadingChange?.(false);
      });

    // 清理函数
    return () => {
      clearTimeout(timeoutId);
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayItems.map(item => item.text).join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // P2: 增强的导出功能
  const handleExportWithTimestamps = () => {
    const videoTitle = document.title || 'YouTube Video';
    const exportContent = [
      `# ${videoTitle}`,
      `Source: ${videoUrl}`,
      `Exported: ${new Date().toLocaleString()}`,
      '',
      ...displayItems.map(item => `[${formatTime(item.startTime)}] ${item.text}`)
    ].join('\n');

    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayItems = useMemo(() => {
    if (!transcriptVtt) return [];
    const rawItems = parseVtt(transcriptVtt);
    const finalItems = isSmartMode
      ? groupTranscriptByTime(rawItems)
      : rawItems.map((item) => ({ startTime: item.start, text: item.text }));
    if (searchQuery) {
      return finalItems.filter((i) => i.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return finalItems;
  }, [transcriptVtt, isSmartMode, searchQuery]);

  // P1: 搜索结果统计和导航
  const searchResults = useMemo(() => {
    if (!searchQuery || !transcriptVtt) return { total: 0, matches: [] };
    const rawItems = parseVtt(transcriptVtt);
    const finalItems = isSmartMode
      ? groupTranscriptByTime(rawItems)
      : rawItems.map((item) => ({ startTime: item.start, text: item.text }));

    const matches = finalItems
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((i) => i.text.toLowerCase().includes(searchQuery.toLowerCase()));

    return { total: matches.length, matches };
  }, [transcriptVtt, isSmartMode, searchQuery]);

  // P1: 搜索导航功能
  const navigateSearch = (direction: 'prev' | 'next') => {
    if (searchResults.total === 0) return;

    if (direction === 'next') {
      setCurrentSearchIndex((prev) => (prev + 1) % searchResults.total);
    } else {
      setCurrentSearchIndex((prev) => (prev - 1 + searchResults.total) % searchResults.total);
    }
  };

  // 重置搜索索引当搜索词改变时
  useEffect(() => {
    setCurrentSearchIndex(0);
  }, [searchQuery]);

  const activeItemRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(() => {
    if (!currentTime || searchQuery || displayItems.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < displayItems.length; i++) {
      if (displayItems[i].startTime <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, searchQuery, displayItems]);

  useEffect(() => {
    if (activeIndex >= 0 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex]);

  // 监听外部触发的复制事件
  useEffect(() => {
    const handleCopyEvent = () => {
      handleCopy();
    };
    window.addEventListener('copyAllTranscript', handleCopyEvent);
    return () => window.removeEventListener('copyAllTranscript', handleCopyEvent);
  }, [displayItems]);

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100">
      {/* Tab Header — YouMind style */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0 bg-white">
        <div className="flex">
          {[{ label: "Paragraph View", value: true }, { label: "Timestamp View", value: false }].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setIsSmartMode(value)}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-all duration-200 ${isSmartMode === value
                ? "border-violet-500 text-violet-600 bg-violet-50/50"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 语言选择器 */}
        {availableLangs.length > 0 && (
          <div className="relative group">
            <select
              value={lang}
              onChange={(e) => onLangChange?.(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md min-w-[140px] group-hover:bg-slate-50/50"
            >
              {availableLangs.map((l:any) => (
                <option key={l.code} value={l.code} className="py-2 text-slate-700">
                  {l.label} {l.is_auto && '(Auto)'}
                </option>
              ))}
            </select>
            {/* 自定义下拉箭头 */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* 语言数量指示器 */}
            {availableLangs.length > 1 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {availableLangs.length}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Bar - P1 优化 */}
      <div className="px-4 py-2 border-b border-slate-100 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript..."
            className="w-full pl-9 pr-20 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          />

          {searchQuery && searchResults.total > 0 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {/* 匹配计数 */}
              <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 bg-white border border-slate-200 rounded">
                {currentSearchIndex + 1} / {searchResults.total}
              </span>

              {/* 导航按钮 */}
              <div className="flex">
                <button
                  onClick={() => navigateSearch('prev')}
                  className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title="Previous match"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={() => navigateSearch('next')}
                  className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title="Next match"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>
          )}

          {searchQuery && searchResults.total === 0 && (
            <span className="absolute right-7 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">No matches</span>
          )}

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-sm"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {(loading || isStreamLoading) ? (
          <div className="h-full flex items-center justify-center px-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 mx-auto border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-violet-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">
                  {isStreamLoading ? 'Streaming subtitles...' : 'Loading subtitles...'}
                </p>
                <p className="text-xs text-slate-500">Language: {availableLangs.find(l => l.code === lang)?.label || lang}</p>
                
                {/* 流式加载进度 */}
                {isStreamLoading && (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${streamProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-600">{streamStatus}</p>
                    <p className="text-xs text-slate-400">{streamProgress.toFixed(1)}% completed</p>
                  </div>
                )}
                
                {/* 普通加载提示 */}
                {!isStreamLoading && (
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span>This may take a moment for long videos</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : displayItems.length > 0 ? (
          <div className="py-2 pb-24 md:pb-2">
            {displayItems.map((item, i) => {
              const isActive = i === activeIndex;
              const isCurrentSearchResult = searchQuery && searchResults.total > 0 &&
                searchResults.matches[currentSearchIndex]?.startTime === item.startTime;

              return (
                <div
                  key={i}
                  ref={isActive ? activeItemRef : undefined}
                  className={`group relative flex gap-3 px-4 py-2.5 transition-all cursor-default ${isCurrentSearchResult
                    ? "bg-yellow-50 border-l-2 border-yellow-500 ring-1 ring-yellow-200"
                    : isActive
                      ? "bg-violet-50 border-l-2 border-violet-500"
                      : `border-l-2 border-transparent ${activeIndex >= 0 ? "opacity-55 hover:opacity-100" : "hover:bg-slate-50"}`
                    }`}
                >
                  {/* Timestamp */}
                  <span
                    onClick={() => onSeek?.(item.startTime)}
                    className={`shrink-0 text-[11px] font-mono mt-0.5 cursor-pointer transition-colors ${isCurrentSearchResult
                      ? "text-yellow-600 font-semibold"
                      : isActive
                        ? "text-violet-500 font-semibold"
                        : "text-slate-400 hover:text-violet-500"
                      }`}
                  >
                    {formatTime(item.startTime)}
                  </span>

                  {/* Text */}
                  <p className={`text-sm leading-6 flex-1 ${isCurrentSearchResult
                    ? "text-slate-900 font-medium"
                    : isActive
                      ? "text-slate-900 font-medium"
                      : "text-slate-600"
                    }`}>
                    {highlightText(item.text, searchQuery).map((seg, j) =>
                      seg.isMatch
                        ? <mark key={j} className={`rounded px-0.5 ${isCurrentSearchResult
                          ? "bg-yellow-300 text-yellow-900 font-semibold"
                          : "bg-yellow-200 text-yellow-900"
                          }`}>{seg.part}</mark>
                        : seg.part
                    )}
                  </p>

                  {/* P1: 增强的悬浮复制按钮 */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`[${formatTime(item.startTime)}] ${item.text}`);
                      // 简单的复制反馈
                      const btn = document.activeElement as HTMLButtonElement;
                      if (btn) {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg> Copied!';
                        setTimeout(() => {
                          btn.innerHTML = originalText;
                        }, 1000);
                      }
                    }}
                    className="absolute right-3 top-2.5 opacity-0 group-hover:opacity-100 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 hover:text-violet-600 hover:border-violet-300 transition-all shadow-sm"
                  >
                    <ClipboardCopy size={10} /> Copy
                  </button>
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center px-6">
            <div className="text-center space-y-3 max-w-sm">
              <div className="w-14 h-14 mx-auto bg-amber-50 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">No Subtitles Found</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {availableLangs.length === 0 
                    ? "This video doesn't have any subtitles on YouTube."
                    : `No subtitles available for ${availableLangs.find(l => l.code === lang)?.label || lang}.`
                  }
                </p>
                {availableLangs.length > 0 && (
                  <p className="text-xs text-slate-400 mt-2">
                    Available: {availableLangs.slice(0, 3).map(l => l.label).join(', ')}
                    {availableLangs.length > 3 && ` +${availableLangs.length - 3} more`}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
