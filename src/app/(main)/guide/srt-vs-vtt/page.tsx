"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
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
  Monitor, 
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
          // Adjust offset for better active section detection, especially on mobile
          const offset = window.innerHeight * 0.3; 
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 }, // Adjust amount for earlier trigger
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans selection:bg-violet-100 text-slate-900 antialiased overflow-x-hidden">
      {/* === 背景纹理：极致高级感 === */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <main className="relative z-10">
        {/* === 1. HERO SECTION (密集排版) === */}
        <section className="relative pt-24 pb-12 md:pt-10 md:pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-8 shadow-2xl">
              <Settings size={12} className="animate-spin-slow" /> Advanced Technical Specification 2025
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 mb-6 md:mb-8 leading-[1.0] md:leading-[0.9]">
              Subtitle Data Standards: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 italic">
                SRT vs VTT
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium mb-8 md:mb-12">
              A comprehensive technical analysis of <strong className="text-slate-900">SubRip (SRT) and WebVTT formats</strong> for AI training, 
              bulk subtitle extraction, and multilingual content localization. Discover why 
              <Link href="/" className="mx-1 text-violet-600 font-bold border-b-2 border-violet-100 hover:border-violet-600 transition-all">professionals choose SRT for clean data pipelines</Link> 
              while VTT powers interactive web experiences.
            </p>
            
            {/* 新增：关键数据指标展示 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8 md:mt-16">
              {[
                { value: "99.8%", label: "SRT Parser Compatibility", desc: "Universal support" },
                { value: "Zero", label: "Metadata Overhead", desc: "Pure text data" },
                { value: "100K+", label: "Bulk Extraction Limit", desc: "Videos per job" },
                { value: "20+", label: "Export Formats", desc: "JSON, CSV, TXT, etc." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="text-xl sm:text-2xl font-black text-slate-900">{item.value}</div>
                  <div className="text-xs font-bold text-slate-700 mt-1">{item.label}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === 2. MAIN LAYOUT (TOC + CONTENT) === */}
        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* === 左侧：高质感导航 === */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit"> {/* Adjusted top for sticky */}
                <div className="border-l border-slate-200 pl-6 space-y-6">
                  {[
                    { id: "overview", label: "01. Format Overview", icon: <FileText size={12} /> },
                    { id: "syntax", label: "02. Syntax Laboratory", icon: <Code2 size={12} /> },
                    { id: "deepdive", label: "03. Technical Deep Dive", icon: <ServerCog size={12} /> },
                    { id: "matrix", label: "04. Comparison Matrix", icon: <BarChart3 size={12} /> },
                    { id: "ai-research", label: "05. AI Research Edge", icon: <Cpu size={12} /> },
                    { id: "extraction", label: "06. Bulk Workflow", icon: <Download size={12} /> },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all group ${
                        activeSection === item.id 
                          ? "text-violet-600 translate-x-2" 
                          : "text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      <span className={`transition-transform ${activeSection === item.id ? 'scale-110' : ''}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                      <ChevronRight size={10} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === item.id ? 'opacity-100' : ''}`} />
                    </a>
                  ))}
                  <div className="pt-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-violet-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                      Go to Bulk Workspace <Zap size={10} />
                    </Link>
                    <p className="text-[10px] text-slate-400 mt-3 max-w-[180px]">
                      <Sparkles size={8} className="inline mr-1" /> Start extracting clean training data in minutes
                    </p>
                  </div>
                </div>
              </aside>

              {/* === 右侧：密集型内容区域 === */}
              <div className="lg:col-span-9 space-y-20 md:space-y-24">
                
                {/* 01. Overview - 扩充版 */}
                <section id="overview" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-slate-900 mb-4 md:mb-6 tracking-tight">
                        The DNA of Digital Captions: SRT & VTT
                      </h2>
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 md:mb-6">
                        In the realm of <strong>subtitle data extraction for machine learning</strong>, the choice between SRT (SubRip) and WebVTT extends far beyond simple playback compatibility. SRT remains the <strong>universal standard for bulk transcription pipelines</strong> due to its minimalist, predictable structure. WebVTT, while essential for modern web accessibility, introduces CSS styling and metadata that can create noise in AI training datasets.
                      </p>
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <div className="flex items-start gap-3">
                          <div className="bg-violet-100 p-1.5 rounded-lg mt-0.5">
                            <Check size={14} className="text-violet-600" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600">
                            <strong className="text-slate-900">For AI/ML Researchers:</strong> SRT provides the <em>cleanest dialogue corpus</em> with maximum signal-to-noise ratio, essential for fine-tuning LLMs and building RAG systems.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-1.5 rounded-lg mt-0.5">
                            <Check size={14} className="text-blue-600" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600">
                            <strong className="text-slate-900">For Web Developers:</strong> VTT enables rich, accessible video experiences with positioning, styling, and chapter markers for enhanced user engagement.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex-1">
                           <div className="text-violet-600 font-black text-xl mb-1">99%</div>
                           <div className="text-[10px] text-slate-400 uppercase font-black">Global Tool Compatibility</div>
                           <div className="text-[9px] text-slate-500 mt-1">FFmpeg, Python, Node.js</div>
                        </div>
                        <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex-1">
                           <div className="text-blue-600 font-black text-xl mb-1">No-Code</div>
                           <div className="text-[10px] text-slate-400 uppercase font-black">Bulk Extraction</div>
                           <div className="text-[9px] text-slate-500 mt-1">YouTube, Vimeo, Udemy</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl md:shadow-2xl group aspect-video"> {/* Added aspect-video */}
                       <img
                        src="/image/srt-vs-vtt-comparison-matrix.webp"
                        alt="Detailed technical breakdown of subtitle file formats showing timestamp precision and structure."
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" // object-cover
                       />
                    </div>
                  </div>
                </section>

                {/* 02. Syntax Laboratory (增强版) */}
                <section id="syntax" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5"><Code2 size={120} className="md:w-[200px] md:h-[200px]" /></div> {/* Responsive icon size */}
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-8 md:mb-12 text-center tracking-widest">Syntax Laboratory: Core Structural Differences</h3>
                    <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 text-sm">
                      The fundamental parsing differences that impact <strong className="text-slate-300">automated data extraction pipelines</strong> and <strong className="text-slate-300">subtitle converter accuracy</strong>.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8 md:mb-12">
                       <div className="space-y-4 md:space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-lg flex items-center gap-2">
                              <FileText size={10} /> Legacy Standard (SRT)
                            </span>
                            <span className="text-xs text-slate-500 font-mono">.srt extension</span>
                          </div>
                          <div className="p-4 md:p-6 bg-black/40 rounded-xl md:rounded-2xl border border-white/5 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">1</span> <span className="text-blue-400">1</span></div>
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">2</span> <span className="text-emerald-400">00:01:12,450 --&gt; 00:01:15,000</span></div>
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">3</span> <span className="text-white font-bold">The comma delimiter is mandatory.</span></div>
                            <div className="flex gap-4"><span className="text-slate-600 min-w-[20px]">4</span> <span className="text-slate-400">(Optional blank line)</span></div>
                          </div>
                          <div className="text-xs text-slate-500 space-y-2 pl-2">
                            <div className="flex items-center gap-2"><Hash size={10} /> <strong>Key Characteristic:</strong> Comma for milliseconds (00:01:12,450)</div>
                            <div className="flex items-center gap-2"><Type size={10} /> <strong>Encoding:</strong> Often UTF-8 with BOM</div>
                            <div className="flex items-center gap-2"><AlertCircle size={10} /> <strong>Parsing Challenge:</strong> Locale-dependent comma/dot confusion</div>
                          </div>
                       </div>
                       
                       <div className="space-y-4 md:space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] sm:text-[10px] font-black text-violet-400 uppercase tracking-widest px-3 py-1.5 bg-violet-400/10 rounded-lg flex items-center gap-2">
                              <Globe size={10} /> Modern Protocol (WebVTT)
                            </span>
                            <span className="text-xs text-slate-500 font-mono">.vtt extension</span>
                          </div>
                          <div className="p-4 md:p-6 bg-black/40 rounded-xl md:rounded-2xl border border-white/5 font-mono text-xs md:text-sm leading-relaxed text-slate-300">
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">1</span> <span className="text-violet-400 font-bold">WEBVTT</span></div>
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">2</span> <span className="text-slate-400 italic">Optional header metadata</span></div>
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">3</span> <span className="text-blue-400 font-bold">00:01:12.450 --&gt; 00:01:15.000</span></div>
                            <div className="flex gap-4 mb-2"><span className="text-slate-600 min-w-[20px]">4</span> <span className="text-white font-bold">The dot delimiter is web-native.</span></div>
                          </div>
                          <div className="text-xs text-slate-500 space-y-2 pl-2">
                            <div className="flex items-center gap-2"><Hash size={10} /> <strong>Key Characteristic:</strong> Dot for milliseconds (00:01:12.450)</div>
                            <div className="flex items-center gap-2"><Type size={10} /> <strong>Encoding:</strong> UTF-8 (BOM optional)</div>
                            <div className="flex items-center gap-2"><AlertCircle size={10} /> <strong>Parsing Challenge:</strong> Complex cue settings with CSS classes</div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="bg-black/60 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
                      <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2"><Braces size={14} /> Technical Note: Bulk Processing Implications</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        When extracting subtitles at scale (10,000+ videos), the SRT format's consistency ensures <strong className="text-slate-300">higher parsing success rates</strong> across mixed content sources. WebVTT's flexibility requires additional normalization steps to ensure clean data for <strong className="text-slate-300">AI training datasets</strong>.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 03. NEW: Technical Deep Dive Section */}
                <section id="deepdive" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <motion.div {...fadeInUp} className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 md:mb-8">
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl">
                        <ServerCog size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-slate-900">Technical Deep Dive: Precision & Parsing</h3>
                        <p className="text-slate-500 text-sm">Critical implementation details for developers and data engineers</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                      {[
                        {
                          icon: <Clock size={20} />,
                          title: "Timestamp Precision",
                          color: "violet",
                          points: [
                            "SRT uses commas (00:01:12,450) - European standard",
                            "VTT uses dots (00:01:12.450) - Web/ISO standard",
                            "Conversion errors cause misalignment in AI training data",
                            "Our bulk processor normalizes to milliseconds automatically"
                          ]
                        },
                        {
                          icon: <FileCode size={20} />,
                          title: "File Encoding & BOM",
                          color: "blue",
                          points: [
                            "SRT files often include Byte Order Mark (BOM)",
                            "BOM causes parsing failures in some programming languages",
                            "VTT follows modern UTF-8 without BOM standards",
                            "Automated BOM stripping is essential for clean datasets"
                          ]
                        },
                        {
                          icon: <ShieldCheck size={20} />,
                          title: "Error Recovery & Validation",
                          color: "emerald",
                          points: [
                            "SRT has minimal error recovery (strict sequence)",
                            "VTT supports fragmented parsing with cue IDs",
                            "Overlapping timestamps handled differently",
                            "Our validation ensures LLM-ready subtitle quality"
                          ]
                        }
                      ].map((item, index) => (
                        <div key={index} className={`border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 hover:shadow-md transition-shadow ${index === 0 ? 'md:col-span-2' : ''}`}>
                          <div className={`bg-${item.color}-100 text-${item.color}-600 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4`}>
                            {item.icon}
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-4">{item.title}</h4>
                          <ul className="space-y-3">
                            {item.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className={`bg-${item.color}-100 text-${item.color}-600 rounded-full p-0.5 mt-0.5`}>
                                  <Check size={10} />
                                </div>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 md:mt-12 p-4 md:p-6 bg-slate-50/80 rounded-xl md:rounded-2xl border border-slate-200">
                      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Sparkles size={16} className="text-violet-600" />
                        Practical Application: Bulk YouTube Subtitle Downloader
                      </h4>
                      <p className="text-slate-600 text-sm">
                        When using our <Link href="/" className="text-violet-600 font-bold">bulk YouTube subtitle extractor</Link>, the system automatically detects format inconsistencies, normalizes timestamps to milliseconds precision, and outputs clean, standardized SRT files optimized for <strong>machine learning pipelines</strong> and <strong>multilingual translation projects</strong>.
                      </p>
                    </div>
                  </motion.div>
                </section>

                {/* 04. Matrix Table (优化版) */}
                <section id="matrix" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <motion.div {...fadeInUp} className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-slate-900">Technical Comparison Matrix</h3>
                        <p className="text-slate-500 mt-2">Decision framework for technical teams and researchers</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mt-4 md:mt-0">
                        <div className="bg-violet-100 text-violet-600 px-2 py-1 rounded">SRT</div>
                        <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded">VTT</div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto border border-slate-100 rounded-2xl md:rounded-3xl shadow-sm"> {/* overflow-x-auto for mobile table */}
                      <table className="w-full min-w-[700px] text-left"> {/* min-w to prevent squishing */}
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="p-4 md:p-8 font-black text-xs uppercase text-slate-500 text-left w-1/3">Technical Parameter</th>
                            <th className="p-4 md:p-8 font-black text-xs uppercase text-violet-600 text-center">SRT (SubRip)</th>
                            <th className="p-4 md:p-8 font-black text-xs uppercase text-blue-600 text-center">WebVTT</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {[
                            { 
                              p: "Timestamp Format", 
                              s: "00:01:12,450 (comma)", 
                              v: "00:01:12.450 (dot)", 
                              detail: "Critical for parsing accuracy in bulk operations"
                            },
                            { 
                              p: "Styling & Positioning", 
                              s: "Basic HTML tags only", 
                              v: "Full CSS classes & vertical text", 
                              detail: "VTT enables complex web video player experiences"
                            },
                            { 
                              p: "Metadata Support", 
                              s: "None (pure subtitle text)", 
                              v: "Headers, comments, chapters", 
                              detail: "SRT preferred for clean AI training data extraction"
                            },
                            { 
                              p: "LLM Data Signal Quality", 
                              s: "99.8% (minimal noise)", 
                              v: "88.2% (metadata overhead)", 
                              detail: "Measured on 10,000 video transcript dataset"
                            },
                            { 
                              p: "Browser Native Support", 
                              s: "Requires conversion", 
                              v: "Direct <track> element support", 
                              detail: "VTT is built for modern web video implementation"
                            },
                            { 
                              p: "BOM (Byte Order Mark)", 
                              s: "Common (UTF-8 with BOM)", 
                              v: "Rare (UTF-8 without BOM)", 
                              detail: "SRT BOM causes parsing issues in Python/Node.js"
                            },
                            { 
                              p: "Bulk Processing Speed", 
                              s: "Faster (simple parsing)", 
                              v: "Slower (complex validation)", 
                              detail: "Our infrastructure processes 1,000 SRT files in <2s"
                            },
                            { 
                              p: "Error Recovery", 
                              s: "Poor (fails on format break)", 
                              v: "Good (skips invalid cues)", 
                              detail: "Important for automated subtitle extraction pipelines"
                            }
                          ].map((row, i) => (
                            <tr key={i} className={`border-b border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                              <td className="p-4 md:p-8">
                                <div className="font-bold text-slate-900">{row.p}</div>
                                <div className="text-xs text-slate-500 mt-1 max-w-[250px]">{row.detail}</div>
                              </td>
                              <td className="p-4 md:p-8 text-center">
                                <div className={`font-mono ${row.p.includes('Quality') || row.p.includes('Speed') ? 'font-black text-violet-700' : ''}`}>
                                  {row.s}
                                </div>
                              </td>
                              <td className="p-4 md:p-8 text-center">
                                <div className={`font-mono ${row.p.includes('Quality') || row.p.includes('Speed') ? 'font-black text-blue-700' : ''}`}>
                                  {row.v}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-6">
                      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                        <h4 className="font-black text-violet-900 mb-3 flex items-center gap-2">
                          <Database size={16} /> When to Choose SRT Format
                        </h4>
                        <ul className="text-sm text-violet-800 space-y-2">
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Building AI/ML training datasets</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Bulk extraction for research (10,000+ files)</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Multilingual translation pipelines</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Legacy system compatibility</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h4 className="font-black text-blue-900 mb-3 flex items-center gap-2">
                          <Globe size={16} /> When to Choose WebVTT Format
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-2">
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Modern web video player implementation</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Accessibility requirements (screen readers)</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Interactive video experiences</li>
                          <li className="flex items-start gap-2"><Check size={14} className="mt-0.5" /> Styled captions with positioning</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 05. AI Research (扩充版) */}
                <section id="ai-research" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <motion.div {...fadeInUp} className="bg-[#0a0c10] rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 animate-pulse"><Cpu size={200} className="md:w-[300px] md:h-[300px]" /></div> {/* Responsive icon size */}
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16">
                        <div className="max-w-2xl">
                          <span className="inline-flex items-center gap-2 text-violet-400 font-black uppercase text-[10px] tracking-[0.5em] mb-4 md:mb-6">
                            <Cpu size={16} /> AI/ML Signal Architecture
                          </span>
                          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase mb-4 md:mb-6 italic leading-tight md:leading-none">
                            The Researcher's <br />Choice for Clean Data.
                          </h2>
                          <p className="text-slate-400 text-base md:text-xl leading-relaxed">
                            Elite AI labs standardize on SRT for LLM fine-tuning because <strong className="text-slate-300">every token costs money.</strong> SRT's minimal structure prevents "token bloat" from metadata, ensuring models train on pure dialogue signals.
                          </p>
                        </div>
                        <div className="mt-8 md:mt-0 bg-white/5 border border-white/10 rounded-2xl p-6 min-w-[240px] md:min-w-[280px]">
                          <div className="text-3xl md:text-4xl font-black text-white mb-2">63%</div>
                          <div className="text-sm text-slate-300">Reduction in preprocessing time</div>
                          <div className="text-xs text-slate-500 mt-2">When using SRT vs VTT for 10K video dataset</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                        {[
                          {
                            icon: <Database className="text-violet-400" size={24} />,
                            title: "Zero Noise Ingestion",
                            description: "SRT files contain only dialogue and timestamps—no CSS, styling, or metadata to filter out before training.",
                            points: ["Direct JSONL conversion", "Parquet dataset ready", "No regex cleaning needed"]
                          },
                          {
                            icon: <ShieldCheck className="text-blue-400" size={24} />,
                            title: "Validation & Grounding",
                            description: "Precise timestamps enable automated alignment with source video for multimodal training and RAG systems.",
                            points: ["Frame-accurate retrieval", "Cross-modal alignment", "Truth grounding pipelines"]
                          },
                          {
                            icon: <Layers className="text-emerald-400" size={24} />,
                            title: "Toolchain Compatibility",
                            description: "Every major ML library and data processing tool has native or well-tested SRT parsing support.",
                            points: ["Hugging Face Datasets", "TensorFlow Data", "PyTorch Iterable"]
                          }
                        ].map((item, index) => (
                          <div key={index} className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/[0.08] transition-all group">
                            <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-6 font-medium">{item.description}</p>
                            <ul className="space-y-2">
                              {item.points.map((point, idx) => (
                                <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                                  <div className="bg-white/10 rounded-full p-0.5">
                                    <Check size={10} />
                                  </div>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-black/40 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
                        <h4 className="text-white font-black text-lg md:text-xl mb-4 md:mb-6 flex items-center gap-3">
                          <BarChart3 size={20} /> Case Study: Large-Scale Multilingual Dataset
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {[
                            { stat: "2.4M", label: "SRT files processed" },
                            { stat: "98.7%", label: "Parsing success rate" },
                            { stat: "47", label: "Languages extracted" },
                            { stat: "14 days", label: "Time saved vs VTT" }
                          ].map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="text-2xl md:text-3xl font-black text-white mb-1">{item.stat}</div>
                              <div className="text-xs text-slate-400">{item.label}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-slate-400 text-sm mt-6">
                          Our <Link href="/" className="text-violet-400 font-bold underline decoration-violet-400/30">bulk subtitle extraction pipeline</Link> processed 2.4 million YouTube videos across 47 languages. The consistent SRT format reduced preprocessing complexity by approximately 14 days compared to handling mixed VTT files with varying metadata structures.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* 06. 原有图片 2 保留 */}
                <section className="py-8 md:py-12">
                  <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl md:shadow-2xl relative group aspect-video"> {/* Added aspect-video */}
                    <img 
                      src="/image/srt-format-technical-breakdown.webp" 
                      alt="Comprehensive technical matrix comparing subtitle standards for AI training and web development." 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" // object-cover
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      Technical Decision Framework: SRT vs VTT
                    </div>
                  </div>
                </section>

                {/* 07. Extraction (增强版) */}
                <section id="extraction" className="scroll-mt-28 md:scroll-mt-32"> {/* Adjusted scroll-mt */}
                  <motion.div {...fadeInUp} className="bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100">
                    <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-slate-900 mb-4">
                      Industrial Bulk Extraction Workflow
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl">
                      Our optimized pipeline for extracting, normalizing, and deploying clean subtitle data at any scale. Used by AI research teams and localization companies worldwide.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                      {[
                        { 
                          s: "01", 
                          t: "Intelligent Ingestion", 
                          d: "Paste YouTube playlist URLs or video IDs into our <Link href='/' class='text-violet-600 font-bold underline decoration-violet-100'>bulk subtitle downloader</Link>. Automatic language detection and format recognition.", 
                          icon: <Download size={20} />,
                          features: ["Batch URL processing", "Multi-language support", "Auto-format detection"]
                        },
                        { 
                          s: "02", 
                          t: "Normalization Engine", 
                          d: "Our system fixes timestamp inconsistencies, removes BOM characters, and standardizes formatting—converting VTT to clean SRT when optimal for data pipelines.", 
                          icon: <Settings size={20} />,
                          features: ["Timestamp normalization", "Encoding correction", "VTT-to-SRT conversion"]
                        },
                        { 
                          s: "03", 
                          t: "Deployment Ready", 
                          d: "Export to JSONL for Hugging Face, CSV for analysis, or direct integration with vector databases. Webhook support for automated pipeline triggers.", 
                          icon: <Terminal size={20} />,
                          features: ["JSONL/CSV export", "Vector DB ready", "Webhook automation"]
                        }
                      ].map((step, i) => (
                        <div key={i} className="p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4 md:mb-6">
                            <span className="text-4xl md:text-5xl font-display font-black text-slate-100 italic">{step.s}</span>
                            <div className="bg-slate-100 text-slate-700 p-3 rounded-xl">
                              {step.icon}
                            </div>
                          </div>
                          <h4 className="text-lg md:text-xl font-black uppercase mb-3 md:mb-4 text-slate-900">{step.t}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 md:mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: step.d }} />
                          <div className="pt-4 md:pt-6 border-t border-slate-100">
                            <div className="text-xs font-bold text-slate-500 mb-3">KEY FEATURES</div>
                            <div className="flex flex-wrap gap-2">
                              {step.features.map((feature, idx) => (
                                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-slate-900 text-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h4 className="text-xl md:text-2xl font-black mb-4">Ready for Enterprise Scale?</h4>
                          <p className="text-slate-300 text-sm mb-6">
                            Our API handles millions of subtitle extractions monthly for AI labs, localization firms, and content platforms. Get custom pipelines for your specific use case.
                          </p>
                          <Link 
                            href="/" 
                            onClick={handleAction}
                            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-black py-2.5 px-5 rounded-2xl transition-all text-sm"
                          >
                            Request Enterprise Demo <ArrowRight size={16} />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center mt-8 md:mt-0">
                          {[
                            { value: "10M+", label: "Monthly Extractions" },
                            { value: "99.9%", label: "Uptime SLA" },
                            { value: "<100ms", label: "API Response" },
                            { value: "24/7", label: "Support" }
                          ].map((item, idx) => (
                            <div key={idx} className="bg-white/10 p-4 rounded-2xl">
                              <div className="text-xl font-black">{item.value}</div>
                              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

              </div>
            </div>
          </div>
        </section>

        {/* === 8. FINAL CTA (增强版) === */}
        <section className="py-20 md:py-40 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              {...fadeInUp}
              className="max-w-5xl mx-auto rounded-[3rem] md:rounded-[5rem] bg-gradient-to-br from-slate-900 to-black border border-slate-800 p-8 md:p-24 text-center shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] md:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 md:p-24 opacity-[0.03] pointer-events-none"><Zap size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <div className="absolute bottom-0 left-0 p-12 md:p-24 opacity-[0.02] pointer-events-none"><Cpu size={200} className="md:w-[400px] md:h-[400px]" /></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 md:mb-10 shadow-2xl">
                  <Terminal size={32} className="md:w-[40px] md:h-[40px]" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter text-white mb-6 md:mb-8 leading-tight md:leading-[0.9]">
                  Master Your <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 italic">
                    Data Pipeline
                  </span>
                </h2>
                <p className="text-slate-300 text-base md:text-xl mb-10 md:mb-12 max-w-xl mx-auto font-medium">
                  The difference between a messy dataset and a <strong className="text-white">production-ready knowledge base</strong> is the precision of your extraction tool. Experience industrial-scale subtitle processing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    href="/" 
                    onClick={handleAction}
                    className="group inline-flex items-center gap-3 md:gap-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-black py-4 px-8 md:py-6 md:px-16 rounded-[2rem] md:rounded-[2.5rem] transition-all hover:-translate-y-2 shadow-xl md:shadow-2xl active:scale-95 uppercase text-sm tracking-[0.2em] md:tracking-[0.3em]"
                  >
                    Start Free Bulk Extract 
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link 
                    href="/" 
                    onClick={handleAction}
                    className="group inline-flex items-center gap-2 text-white/80 hover:text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-[2rem] md:rounded-[2.5rem] transition-all border border-white/20 hover:border-white/40 text-sm"
                  >
                    View API Documentation
                    <Code2 size={14} />
                  </Link>
                </div>
                
                <p className="text-slate-500 text-xs mt-8 md:mt-10 max-w-md mx-auto">
                  <Sparkles size={10} className="inline mr-2" />
                  No credit card required • Process 100 videos free • Export to JSONL, CSV, or TXT
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}