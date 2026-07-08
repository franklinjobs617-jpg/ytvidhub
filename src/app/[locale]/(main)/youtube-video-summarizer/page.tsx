"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Youtube,
  Loader2,
  BookOpen,
  Brain,
  Clock,
  Globe,
  List,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

// ── FAQ 数据（与 layout.tsx 的 FAQPage Schema 一致）────────────────────
const FAQ_ITEMS = [
  {
    q: "How do I summarize a YouTube video?",
    a: "Paste the YouTube video URL into the input above and click 'AI Summary'. YTVidHub extracts the video transcript and uses AI to generate a structured summary with key points in about 30–60 seconds. No account required for guest tries.",
  },
  {
    q: "Is this YouTube summarizer free?",
    a: "Yes. YTVidHub offers free AI summary tries without signing up. Create a free account to get 5 credits — each AI summary uses 2 credits. Pro plans start at $19.99/month for 500 credits (250 AI summaries).",
  },
  {
    q: "Can I summarize a YouTube playlist?",
    a: "Yes. Paste a YouTube playlist URL to summarize all videos in bulk. Each video generates its own AI summary. This is useful for research, course review, and content analysis across many videos.",
  },
  {
    q: "What languages does the YouTube summarizer support?",
    a: "YTVidHub supports AI summarization for videos in 100+ languages — any language with a subtitle or caption track on YouTube, including English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, and Hindi.",
  },
  {
    q: "How accurate is the AI summary?",
    a: "Summary quality depends on the video's subtitle track. Videos with creator-uploaded captions produce the most accurate summaries. Auto-generated captions work well for most videos in major languages.",
  },
  {
    q: "Can I use this to summarize YouTube videos for studying?",
    a: "Yes. After generating an AI summary, you can also create study cards (flashcards) from the video content — making it easy to review lectures, tutorials, and educational videos efficiently.",
  },
  {
    q: "Does it work without installing anything?",
    a: "Yes. YTVidHub is entirely web-based — no browser extension or software installation required. Works on desktop and mobile.",
  },
  {
    q: "How is this different from YouTube's own summary feature?",
    a: "YouTube's built-in summary is only available on select videos and regions and cannot be exported. YTVidHub works on any public video with captions, generates a structured exportable summary, and also creates study cards and notes.",
  },
];

