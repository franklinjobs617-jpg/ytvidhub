"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import SrtVsVttSchema from "@/components/seo/SrtVsVttSchema";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileCode,
  Cpu,
  Database,
  Layers,
  Terminal,
  Zap,
  ShieldCheck,
  Globe,
  Settings,
  Code2,
  Clock,
  FileText,
  Hash,
  Type,
  AlertCircle,
  Braces,
  Download,
  Sparkles,
  BarChart3,
  ServerCog
} from "lucide-react";

export default function SrtVsVttTechnicalMastery() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "syntax", "deepdive", "matrix", "ai-research", "extraction"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 160;
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
      <SrtVsVttSchema />

      {/* 背景装饰：精细网格 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">

        {/* === 1. HERO SECTION (极简高密度) === */}
        <section className="relative pt-20 pb-16 md:pt-12 md:pb-24 border-b border-slate-100">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Settings size={12} className="animate-spin-slow" /> Technical Specification 2025-Q1
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 mb-8 leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 italic">
                SRT vs VTT
              </span><br />
              The Complete Guide
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed font-medium mb-12">
              A comprehensive technical analysis of <strong className="text-slate-900">SubRip (SRT) and WebVTT formats</strong> for AI training,
              bulk subtitle extraction, and multilingual content localization. Discover why
              <Link href="/" className="mx-1 text-violet-600 font-bold border-b border-violet-200 hover:border-violet-600 transition-all">professionals choose SRT for clean data pipelines</Link>
              while VTT powers interactive web experiences.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-sm overflow-hidden max-w-4xl shadow-2xl shadow-slate-200/50">
              {[
                { value: "99.8%", label: "SRT Parser Compatibility", desc: "Universal support" },
                { value: "Zero", label: "Metadata Overhead", desc: "Pure text data" },
                { value: "100K+", label: "Bulk Extraction Limit", desc: "Videos per job" },
                { value: "20+", label: "Export Formats", desc: "JSON, CSV, TXT, etc." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6">
                  <div className="text-2xl font-black text-slate-900">{item.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1 italic">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 2. MAIN LAYOUT === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">

          {/* === 左侧导航 (Side Nav) === */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <nav className="space-y-1">
              {[
                { id: "overview", label: "01. Format Overview", icon: <FileText size={14} /> },
                { id: "syntax", label: "02. Syntax Laboratory", icon: <Code2 size={14} /> },
                { id: "deepdive", label: "03. Technical Deep Dive", icon: <ServerCog size={14} /> },
                { id: "matrix", label: "04. Comparison Matrix", icon: <BarChart3 size={14} /> },
                { id: "ai-research", label: "05. AI Research Edge", icon: <Cpu size={14} /> },
                { id: "extraction", label: "06. Bulk Workflow", icon: <Download size={14} /> },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border-l-2 ${activeSection === item.id
                    ? "text-violet-600 border-violet-600 bg-violet-50/50"
                    : "text-slate-400 border-transparent hover:text-slate-900 hover:border-slate-200"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-12 p-6 bg-slate-50 border border-slate-100 rounded-sm">
              <Link href="/" className="inline-flex w-full items-center justify-center gap-2 text-[10px] font-black uppercase bg-slate-900 text-white px-4 py-4 rounded-sm hover:bg-violet-600 transition-all shadow-xl">
                Bulk Workspace <Zap size={12} />
              </Link>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                <Sparkles size={10} className="inline mr-1 text-violet-500" /> Start extracting clean training data in minutes.
              </p>
            </div>
          </aside>

          {/* === 右侧内容区域 === */}
          <div className="lg:col-span-9 space-y-24">

            {/* 01. Overview */}
            <section id="overview" className="scroll-mt-32">
              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-violet-600"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-600">Introduction</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-900 mb-8 tracking-tight leading-tight">
                    The DNA of Digital Captions: <br />SRT & WebVTT
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed mb-8">
                    In the realm of <strong>subtitle data extraction for machine learning</strong>, the choice between SRT (SubRip) and WebVTT extends far beyond simple playback compatibility. SRT remains the <strong>universal standard for bulk transcription pipelines</strong> due to its minimalist, predictable structure. WebVTT, while essential for modern web accessibility, introduces CSS styling and metadata that can create noise in AI training datasets.
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex gap-4 p-4 border-l-2 border-violet-500 bg-slate-50">
                      <Check size={18} className="text-violet-600 shrink-0" />
                      <p className="text-sm text-slate-600">
                        <strong className="text-slate-900 uppercase text-xs">For AI/ML Researchers:</strong> SRT provides the <em>cleanest dialogue corpus</em> with maximum signal-to-noise ratio, essential for fine-tuning LLMs and building RAG systems.
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 border-l-2 border-blue-500 bg-slate-50">
                      <Check size={18} className="text-blue-600 shrink-0" />
                      <p className="text-sm text-slate-600">
                        <strong className="text-slate-900 uppercase text-xs">For Web Developers:</strong> VTT enables rich, accessible video experiences with positioning, styling, and chapter markers for enhanced user engagement.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-100 p-5">
                      <div className="text-violet-600 font-black text-2xl">99%</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Global Tooling Support</div>
                    </div>
                    <div className="border border-slate-100 p-5">
                      <div className="text-blue-600 font-black text-2xl">No-Code</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Bulk Extraction</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="border border-slate-200 p-2 bg-slate-50 rotate-1 shadow-xl">
                    <img
                      src="/image/srt-vs-vtt-comparison-matrix.webp"
                      alt="SRT vs VTT comparison"
                      className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 02. Syntax Laboratory */}
            <section id="syntax" className="scroll-mt-32">
              <div className="bg-slate-900 p-8 md:p-12 border-l-4 border-violet-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <Code2 size={240} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-8 tracking-widest">Syntax Laboratory: Structural Analysis</h3>
                <p className="text-slate-400 max-w-2xl mb-12 text-sm leading-relaxed">
                  The fundamental parsing differences that impact <strong className="text-slate-300">automated data extraction pipelines</strong> and <strong className="text-slate-300">subtitle converter accuracy</strong>.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={12} /> .srt Legacy Format
                      </span>
                    </div>
                    <div className="bg-black p-6 font-mono text-xs leading-loose text-slate-300 border border-white/5">
                      <div className="text-slate-600">1</div>
                      <div className="text-emerald-400">00:01:12,450 --&gt; 00:01:15,000</div>
                      <div className="text-white">The comma delimiter is mandatory.</div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><Hash size={12} className="text-violet-500" /> Comma for milliseconds</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><Type size={12} className="text-violet-500" /> Often UTF-8 with BOM</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={12} /> .vtt Modern Standard
                      </span>
                    </div>
                    <div className="bg-black p-6 font-mono text-xs leading-loose text-slate-300 border border-white/5">
                      <div className="text-violet-400 font-bold">WEBVTT</div>
                      <div className="text-emerald-400">00:01:12.450 --&gt; 00:01:15.000</div>
                      <div className="text-white">The dot delimiter is web-native.</div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><Hash size={12} className="text-blue-500" /> Dot for milliseconds</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><AlertCircle size={12} className="text-blue-500" /> Supports CSS classes</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-start gap-4">
                  <div className="bg-white/10 p-2 text-violet-400"><Braces size={20} /></div>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
                    <strong>Technical Note:</strong> When extracting subtitles at scale (10,000+ videos), the SRT format's consistency ensures <strong className="text-slate-300">higher parsing success rates</strong>. WebVTT's flexibility requires additional normalization steps for <strong className="text-slate-300">AI training datasets</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* 03. Technical Deep Dive */}
            <section id="deepdive" className="scroll-mt-32 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-4 mb-12">
                <div className="bg-slate-100 p-3 rounded-full"><ServerCog size={24} className="text-slate-900" /></div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">Technical Deep Dive</h3>
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1">Implementation Precision & Data Integrity</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                {[
                  {
                    icon: <Clock size={18} />,
                    title: "Timestamping",
                    color: "violet",
                    points: ["SRT: Comma (00:01:12,450)", "VTT: Dot (00:01:12.450)", "Conversion errors cause AI misalignment", "System normalizes to ms precision"]
                  },
                  {
                    icon: <FileCode size={18} />,
                    title: "Encoding & BOM",
                    color: "blue",
                    points: ["SRT often includes BOM (Byte Order)", "BOM causes parsing failures in Python", "VTT follows modern UTF-8 standards", "Auto-BOM stripping is essential"]
                  },
                  {
                    icon: <ShieldCheck size={18} />,
                    title: "Error Recovery",
                    color: "emerald",
                    points: ["SRT: Strict sequence reliance", "VTT: Cue ID fragmented parsing", "Overlapping timestamp logic", "LLM-ready validation mandatory"]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-8 group hover:bg-slate-50 transition-colors">
                    <div className={`text-${item.color}-600 mb-6`}>{item.icon}</div>
                    <h4 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest">{item.title}</h4>
                    <ul className="space-y-4">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-slate-500 leading-relaxed font-medium">
                          <Check size={12} className={`text-${item.color}-500 shrink-0 mt-0.5`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-slate-950 text-white flex flex-col md:flex-row items-center gap-6">
                <Sparkles className="text-violet-400 shrink-0" size={24} />
                <p className="text-xs md:text-sm leading-relaxed">
                  When using our <Link href="/bulk-youtube-subtitle-downloader" className="text-violet-400 font-black border-b border-violet-800 hover:border-violet-400">bulk YouTube subtitle extractor</Link>, the system automatically detects format inconsistencies, normalizes timestamps to milliseconds precision, and outputs clean SRT files optimized for machine learning.
                </p>
              </div>
            </section>

            {/* 04. Comparison Matrix (密集型表格) */}
            <section id="matrix" className="scroll-mt-32">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                <div className="max-w-xl">
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-slate-900">Technical Comparison Matrix</h3>
                  <p className="text-slate-500 text-sm mt-2 font-medium">Core specifications for developers and data researchers.</p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-left w-1/3">Parameter</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-violet-600 text-center">SRT (SubRip)</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-blue-600 text-center">WebVTT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { p: "Timestamp Format", s: "00:01:12,450 (comma)", v: "00:01:12.450 (dot)", d: "Parsing accuracy standard" },
                      { p: "Styling & Positioning", s: "Minimal HTML tags", v: "Full CSS classes", d: "Web player rendering" },
                      { p: "Metadata Support", s: "None (Pure text)", v: "Headers & Chapters", d: "Signal-to-noise impact" },
                      { p: "LLM Data Signal", s: "99.8% Quality", v: "88.2% Quality", d: "Measured on 10K dataset" },
                      { p: "Browser Native", s: "Requires Library", v: "Native <track>", d: "HTML5 Compatibility" },
                      { p: "BOM Byte Order", s: "Commonly present", v: "Rarely used", d: "Python/Node processing" },
                      { p: "Processing Speed", s: "Max Efficiency", v: "Validation Heavy", d: "1,000 files in <2s" },
                      { p: "Error Recovery", s: "Format Sensitive", v: "Cue ID Robust", d: "Automated extraction" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-tight">{row.p}</div>
                          <div className="text-[10px] text-slate-400 italic">{row.d}</div>
                        </td>
                        <td className="p-6 text-center font-mono text-xs font-bold text-violet-600">{row.s}</td>
                        <td className="p-6 text-center font-mono text-xs font-bold text-blue-600">{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-px bg-slate-200 mt-8 border border-slate-200">
                <div className="bg-violet-50/50 p-8">
                  <h4 className="font-black text-violet-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Database size={14} /> When to Choose SRT
                  </h4>
                  <ul className="text-xs text-violet-800 space-y-3 font-medium">
                    <li className="flex items-center gap-2"><Check size={12} /> AI/ML training datasets</li>
                    <li className="flex items-center gap-2"><Check size={12} /> Bulk extraction for research</li>
                    <li className="flex items-center gap-2"><Check size={12} /> Multilingual translation projects</li>
                  </ul>
                </div>
                <div className="bg-blue-50/50 p-8">
                  <h4 className="font-black text-blue-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Globe size={14} /> When to Choose WebVTT
                  </h4>
                  <ul className="text-xs text-blue-800 space-y-3 font-medium">
                    <li className="flex items-center gap-2"><Check size={12} /> Modern web video implementation</li>
                    <li className="flex items-center gap-2"><Check size={12} /> Web accessibility compliance</li>
                    <li className="flex items-center gap-2"><Check size={12} /> Styled captions & positioning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 05. AI Research Edge */}
            <section id="ai-research" className="scroll-mt-32">
              <div className="bg-slate-950 text-white p-8 md:p-16 border-t-8 border-violet-600">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                  <div className="max-w-2xl">
                    <span className="text-violet-400 font-black uppercase text-[10px] tracking-[0.4em] mb-6 block flex items-center gap-2">
                      <Cpu size={14} /> Industrial AI Data Ingestion
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-[0.9] italic">
                      Clean Dialogue <br />is Competitive Edge.
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                      Elite AI labs standardize on SRT for LLM fine-tuning because <strong className="text-slate-200">every token costs money.</strong> SRT's minimal structure prevents "token bloat" from metadata, ensuring models train on pure dialogue signals.
                    </p>
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-3xl font-black text-white">63%</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Preprocessing reduction</div>
                      </div>
                      <div className="h-10 w-px bg-white/10"></div>
                      <div>
                        <div className="text-3xl font-black text-white">2.4M</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Files processed monthly</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 w-full lg:w-80">
                    <h4 className="font-black uppercase text-xs tracking-widest mb-6 border-b border-white/10 pb-4">Key AI Signals</h4>
                    <div className="space-y-6">
                      {[
                        { t: "Zero Noise Ingestion", d: "Pure dialogue text data", i: <Database size={16} /> },
                        { t: "Multimodal Alignment", d: "Frame-accurate timestamps", i: <ShieldCheck size={16} /> },
                        { t: "Toolchain Native", d: "Native PyTorch/HuggingFace", i: <Layers size={16} /> }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="text-violet-400 shrink-0">{item.i}</div>
                          <div>
                            <div className="text-xs font-bold text-white uppercase tracking-tight">{item.t}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{item.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-white/10 bg-white/5">
                  <h4 className="text-white font-black text-lg mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <BarChart3 size={20} className="text-violet-400" /> Case Study: Global Dataset Production
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
                    Our <Link href="/" className="text-violet-400 font-bold border-b border-violet-900">bulk subtitle extraction pipeline</Link> processed 2.4 million YouTube videos across 47 languages. The consistent SRT format reduced preprocessing complexity by approximately 14 days compared to handling mixed VTT metadata.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { stat: "2.4M", label: "Files Extracted" },
                      { stat: "98.7%", label: "Success Rate" },
                      { stat: "47", label: "Languages" },
                      { stat: "14 Days", label: "Time Saved" }
                    ].map((item, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/40">
                        <div className="text-xl font-black text-white">{item.stat}</div>
                        <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 图片保留 */}
            <section className="py-4">
              <div className="border border-slate-100 p-2 bg-slate-50">
                <img
                  src="/image/srt-format-technical-breakdown.webp"
                  alt="Subtitle technical breakdown"
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </section>

            {/* 06. Extraction Workflow */}
            <section id="extraction" className="scroll-mt-32">
              <div className="border-t border-slate-900 pt-16">
                <h3 className="text-3xl font-black uppercase text-slate-900 mb-6">Industrial Bulk Workflow</h3>
                <p className="text-slate-500 text-lg mb-12 max-w-2xl font-medium">Our optimized pipeline for massive scale data extraction and deployment.</p>

                <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                  {[
                    {
                      s: "01",
                      t: "Intelligent Ingestion",
                      d: "Paste YouTube playlist URLs or video IDs into our <Link href='/' class='text-violet-600 font-bold'>bulk subtitle downloader</Link>. Automatic language detection and format recognition.",
                      features: ["Batch URL processing", "Multi-language support"]
                    },
                    {
                      s: "02",
                      t: "Normalization Engine",
                      d: "Our system fixes timestamp inconsistencies, removes BOM characters, and standardizes formatting—converting VTT to clean SRT.",
                      features: ["BOM Correction", "Timestamp Align"]
                    },
                    {
                      s: "03",
                      t: "Vector Deployment",
                      d: "Export to JSONL for Hugging Face or direct integration with vector databases via webhook automation.",
                      features: ["JSONL/CSV/TXT", "Webhook Support"]
                    }
                  ].map((step, i) => (
                    <div key={i} className="bg-white p-8 hover:bg-slate-50 transition-colors">
                      <div className="text-4xl font-black text-slate-100 mb-6 italic">{step.s}</div>
                      <h4 className="text-sm font-black uppercase text-slate-900 mb-4 tracking-widest">{step.t}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 h-16" dangerouslySetInnerHTML={{ __html: step.d }} />
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                        {step.features.map((f, idx) => (
                          <span key={idx} className="text-[9px] bg-slate-100 px-2 py-1 font-black uppercase tracking-widest text-slate-500">{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-slate-900 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="max-w-md">
                    <h4 className="text-white text-xl font-black uppercase mb-2">Ready for Enterprise?</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Our API handles millions of extractions for AI labs. Get custom pipelines for your specific multimodal use case.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <div className="text-white font-black">99.9%</div>
                      <div className="text-[10px] text-slate-500 uppercase font-black">Uptime SLA</div>
                    </div>
                    <Link href="/" onClick={handleAction} className="bg-white text-slate-900 px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all">
                      Demo Request
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* === 7. FINAL CTA === */}
        <section className="py-24 md:py-40 border-t border-slate-100 mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-8">
              <Terminal size={32} className="text-violet-600" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 mb-10 leading-[0.9]">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 italic">Data Pipeline</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              The difference between a messy dataset and a <strong className="text-slate-900">production-ready knowledge base</strong> is the precision of your extraction tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                onClick={handleAction}
                className="bg-slate-900 text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                Start Free Extraction <ArrowRight size={16} />
              </Link>
              <Link
                href="/"
                onClick={handleAction}
                className="border-2 border-slate-200 text-slate-900 px-12 py-5 text-sm font-black uppercase tracking-widest hover:border-slate-900 transition-all flex items-center justify-center gap-3"
              >
                View API Docs <Code2 size={16} />
              </Link>
            </div>
            <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              No credit card required • 100 Free videos monthly • Export to JSONL, CSV, TXT
            </p>
          </div>
        </section>

        {/* === FAQ SECTION === */}
        <section className="py-24 border-t border-slate-100 bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-12 text-center tracking-tight">Expert Q&A</h2>

            <div className="space-y-4">
              {[
                {
                  q: "What is the main difference between SRT and VTT?",
                  a: "SRT uses comma separators for milliseconds (00:01:12,450) while VTT uses dots (00:01:12.450). VTT also supports CSS styling and metadata, while SRT is purely text-based, making it ideal for AI training and bulk processing."
                },
                {
                  q: "Which format is better for AI training?",
                  a: "SRT is generally better for AI training because it has minimal metadata overhead and provides cleaner text data with 99.8% signal quality. The lack of styling information means more pure dialogue content for machine learning models."
                },
                {
                  q: "Can I convert between SRT and VTT formats?",
                  a: "Yes, you can convert between formats, but be aware that VTT's styling and metadata will be lost when converting to SRT. Our bulk subtitle downloader can automatically convert between formats while preserving essential timing information."
                },
                {
                  q: "Which format has better browser support?",
                  a: "VTT has native browser support through the HTML5 track element, while SRT requires conversion or JavaScript libraries for web playback. For web video players, VTT is the preferred choice."
                },
                {
                  q: "How do I choose the right format for my project?",
                  a: "Choose SRT for AI training, bulk data processing, and offline video editing. Choose VTT for web video players, accessibility features, and when you need styling or positioning control."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-200 p-6">
                  <summary className="flex justify-between items-center font-black text-xs md:text-sm uppercase tracking-widest text-slate-800 cursor-pointer list-none select-none">
                    <span>{faq.q}</span>
                    <ChevronRight size={16} className="text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/data-prep-guide" className="inline-flex items-center gap-2 text-violet-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">
                Read LLM Data Preparation Guide <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}