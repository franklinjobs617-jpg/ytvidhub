"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import DataPrepGuideSchema from "@/components/seo/DataPrepGuideSchema";
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
  Cpu,
  User,
  Calendar
} from "lucide-react";

export default function DataPrepGuidePage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState("hidden-cost");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hidden-cost", "pipeline", "structured", "rag", "qa"];
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
    <div className="bg-white min-h-screen font-sans selection:bg-blue-50 text-slate-900 antialiased">
      <DataPrepGuideSchema />

      {/* 背景装饰：工业网格 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* === 1. HERO SECTION === */}
        <section className="relative pt-20 pb-16 border-b border-slate-100">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Settings size={12} className="animate-spin-slow" /> Engineering Blog: Subtitle Data Prep
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 mb-8 leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                LLM Data Preparation
              </span><br />
              Mastery Guide
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed font-medium mb-12 italic">
              Mastering bulk extraction, cleaning noisy ASR data, and structuring output for modern AI pipelines.
            </p>

            <div className="flex flex-wrap items-center gap-8 py-8 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img src="./image/icon.webp" className="w-10 h-10 rounded-full border border-slate-200 grayscale" alt="Franklin Jobs" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-900">Franklin Jobs</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Lead Engineer</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Updated Oct 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">8 Min Read</span>
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
                { id: "hidden-cost", label: "01. Hidden Cost", icon: <AlertCircle size={14} /> },
                { id: "pipeline", label: "02. Data Pipeline", icon: <Database size={14} /> },
                { id: "structured", label: "03. Structured Data", icon: <Terminal size={14} /> },
                { id: "rag", label: "04. RAG Application", icon: <Cpu size={14} /> },
                { id: "qa", label: "05. Technical Q&A", icon: <ShieldCheck size={14} /> },
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
            <div className="mt-12 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Scale with Bulk Mode</h4>
              <Link href="/bulk-youtube-subtitle-downloader" className="inline-flex w-full items-center justify-center gap-2 bg-slate-900 text-white px-4 py-4 text-[10px] font-black uppercase hover:bg-blue-600 transition-all shadow-xl">
                Try Bulk Extractor <Zap size={12} />
              </Link>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                Built for 100K+ video batches.
              </p>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <div className="lg:col-span-9 space-y-32">

            {/* Section 1: Hidden Cost */}
            <section id="hidden-cost" className="scroll-mt-32">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-blue-600"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Introduction</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-slate-900 mb-8 tracking-tight leading-tight">
                  The Hidden Cost of <br />Dirty Data
                </h2>
                <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed font-medium italic border-l-4 border-slate-100 pl-8">
                  <p>
                    Welcome to the definitive guide. If you are looking to scale your LLM or NLP projects using real-world conversational data from YouTube, you know the hidden cost isn't just time—it's the <strong>quality of your training set</strong>.
                  </p>
                  <p>
                    We built <Link href="/" className="text-blue-600 font-bold border-b border-blue-100 hover:border-blue-600 transition-all">YTVidHub</Link> because generic subtitle downloaders fail at the critical second step: <strong>data cleaning</strong>. This guide breaks down exactly how to treat raw transcript data to achieve production-level readiness using our <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-600 font-bold border-b border-blue-100 hover:border-blue-600">bulk subtitle extraction tools</Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Pipeline */}
            <section id="pipeline" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-3">
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight">
                    Why Raw SRT Files <br />Slow Down Your Pipeline
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-10">
                    Many tools offer bulk download, but they often deliver messy output. For Machine Learning, this noise can be catastrophic, leading to poor model performance and wasted compute cycles.
                  </p>

                  <div className="bg-slate-900 p-8 md:p-12 border-l-4 border-blue-600 relative overflow-hidden mb-10">
                    <h3 className="text-white font-black uppercase text-sm mb-8 tracking-widest">The Scourge of ASR Noise</h3>
                    <div className="space-y-8">
                      {[
                        { id: "01", t: "Timestamp Overload", d: "Raw SRT files are riddled with time codes that confuse tokenizers and inflate context windows unnecessarily." },
                        { id: "02", t: "Speaker Label Interference", d: "Automatically inserted speaker tags (e.g., [MUSIC], [SPEAKER_01]) need removal or intelligent tagging." },
                        { id: "03", t: "Accuracy Discrepancies", d: "The challenge of automatically generated subtitles requires a robust verification layer." }
                      ].map((item) => (
                        <div key={item.id} className="flex gap-6">
                          <span className="text-blue-400 font-mono font-bold">{item.id}.</span>
                          <div>
                            <div className="text-white text-xs font-black uppercase tracking-widest mb-2">{item.t}</div>
                            <p className="text-slate-400 text-[11px] leading-relaxed italic">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="border border-slate-200 p-2 bg-slate-50 shadow-2xl rotate-1 group">
                    <img
                      src="./image/data-prep-pipeline-flowchart.webp"
                      alt="LLM data preparation pipeline flowchart"
                      className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="p-4 text-center border-t border-slate-100 mt-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Figure 1: Production Pipeline Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Structured Data */}
            <section id="structured" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight leading-tight">
                  From Bulk Download <br />to Structured Data
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-12">
                  The key to efficiency is integrating the download and cleaning steps into a seamless pipeline. This is where a dedicated tool like our <Link href="/youtube-subtitle-downloader" className="text-blue-600 font-black border-b border-blue-100 hover:border-blue-600 transition-all">YouTube subtitle downloader</Link> shines over managing complex custom scripts.
                </p>

                <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 mb-12">
                  <div className="bg-white p-8 group hover:bg-slate-50 transition-colors">
                    <div className="text-blue-600 mb-6"><BarChart3 size={24} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">Format Analysis</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">Comparing SRT vs VTT vs TXT specifically for transformer-based model ingestion.</p>
                  </div>
                  <div className="bg-white p-8 group hover:bg-slate-50 transition-colors">
                    <div className="text-indigo-600 mb-6"><FileCode size={24} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">JSON Normalization</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">How we convert non-standard ASR output into machine-readable JSON structures.</p>
                  </div>
                </div>

                <div className="border border-slate-200 p-2 bg-slate-50 mb-12 shadow-sm">
                  <img
                    src="./image/subtitle-format-comparison-table.webp"
                    alt="SRT vs VTT vs TXT comparison"
                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <p className="mt-4 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Figure 2: Subtitle Format Comparison Matrix</p>
                </div>

                <div className="p-8 md:p-12 bg-blue-50 border border-blue-100 flex flex-col md:flex-row gap-8 items-center">
                  <div className="shrink-0 p-4 bg-white border border-blue-100">
                    <Sparkles className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Protocol: Pro Tip from YTVidHub</h4>
                    <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed italic">
                      "For most modern LLM fine-tuning, a clean, sequential TXT file (like our Research-Ready TXT) is superior to timestamped files. Focus on data density and semantic purity, not metadata overhead."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: RAG Application */}
            <section id="rag" className="scroll-mt-32 pt-16 border-t border-slate-100">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="border border-slate-200 p-2 bg-slate-50 shadow-2xl group">
                  <img
                    src="./image/llm-rag-data-injection.webp"
                    alt="RAG system workflow"
                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="p-4 text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Figure 3: RAG Injection Architecture</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight">
                    RAG Systems <br />Application
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    One of the most powerful applications of clean, bulk transcript data is in building robust Retrieval-Augmented Generation (RAG) systems. By feeding a large corpus into a vector database, you can provide your LLM with real-time context.
                  </p>

                  <div className="bg-slate-950 p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform">
                      <Database size={160} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black uppercase mb-4 tracking-tighter leading-none">
                        Ready to build your <br />own RAG system?
                      </h3>
                      <p className="text-slate-400 text-xs mb-8 font-medium italic">
                        Start by gathering high-quality data with a tool built for the job. No complex extraction scripts required.
                      </p>
                      <Link href="/" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all active:scale-95">
                        Get Subtitle Data <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Technical Q&A */}
            <section id="qa" className="scroll-mt-32 pt-16 border-t border-slate-900">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-12 tracking-tight">
                  Technical Q&A
                </h2>
                <div className="space-y-px bg-slate-200 border border-slate-200">
                  {[
                    {
                      q: "Why is data cleaning essential for LLMs?",
                      a: "LLMs are sensitive to 'noise' in data. Timestamps and speaker tags increase token consumption and can mislead the model's understanding of sentence structure and flow. Clean data leads to better training efficiency and model performance."
                    },
                    {
                      q: "What is the best format for fine-tuning?",
                      a: "Clean TXT is generally best for fine-tuning as it maximizes data density. For RAG systems, JSON or VTT may be preferred to maintain source traceability. The choice depends on your specific use case and pipeline requirements."
                    },
                    {
                      q: "How do you handle ASR noise in YouTube transcripts?",
                      a: "Remove timestamps, speaker labels ([MUSIC], [SPEAKER_01]), and metadata tags. Focus on preserving semantic content while eliminating formatting artifacts. Our bulk downloader automatically handles this cleaning process."
                    },
                    {
                      q: "What's the difference between SRT and clean TXT for AI training?",
                      a: "SRT files contain timestamps and formatting that increase token count without adding semantic value. Clean TXT maximizes data density and reduces noise, leading to more efficient training."
                    },
                    {
                      q: "How much data do I need for effective LLM fine-tuning?",
                      a: "It depends on your use case, but generally 10,000-100,000 high-quality examples work well for domain adaptation. YouTube provides vast amounts of conversational data across all domains."
                    },
                    {
                      q: "Can I use YouTube data for commercial AI applications?",
                      a: "Always check YouTube's terms of service and the specific video licenses. For research and educational purposes, transcript extraction is generally acceptable. For commercial use, ensure compliance with copyright laws."
                    }
                  ].map((faq, i) => (
                    <details key={i} className="group bg-white p-6">
                      <summary className="flex justify-between items-center cursor-pointer list-none select-none font-black text-xs md:text-sm uppercase tracking-widest text-slate-800">
                        <span>{faq.q}</span>
                        <ChevronRight size={16} className="text-slate-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium italic">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>

                <div className="mt-20 border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Need industrial scale?</div>
                    <Link href="/" className="text-xl font-black uppercase text-slate-900 border-b-4 border-blue-600 hover:text-blue-600 transition-colors">Bulk Workspace →</Link>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center px-6 py-3 bg-slate-50 border border-slate-100">
                      <div className="text-lg font-black text-slate-900">100%</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">UTF-8 Format</div>
                    </div>
                    <div className="text-center px-6 py-3 bg-slate-50 border border-slate-100">
                      <div className="text-lg font-black text-slate-900">BOM</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Auto-Stripped</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* === FINAL FOOTER CTA === */}
        <section className="py-24 md:py-40 border-t border-slate-100 mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-blue-50 border border-blue-100 rounded-sm mb-8">
              <Terminal size={32} className="text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 mb-10 leading-[0.9]">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Data Protocol</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Join elite research teams using clean data for the next generation of LLMs. Industrial extraction starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                onClick={handleAction}
                className="bg-slate-900 text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
              >
                Start Bulk Extraction <ArrowRight size={16} />
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader"
                className="border-2 border-slate-200 text-slate-900 px-12 py-5 text-sm font-black uppercase tracking-widest hover:border-slate-900 transition-all flex items-center justify-center gap-3"
              >
                Platform Guide <BarChart3 size={16} />
              </Link>
            </div>
            <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              Optimized for: JSONL • CSV • TXT • PARQUET
            </p>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}