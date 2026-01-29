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
} from "lucide-react";

export function SummaryArea({
  data,
  isLoading,
  onSeek,
  onStartAnalysis,
  mobileSubTab,
}: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        if (currentSection) {
          currentSection.content = currentContent.join('\n').trim();
          sections.push(currentSection);
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
        currentContent.push(line);
      }
    }
    
    // 保存最后一个section
    if (currentSection) {
      currentSection.content = currentContent.join('\n').trim();
      sections.push(currentSection);
    }
    
    // 如果没有检测到sections，创建一个默认的
    if (sections.length === 0 && data.trim()) {
      // 过滤掉问答格式的内容
      const filteredContent = data
        .split('\n')
        .filter((line:any) => !line.match(/^(Q|问|A|答|T|时间)\s*[:：]/))
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
            <Sparkles size={20} className="text-blue-600" />
            <div>
              <h2 className="font-semibold text-slate-900">AI Analysis</h2>
              <p className="text-xs text-slate-500">
                {sections.length} sections analyzed
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
              
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                <Download size={16} />
                Export
              </button>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!data && !isLoading ? (
          <EmptyState onStartAnalysis={onStartAnalysis} />
        ) : (
          <OverviewContent 
            sections={sections} 
            isLoading={isLoading} 
            onSeek={onSeek}
          />
        )}
      </div>
    </div>
  );
}

// 空状态组件 - 重新设计
function EmptyState({ onStartAnalysis }: any) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Sparkles size={40} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Zap size={16} className="text-yellow-800" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Ready to Unlock Insights
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Transform this video into structured knowledge with AI-powered analysis. 
          Get key insights, summaries, and actionable takeaways.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Target size={20} className="text-blue-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Key Insights</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Sparkles size={20} className="text-green-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Summary</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <BookOpen size={20} className="text-purple-600" />
            </div>
            <p className="text-xs font-medium text-slate-600">Takeaways</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onStartAnalysis}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
          Start AI Analysis
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">
            Powered by advanced AI • Takes 30-60 seconds
          </p>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-100 rounded-full">
            <span className="text-xs font-bold text-amber-700">2 Credits</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 概览内容组件 - 重新设计为NotebookLM风格
function OverviewContent({ sections, isLoading, onSeek }: any) {
  if (isLoading && sections.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 视频标题卡片 */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-slate-900 mb-2">
                  {sections[0]?.title?.replace(/^#+ /, '') || 'Video Analysis'}
                </h1>
                <p className="text-slate-600 text-sm">
                  AI-powered analysis with key insights and study materials
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  ✓ Analyzed
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 内容区块 */}
        <div className="grid gap-4">
          {sections.map((section: any, index: number) => (
            <SectionCard 
              key={section.id} 
              section={section} 
              index={index}
              onSeek={onSeek}
            />
          ))}
        </div>
        
        {isLoading && (
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
              <span className="font-medium">AI is analyzing more content...</span>
            </div>
          </motion.div>
        )}
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
function SectionCard({ section, index, onSeek }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
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
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-lg transition-all ${
              isBookmarked 
                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookOpen size={16} />
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
          >
            <ChevronRight 
              size={16} 
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
            <div className="p-4">
              <div className="prose prose-slate max-w-none prose-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.content}
                </ReactMarkdown>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                  <Copy size={12} />
                  Copy
                </button>
                
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                  <MessageSquare size={12} />
                  Ask AI
                </button>
                
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
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
