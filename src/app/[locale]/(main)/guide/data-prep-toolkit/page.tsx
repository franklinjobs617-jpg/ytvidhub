"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import {
  Settings,
  ArrowRight,
  Check,
  Zap,
  Database,
  FileCode,
  Layers,
  ShieldCheck,
  Terminal,
  Sparkles,
  ChevronRight,
  FileText,
  Clock,
  AlertCircle,
  Download,
  BarChart3,
  Cpu
} from "lucide-react";

export default function DataPrepToolkitPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState("workflow");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["workflow", "batch", "api-bypass", "summarizer", "conclusion"];
      const offset = 160;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-900 antialiased">
      <title>Advanced YouTube Subtitle Data Preparation Toolkit: Beyond Simple Downloads</title>
      <meta name="description" content="The definitive Advanced YouTube Subtitle Data Preparation Toolkit for researchers and developers. Master bulk processing, clean raw transcripts, and bypass API limits with structured JSON output." />
      <link rel="canonical" href="https://ytvidhub.com/guide/data-prep-toolkit/" />

      {/* 背景装饰：工业网格 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* === 1. HERO SECTION === */}
        <section className="relative pt-20 pb-16 border-b border-slate-100">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Settings size={12} className="animate-spin-slow" /> Advanced Data Engineering 2025
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 mb-8 leading-[0.9]">
              The Advanced <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Data Prep Toolkit
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed font-medium mb-12 italic">
              The definitive guide for researchers and developers. Master bulk processing, clean raw transcripts, and bypass API limits with structured JSON output.
            </p>

            <div className="flex flex-wrap gap-8 py-8 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target: ML/AI Researchers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Format: Structured JSON/CSV</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol: API Quota Bypass</span>
              </div>
            </div>
          </div>
        </section>

        {/* === 2. MAIN LAYOUT === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">

          {/* STICKY SIDEBAR NAV */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-1">
              {[
                { id: "workflow", label: "01. Workflow Inefficiency", icon: <AlertCircle size={14} /> },
                { id: "batch", label: "02. Bulk Power", icon: <Database size={14} /> },
                { id: "api-bypass", label: "03. API Strategy", icon: <Terminal size={14} /> },
                { id: "summarizer", label: "04. Summarizer Myth", icon: <Cpu size={14} /> },
                { id: "conclusion", label: "05. Final Protocol", icon: <ShieldCheck size={14} /> },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border-l-2 ${activeSection === item.id
                    ? "text-blue-600 border-blue-600 bg-blue-50/50"
                    : "text-slate-400 border-transparent hover:text-slate-900 hover:border-slate-200"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-12 p-6 bg-slate-900 text-white rounded-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Ready to Process?</h4>
              <Link href="/" onClick={handleAction} className="inline-flex w-full items-center justify-center gap-2 bg-blue-600 px-4 py-4 text-[10px] font-black uppercase hover:bg-blue-500 transition-all">
                Unlock Toolkit <Zap size={12} />
              </Link>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <div className="lg:col-span-9 space-y-32">

            {/* 01. Inefficiency */}
            <section id="workflow" className="scroll-mt-32">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-blue-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Section 01</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 mb-8 leading-tight tracking-tight">
                  Why Your Current <br />Workflow Is Inefficient
                </h2>
                <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                  <p>
                    If you're a developer, researcher, or data scientist, you know that raw subtitle data from YouTube is useless. It’s a swamp of ASR errors, messy formatting, and broken timestamps. This guide is for those who need <strong>advanced YouTube Subtitle Data Preparation</strong>—the tools and methods to convert noise into clean, structured data ready for LLMs, databases, and large-scale analysis.
                  </p>
                  <p>
                    You cannot manually clean thousands of files. You also can't afford the YouTube Data API quota limits. If you need data from 50+ videos, you need <strong>batch processing</strong>. Our toolkit centers around resolving this efficiency bottleneck.
                  </p>
                  <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-blue-600" /> The Case for a Truly Clean Transcript
                    </h3>
                    <p className="text-base">
                      A <strong>YouTube transcript without subtitles</strong> is often just raw output riddled with errors. Our method ensures the final output is 99% clean, standardized text, perfect for training AI models.
                    </p>
                  </div>
                </div>
              </div>

              {/* FIGURE 1 */}
              <div className="mt-16 border border-slate-200 bg-slate-50 p-2 group shadow-2xl shadow-slate-200/50">
                <div className="relative overflow-hidden">
                  <img
                    src="../image/An infographic illustrating the advanced workflow.webp"
                    alt="Workflow diagram illustrating advanced YouTube data preparation from a Playlist to structured output."
                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5">
                    Infographic: Data Prep Pipeline Architecture
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Power of Batch */}
            <section id="batch" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 leading-tight tracking-tight">
                    The Power of Batch Processing
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-10">
                    Downloading subtitles from an entire playlist is the only way to scale your project. Manual URL-by-URL extraction creates insurmountable bottlenecks.
                  </p>

                  <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200">
                    <div className="bg-white p-8 group hover:bg-slate-50 transition-colors">
                      <span className="text-3xl font-black text-slate-100 italic group-hover:text-blue-100 transition-colors">01</span>
                      <h4 className="text-xs font-black uppercase text-slate-900 mt-2 mb-4 tracking-widest">Recursive Ingestion</h4>
                      <p className="text-sm text-slate-500 leading-relaxed italic">Input the playlist URL. Our tool queues every video in the list automatically, harvesting links recursively.</p>
                    </div>
                    <div className="bg-white p-8 group hover:bg-slate-50 transition-colors">
                      <span className="text-3xl font-black text-slate-100 italic group-hover:text-indigo-100 transition-colors">02</span>
                      <h4 className="text-xs font-black uppercase text-slate-900 mt-2 mb-4 tracking-widest">Structured Output</h4>
                      <p className="text-sm text-slate-500 leading-relaxed italic">Developers demand structured data. We offer <strong>JSON export</strong> with segment IDs, acting as a free API alternative.</p>
                    </div>
                  </div>
                </div>

                {/* Industrial Logic Box */}
                <div className="md:col-span-2 bg-slate-950 p-8 text-white">
                  <div className="flex items-center gap-2 mb-8">
                    <Layers size={18} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Process Protocol</span>
                  </div>
                  <div className="space-y-8">
                    {[
                      { s: "1", t: "Activate Bulk Mode", d: "Switch to playlist/channel ingestion mode." },
                      { s: "2", t: "JSON Selection", d: "Choose structured fields to bypass parsing scripts." },
                      { s: "3", t: "ZIP Packing", d: "Initiate archive for massive dataset portability." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="font-mono text-blue-500 font-bold">{step.s}.</span>
                        <div>
                          <p className="text-[11px] font-black uppercase mb-1 tracking-tight">{step.t}</p>
                          <p className="text-[10px] text-slate-400 leading-relaxed italic">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 03. API Bypassing */}
            <section id="api-bypass" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight">
                  Bypassing API Limits
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-12">
                  Why pay hundreds of dollars in API quota when you only need the text? We provide superior output compared to raw extraction methods.
                </p>

                <div className="flex flex-col md:flex-row gap-1 border border-slate-900 bg-slate-900">
                  <div className="bg-slate-900 p-8 flex-1">
                    <div className="text-blue-400 mb-4"><FileCode size={32} /></div>
                    <h3 className="text-white font-black uppercase text-sm mb-4 tracking-widest">The yt-dlp Alternative</h3>
                    <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                      For power users, yt-dlp is excellent, but it still requires cleaning scripts. Our tool automates the cleaning <em>before</em> the download, saving days of manual scripting.
                    </p>
                  </div>
                  <div className="bg-white p-8 flex-1">
                    <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-6 border-b border-slate-100 pb-4">Real-World Impact Analysis</h4>
                    <div className="space-y-6">
                      {[
                        { label: "Cost", val: "80% Reduction", desc: "Saved $500/mo on official API costs." },
                        { label: "Efficiency", val: "5min vs 3hrs", desc: "100-video playlist automation win." },
                        { label: "Labor", val: "95% Automated", desc: "Minimized post-validation manual work." }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-start gap-4">
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase">{item.label}</div>
                            <div className="text-xs font-bold text-blue-600 uppercase mt-1">{item.val}</div>
                          </div>
                          <p className="text-[10px] text-slate-500 italic max-w-[140px] text-right">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 04. Summarizer Myth */}
            <section id="summarizer" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight">
                    The Summarizer Myth
                  </h2>
                  <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
                    <p>
                      I see many people searching for a <strong>youtube video summarizer ai without subtitles</strong>. This logic is fundamentally flawed. Any AI summarizer is only as good as the input data.
                    </p>
                    <p>
                      If your input is a raw, ASR-generated transcript, your summary will be riddled with errors. <strong>Our core value is providing the clean input that makes AI tools actually useful.</strong>
                    </p>
                  </div>

                  <div className="mt-10 p-6 border-l-4 border-amber-400 bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-[10px] tracking-widest mb-3">
                      <AlertCircle size={14} /> Garbage In, Garbage Out
                    </div>
                    <p className="text-amber-900 text-sm italic font-bold leading-relaxed">
                      "When an AI summarizer is fed raw ASR transcripts, it cannot distinguish between meaningful content and noise. Misidentified terms and run-on sentences are interpreted as factual."
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 p-2 bg-slate-50">
                  <div className="relative group">
                    <img
                      src="../image/ytvidhub-bulk-playlist-json-export-for-developers.webp"
                      alt="JSON Export feature"
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Feature Spotlight: Structured JSON Engine</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 05. Conclusion */}
            <section id="conclusion" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-6 tracking-tight">Conclusion</h2>
                <p className="text-slate-500 text-lg leading-relaxed italic mb-12">
                  Data prep is the invisible 90% of any successful data project. Stop settling for messy output that costs you time and money. Our toolkit is designed by professionals, for professionals.
                </p>

                <div className="bg-slate-950 p-12 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform">
                    <Zap size={200} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Scale Your Data Pipeline</h3>
                  <p className="text-slate-400 text-sm mb-10 font-medium italic">Stop wrestling with API quotas. Unlock advanced bulk and JSON features now.</p>

                  <Link href="/" onClick={handleAction} className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl active:scale-95">
                    Unlock Pro Features <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* === 7. FAQ SECTION === */}
        <section className="py-24 border-t border-slate-100 mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-12 text-center tracking-tight">
              Technical Q&A
            </h2>
            <div className="space-y-2">
              {[
                {
                  q: "What makes JSON better for developers?",
                  a: "JSON provides key-value pairs (timestamps, text, segment IDs) that allow developers to programmatically inject YouTube data into vector databases or LLM prompt chains without complex regex parsing."
                },
                {
                  q: "Can I process more than 1,000 URLs?",
                  a: "Yes. Our Pro and Researcher plans allow for large-scale ingestion. If you need 10,000+ URLs processed, please contact our support for a custom enterprise solution with dedicated infrastructure."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-slate-50 border border-slate-200">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none select-none font-black text-xs md:text-sm uppercase tracking-widest text-slate-800">
                    <span>{faq.q}</span>
                    <ChevronRight size={16} className="text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-6 border-t border-slate-200 text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/data-prep-guide" className="inline-flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">
                Advanced LLM Data Ingestion Guide <ArrowRight size={12} />
              </Link>
              <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Export to: JSONL • CSV • TXT • PARQUET
              </p>
            </div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}