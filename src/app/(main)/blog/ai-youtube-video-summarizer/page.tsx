"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, Brain, Search, AlignLeft, List, 
  ArrowRight, Video, Zap, ShieldCheck, ChevronRight, CheckCircle2
} from "lucide-react";

export default function AISummaryBlogPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans antialiased text-slate-800">
      {/* SEO Meta Tags */}
      <title>AI YouTube Summarizer: Interactive Insights & Smart Transcripts | YTVidHub</title>
      <meta name="description" content="Unlock the power of YTVidHub AI YouTube Summarizer. Batch extract transcripts to text, generate study flashcards, and get interactive video insights instantly." />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-10">
        
        {/* === HEADER SECTION === */}
        <header className="text-center mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Sparkles size={14} className="animate-pulse" /> AI Innovation 2025
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Decode Videos <br/><span className="text-violet-600">With Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Experience the next generation of video learning. Our AI engine transforms <strong>YouTube transcripts into actionable knowledge</strong>, flashcards, and searchable text blocks.
          </p>
        </header>

        {/* === FEATURE 1: AI POWERED INSIGHTS (图片在上方，全尺寸展示) === */}
        <section className="mb-40">
          {/* 1. 图片展示区 - 占据全宽确保清晰度 */}
          <div className="relative mb-16">
            <div className="absolute -inset-4 bg-gradient-to-b from-violet-500/10 to-transparent rounded-[3rem] blur-3xl opacity-50"></div>
            <div className="relative bg-white p-2 md:p-3 rounded-[2.5rem] border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]">
              {/* 模拟浏览器顶栏 */}
              <div className="flex items-center gap-1.5 mb-3 px-6 pt-4">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              {/* 核心大图 */}
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-100">
                <img 
                  src="/image/blog-ai-summary-interface.webp" 
                  alt="Full interface of YTVidHub AI Summary showing flashcards and video insights in high resolution" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* 2. 文字解析区 - 分栏排版增加深度 */}
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-violet-200">
                  <Brain size={26} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 italic">AI-Powered Study Insights</h2>
              </div>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our <strong>AI YouTube summarizer</strong> uses advanced reasoning to extract the core value of any video. Stop skimming through hours of footage—get the facts instantly.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-violet-600 transition-all group shadow-2xl shadow-slate-200 uppercase tracking-widest text-xs">
                Launch AI Summary <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-8">
              {[
                { title: "Flashcard Deck", desc: "Automated extraction of definitions and key facts into interactive cards.", icon: <Zap /> },
                { title: "Deep Insights", desc: "Summaries that understand context, tone, and the 'Why' behind the content.", icon: <Brain /> },
                { title: "Knowledge Sync", desc: "One-click export to your digital garden: Notion, Obsidian, or Markdown.", icon: <CheckCircle2 /> },
                { title: "Language Support", desc: "Supports summarizing YouTube videos in 50+ languages seamlessly.", icon: <Sparkles /> }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="text-violet-600 mb-4">{React.cloneElement(item.icon, { size: 24 })}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FEATURE 2: SMART TRANSCRIPTS (图片居上模式) === */}
        <section className="mb-40 py-24 bg-white rounded-[4rem] border border-slate-200 shadow-sm px-8 md:px-12 overflow-hidden">
          {/* 1. 图片展示区 */}
          <div className="relative mb-20 max-w-5xl mx-auto">
             <div className="bg-slate-50 p-2 md:p-3 rounded-[2.5rem] border border-slate-200 shadow-inner">
                <div className="overflow-hidden rounded-[1.8rem]">
                  <img 
                    src="/image/blog-smart-transcript-search.webp" 
                    alt="YTVidHub Smart Transcript Area featuring semantic grouping and keyword search in high clarity" 
                    className="w-full h-auto"
                  />
                </div>
             </div>
          </div>

          {/* 2. 文字解析区 */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                <AlignLeft size={30} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 italic tracking-tighter uppercase">Smart Transcripts for Professional Research</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Why settle for messy, unorganized captions? YTVidHub converts raw <strong>YouTube video transcripts to text</strong> with semantic grouping, making them perfect for <strong>LLM training datasets</strong> or deep-dive content analysis.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 text-left">
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h4 className="font-black text-blue-600 text-xs uppercase tracking-[0.2em] mb-4">Search Capability</h4>
                <h3 className="text-xl font-bold mb-4">Deep-Text Keyword Search</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Instantly locate any word across hours of video footage. One click takes you to the exact timestamp in the original video.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h4 className="font-black text-blue-600 text-xs uppercase tracking-[0.2em] mb-4">Processing</h4>
                <h3 className="text-xl font-bold mb-4">Semantic Time-Grouping</h3>
                <p className="text-slate-500 text-sm leading-relaxed">We group related sentences into logical paragraphs, preserving the speaker's flow and making the content easy to digest.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === USE CASES (SEO) === */}
        <section className="mb-40 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Search />, title: "AI Researchers", desc: "Build clean, noise-free text corpora from YouTube channels for AI fine-tuning." },
            { icon: <Video />, title: "Content Creators", desc: "Turn any video into an SEO-optimized blog post with one click using AI summaries." },
            { icon: <Zap />, title: "Rapid Learners", desc: "Skip the fluff. Get straight to the insights and test your knowledge with flashcards." }
          ].map((box, i) => (
            <div key={i} className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12">
                {React.cloneElement(box.icon as React.ReactElement, { size: 30 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase italic tracking-tighter">{box.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{box.desc}</p>
            </div>
          ))}
        </section>

        {/* === FAQ === */}
        <section className="mb-40 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 mb-12 uppercase tracking-[0.4em] text-center italic">Industry Q&A</h2>
          <div className="grid gap-6">
            {[
              { q: "How does the AI YouTube summarizer help with study?", a: "By extracting flashcards and structured notes, YTVidHub automates the 'Active Recall' process, saving students hours of manual note-taking." },
              { q: "Can I export YouTube transcripts for AI training?", a: "Yes. Our tool is optimized to provide 'Clean TXT' exports, which strip out music cues and artifacts, leaving you with a pristine text dataset." },
              { q: "Does YTVidHub support YouTube playlist summaries?", a: "Combined with our Bulk Downloader, you can process entire playlists and generate summaries for multiple videos at once." }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 hover:border-violet-400 transition-colors shadow-sm flex gap-6">
                <div className="font-black text-violet-200 text-4xl leading-none">0{i+1}</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === FINAL CTA === */}
        <section className="bg-slate-900 rounded-[5rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-violet-600/20 blur-[150px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight italic uppercase tracking-tighter">Own the <br/>Knowledge.</h2>
            <p className="text-slate-400 mb-16 text-xl">
              Don't just watch videos. Master them with YTVidHub AI Intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/" className="px-14 py-5 bg-violet-600 hover:bg-violet-700 rounded-3xl font-bold transition-all shadow-2xl shadow-violet-600/30">
                Try AI Summary Free
              </Link>
            </div>
            <div className="mt-20 flex items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              <span className="flex items-center gap-2"><ShieldCheck size={16}/> Privacy First</span>
              <span className="flex items-center gap-2"><Zap size={16}/> Instant Result</span>
              <span className="flex items-center gap-2"><Brain size={16}/> AI Powered</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}