// ── Inline AI Summary 输入组件（工具在第一屏，三合一公式核心）────────────
function SummarizerWidget() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidUrl = (u: string) =>
    /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)\/.+$/.test(u.trim());

  const handleSummarize = () => {
    if (!url.trim() || !isValidUrl(url)) {
      inputRef.current?.focus();
      return;
    }
    setIsLoading(true);
    const encoded = encodeURIComponent(url.trim());
    // 跳转到 workspace 并自动触发 AI Summary 模式
    window.location.href = `/workspace?urls=${encoded}&from=summarizer&mode=summary`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSummarize();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-blue-200 bg-white shadow-[0_4px_32px_-8px_rgba(37,99,235,0.15)] p-4">
        {/* 输入行 */}
        <div className="flex items-center gap-3 mb-3">
          <Youtube size={18} className="text-red-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste a YouTube video or playlist URL…"
            className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
          />
        </div>
        {/* 按钮行 */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            2 free guest tries · 24h · No signup needed
          </span>
          <button
            onClick={handleSummarize}
            disabled={!url.trim() || isLoading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Sparkles size={15} />
            )}
            {isLoading ? "Summarizing…" : "AI Summary (Free)"}
          </button>
        </div>
      </div>
      {/* 快捷示例 */}
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-400">
        <span>Try with:</span>
        {[
          { label: "TED Talk", url: "https://www.youtube.com/watch?v=arj7oStGLkU" },
          { label: "Playlist", url: "https://www.youtube.com/playlist?list=PLFs4vir_WsTySi9F8v8fLQLBpIBEDkKGP" },
        ].map((ex) => (
          <button
            key={ex.label}
            onClick={() => setUrl(ex.url)}
            className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── 主页面组件 ────────────────────────────────────────────────────────────
export default function YouTubeVideoSummarizerPage() {
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700">
      <main>

        {/* ══════════════════════════════════════════════════════════
            第一屏：Hero + 工具（三合一公式：工具在第一屏可见）
        ══════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
          <div className="absolute top-[-15%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-indigo-400/10 rounded-full blur-[80px]" />

          <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-16 text-center z-10">
            {/* Quick answer — AI GEO 首段直接回答意图 */}
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              Free · AI-Powered · No Install
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-5 leading-tight">
              YouTube Video{" "}
              <span className="text-blue-600">Summarizer</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-3 leading-relaxed">
              Get an <strong>AI-powered summary</strong> of any YouTube video in
              seconds. Paste a URL — no watching required, no signup to try.
            </p>
            <p className="text-xs text-slate-400 mb-8">
              Last updated July 8, 2026 · By YTVidHub Editorial Team
            </p>

            {/* ★ 工具在第一屏 — 三合一公式核心 */}
            <SummarizerWidget />

            {/* 功能信号条 */}
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              {[
                { icon: <Globe size={14} />, text: "100+ languages" },
                { icon: <List size={14} />, text: "Playlists supported" },
                { icon: <Zap size={14} />, text: "Under 60 seconds" },
                { icon: <BookOpen size={14} />, text: "Study cards included" },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-blue-500">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            第二屏：结果展示示例（让用户在操作前看到终态）
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
              What your summary looks like
            </h2>
            <p className="text-slate-500 text-center text-sm mb-10">
              Example output from a 20-minute TED Talk
            </p>

            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* 视频信息 */}
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Youtube size={14} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    The Power of Vulnerability — Brené Brown · TED
                  </p>
                  <p className="text-xs text-slate-400">20:19 · Auto-summarized by YTVidHub AI</p>
                </div>
                <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1">
                  <CheckCircle size={11} /> Done
                </span>
              </div>

              {/* 摘要内容 */}
              <div className="p-5 space-y-5">
                {/* 核心要点 */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2.5">
                    Key Points
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Vulnerability is the birthplace of innovation, creativity, and change — not a weakness.",
                      "Shame drives the fear of disconnection; people who feel worthy lean into vulnerability.",
                      "Numbing vulnerability also numbs positive emotions — joy, gratitude, and happiness.",
                      "Embracing uncertainty is essential to authentic human connection.",
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 章节时间轴 */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                    Chapter Breakdown
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { time: "0:00", title: "Introduction: The dare to be a researcher" },
                      { time: "3:20", title: "6 years of data: what makes people feel worthy" },
                      { time: "8:45", title: "Shame, vulnerability, and the numbing paradox" },
                      { time: "14:30", title: "Letting go of who we should be" },
                      { time: "18:00", title: "Call to action: practice gratitude and joy" },
                    ].map((ch, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 text-xs font-mono text-slate-400 w-10">
                          {ch.time}
                        </span>
                        <span className="text-slate-600">{ch.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 行动 */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg py-2 transition-colors">
                    📋 Copy Summary
                  </button>
                  <button className="flex-1 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg py-2 transition-colors">
                    🃏 Generate Study Cards
                  </button>
                  <button className="flex-1 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg py-2 transition-colors">
                    ⬇️ Download Transcript
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              Example output — your summary will reflect the actual video content
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            第三屏：功能说明 + How it works
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
              How the YouTube summarizer works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  icon: <Youtube size={20} className="text-red-500" />,
                  title: "Paste any YouTube URL",
                  desc: "Single video, playlist, or channel — paste the URL and the tool fetches the available transcript automatically.",
                },
                {
                  step: "2",
                  icon: <Brain size={20} className="text-blue-600" />,
                  title: "AI reads the transcript",
                  desc: "Our AI model analyzes the full transcript — not just the first few minutes — to generate a complete, accurate summary.",
                },
                {
                  step: "3",
                  icon: <Sparkles size={20} className="text-indigo-600" />,
                  title: "Get structured output",
                  desc: "Key points, chapter breakdown, and main takeaways — ready to copy, export, or turn into study cards.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl bg-white border border-slate-100 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            Use cases
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              What people use YouTube summarization for
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎓",
                  title: "Students & learners",
                  desc: "Summarize lecture videos and online courses. Generate study cards to review key concepts faster.",
                },
                {
                  icon: "🔬",
                  title: "Researchers",
                  desc: "Screen and analyze large numbers of videos quickly. Extract key claims and timestamps for citation.",
                },
                {
                  icon: "🤖",
                  title: "AI workflows",
                  desc: "Feed clean, structured summaries into ChatGPT, Claude, or NotionAI for follow-up Q&A and analysis.",
                },
                {
                  icon: "✍️",
                  title: "Content creators",
                  desc: "Summarize competitor videos or source material to create blog posts, newsletters, and social content.",
                },
                {
                  icon: "🌍",
                  title: "Language learners",
                  desc: "Understand foreign-language videos faster with AI-generated summaries in the source language.",
                },
                {
                  icon: "💼",
                  title: "Professionals",
                  desc: "Catch up on industry conference talks, webinars, and thought leader interviews without watching in full.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            Playlist summarizer highlight（覆盖 Vol=1900 playlist 词）
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                    Bulk summarization
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Summarize entire YouTube playlists
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Paste a YouTube playlist URL to generate AI summaries for
                    every video at once — no repetitive copy-paste, no video-by-video
                    workflow. Ideal for online courses, conference talks, and research sets.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "One URL → summaries for all videos in the playlist",
                      "Each video gets its own structured key-points summary",
                      "Supports playlists with 100+ videos",
                      "Credits used: 2 per video summary",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-auto">
                  <Link
                    href="/?action=summary"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Sparkles size={15} />
                    Try Playlist Summarizer →
                  </Link>
                  <Link
                    href="/bulk-youtube-subtitle-downloader/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    Bulk subtitle download
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            出站权威引用（规则文件要求：每页 ≥1 条权威外链）
        ══════════════════════════════════════════════════════════ */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                How it works under the hood
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                YTVidHub fetches the{" "}
                <a
                  href="https://support.google.com/youtube/answer/2734799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  YouTube caption track
                </a>{" "}
                (the same transcript YouTube shows in its own panel), then passes the
                full text to an AI model for summarization. This means accuracy depends
                on caption quality — creator-uploaded captions produce better results than
                auto-generated tracks. Learn more about{" "}
                <a
                  href="https://support.google.com/youtube/answer/6373554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  YouTube's auto-caption system
                </a>{" "}
                on Google's support page.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════ */}
        <UnifiedFaqSection
          title="YouTube Video Summarizer FAQ"
          subtitle="Common questions about AI-powered YouTube summarization."
          items={FAQ_ITEMS}
          sectionClassName="py-16 bg-slate-50"
          containerClassName="max-w-3xl"
        />

        {/* ══════════════════════════════════════════════════════════
            Related tools 内链（规则要求 ≥3 个内链）
        ══════════════════════════════════════════════════════════ */}
        <section className="py-10 pb-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Related tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  href: "/youtube-transcript-generator/",
                  title: "Transcript Generator",
                  desc: "Download full YouTube transcripts as TXT, SRT, or VTT.",
                },
                {
                  href: "/youtube-transcript-downloader/",
                  title: "Transcript Downloader",
                  desc: "Bulk download transcripts from playlists and channels.",
                },
                {
                  href: "/bulk-youtube-subtitle-downloader/",
                  title: "Bulk Subtitle Downloader",
                  desc: "Download subtitle files from entire YouTube playlists.",
                },
                {
                  href: "/youtube-subtitle-downloader/",
                  title: "Subtitle Downloader",
                  desc: "Download SRT, VTT, TXT subtitles from any single video.",
                },
                {
                  href: "/what-is-vtt-file/",
                  title: "What Is a VTT File?",
                  desc: "Guide to the WebVTT subtitle format.",
                },
                {
                  href: "/guide/playlist-subtitles-bulk/",
                  title: "Playlist Download Guide",
                  desc: "Step-by-step guide to bulk subtitle and transcript download.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-blue-700">{link.title}</span>
                  <span className="text-xs text-slate-500">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
