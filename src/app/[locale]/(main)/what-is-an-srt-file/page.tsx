"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  FileCode,
  Clock,
  Code,
  Download,
  FileText,
  Video,
  Globe,
  Settings,
  Cpu,
  Database,
  Zap,
  Terminal,
  ArrowRight,
  HelpCircle,
  Hash,
  Type,
  Braces,
  Layers,
  Sparkles,
  BarChart3,
  ServerCog,
} from "lucide-react";

export default function SrtFileGuidePage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const [activeSection, setActiveSection] = useState("anatomy");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtns(window.scrollY > 300);

      const sections = [
        "anatomy",
        "interactive",
        "advanced-formatting",
        "comparison",
        "conversion",
        "editing",
        "ai-use-cases",
        "faq",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
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
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <title>SRT File Format: Timestamp Rules, Syntax & Examples (2026 Guide)</title>
      <meta
        name="description"
        content="HH:MM:SS,ms --> HH:MM:SS,ms. The complete guide to SRT syntax: correct timestamp formatting (comma vs dot), sequence numbering rules, and blank line requirements."
      />
      <meta
        name="keywords"
        content="srt timestamp format, srt syntax rules, srt comma milliseconds, srt file structure, srt timecode format, create srt file"
      />
      <link rel="canonical" href="https://ytvidhub.com/what-is-an-srt-file/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the correct SRT timestamp format?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The standard format is HH:MM:SS,ms (Hours:Minutes:Seconds,Milliseconds). Note that SRT uses a COMMA (,) separator for milliseconds, not a dot. Example: 00:01:23,456'
                }
              },
              {
                '@type': 'Question',
                name: 'Does SRT use commas or dots?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SRT (SubRip) files strictly use a COMMA (,) to separate seconds from milliseconds. WebVTT (.vtt) files use a DOT (.). Mixing these up is the most common cause of parsing errors.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the rules for SRT files?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A valid SRT block must have 4 parts: 1. A numeric counter (1, 2, 3...) 2. Start and End time separated by "-->" 3. Subtitle text 4. A mandatory blank line after the text.'
                }
              }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'SRT File Format: Timestamp Rules, Syntax & Examples (2026 Guide)',
            description: 'The definitive guide to SRT structure: HH:MM:SS,ms timestamp format, sequence rules, and common formatting errors.',
            author: {
              '@type': 'Organization',
              name: 'YTVidHub',
            },
            datePublished: '2026-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            publisher: {
              '@type': 'Organization',
              name: 'YTVidHub',
              logo: {
                '@type': 'ImageObject',
                url: 'https://ytvidhub.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://ytvidhub.com/what-is-an-srt-file',
            },
          }),
        }}
      />
      <main>
        {/* === 1. ENHANCED HERO SECTION === */}
        <section className="relative pt-24 pb-0 md:pt-10 md:pb-0 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                <FileText size={12} /> Technical Specification
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              SRT File Format: <br />
              <span className="text-blue-600">Timestamp Syntax & Rules</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Need the exact <strong>syntax for SRT files</strong>?
              This reference guide covers correct timestamp formatting (<code>HH:MM:SS,ms</code>),
              sequence numbering, and required line breaks.
            </p>
            <div className="flex flex-col items-center gap-2 mt-2 mb-4">
              <Link
                href="/"
                onClick={handleAction}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
              >
                <Download size={16} />
                Extract SRT from YouTube — Free
              </Link>
              <span className="text-xs text-slate-400">No credit card · 5 free downloads</span>
            </div>

            {/* 新增：SEO特性展示 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
              {[
                {
                  value: "99.9%",
                  label: "Video Player Support",
                  desc: "VLC, QuickTime, Windows Media",
                },
                {
                  value: "UTF-8",
                  label: "Encoding Standard",
                  desc: "Universal character support",
                },
                {
                  value: "Zero Cost",
                  label: "Open Format",
                  desc: "No licensing fees",
                },
                {
                  value: "1ms",
                  label: "Timestamp Precision",
                  desc: "Frame-accurate synchronization",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="text-lg font-black text-slate-900">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === 2. MAIN LAYOUT WITH SIDEBAR === */}
        <section className="py-10 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Enhanced Sidebar (TOC) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-32">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pl-4 border-l-4 border-blue-600 flex items-center gap-2">
                    <FileText size={12} /> Table of Contents
                  </p>
                  <nav className="flex flex-col space-y-2">
                    {[
                      {
                        id: "anatomy",
                        label: "1. SRT File Anatomy",
                        icon: <Code size={12} />,
                      },
                      {
                        id: "interactive",
                        label: "2. Syntax Breakdown",
                        icon: <Braces size={12} />,
                      },
                      {
                        id: "advanced-formatting",
                        label: "3. Advanced Formatting",
                        icon: <Settings size={12} />,
                      },
                      {
                        id: "comparison",
                        label: "4. SRT vs VTT vs TXT",
                        icon: <BarChart3 size={12} />,
                      },
                      {
                        id: "conversion",
                        label: "5. Format Conversion",
                        icon: <Layers size={12} />,
                      },
                      {
                        id: "editing",
                        label: "6. Editing Tools",
                        icon: <FileCode size={12} />,
                      },
                      {
                        id: "ai-use-cases",
                        label: "7. AI Research Use",
                        icon: <Cpu size={12} />,
                      },
                      {
                        id: "faq",
                        label: "8. SRT FAQ",
                        icon: <HelpCircle size={12} />,
                      },
                    ].map((cat) => (
                      <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${activeSection === cat.id
                          ? "bg-blue-50 text-blue-600 translate-x-2"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                      >
                        <span
                          className={`transition-transform ${activeSection === cat.id ? "scale-110" : ""
                            }`}
                        >
                          {cat.icon}
                        </span>
                        <span>{cat.label}</span>
                        <ChevronRight
                          size={12}
                          className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === cat.id ? "opacity-100" : ""
                            }`}
                        />
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-xs font-black uppercase bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full justify-center"
                    >
                      <Download size={12} /> Download SRT Files
                    </Link>
                    <p className="text-[10px] text-slate-400 mt-3 text-center">
                      <Sparkles size={8} className="inline mr-1" /> Extract
                      clean subtitles in minutes
                    </p>
                  </div>
                </div>
              </aside>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <article className="prose prose-slate prose-lg max-w-none">
                  {/* 图片 1 - 优化后 */}
                  <div className="mb-16 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl transition-transform hover:-translate-y-1 duration-500 group">
                    <img
                      src="/image/A graphic breakdown of the SRT file format.webp"
                      alt="Comprehensive technical breakdown of SRT file format showing sequence numbering, timestamp syntax with comma milliseconds, and subtitle block structure for video captioning"
                      className="w-full h-auto"
                    />
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                      <p className="text-sm text-slate-500 font-medium">
                        Figure 1: Complete SRT file structure breakdown with
                        timestamp formatting rules
                      </p>
                    </div>
                  </div>

                  {/* 新增：关键定义区块 */}
                  <div className="my-16 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-4 right-4 p-4 opacity-10">
                      <FileText size={80} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                      <FileText size={24} className="text-blue-600" />
                      What is an SRT File?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-slate-700 font-medium leading-relaxed mb-4">
                          An <strong>SRT file (.srt extension)</strong> is a
                          plain-text subtitle format that stores synchronized
                          caption data with precise timing information. It's the
                          universal standard for video subtitles, supported by
                          every major video player from VLC to YouTube.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Check
                              size={16}
                              className="text-green-500 mt-0.5"
                            />
                            <span className="text-sm text-slate-600">
                              <strong>Human-readable:</strong> Can be edited
                              with any text editor
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Check
                              size={16}
                              className="text-green-500 mt-0.5"
                            />
                            <span className="text-sm text-slate-600">
                              <strong>Time-synchronized:</strong>{" "}
                              Millisecond-accurate caption display
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 p-6 rounded-2xl border border-blue-100">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <Download size={16} className="text-blue-600" />
                          Common Use Cases
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li className="flex items-center gap-2">
                            <Hash size={12} /> Video localization & translation
                          </li>
                          <li className="flex items-center gap-2">
                            <Hash size={12} /> AI training data for speech
                            recognition
                          </li>
                          <li className="flex items-center gap-2">
                            <Hash size={12} /> Accessibility compliance (ADA,
                            WCAG)
                          </li>
                          <li className="flex items-center gap-2">
                            <Hash size={12} /> Content repurposing for social
                            media
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Enhanced Anatomy */}
                  <section id="anatomy" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-white-900 mb-10 leading-tight text-center">
                      1. Complete SRT File Anatomy
                    </h2>
                    <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
                      Understanding the{" "}
                      <strong>four essential components</strong> of every SRT
                      file is crucial for creating valid subtitle files that
                      work across all video platforms and players.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                      {[
                        {
                          t: "Sequence Number",
                          d: "A sequential numeric identifier starting at 1. This must increment by 1 for each subtitle block and cannot contain gaps or duplicates.",
                          code: "1",
                          tip: "Our bulk extractor auto-generates perfect sequence numbering",
                        },
                        {
                          t: "Timestamp Format",
                          d: "Precise HH:MM:SS,ms format using comma as millisecond separator. The arrow (-->) separates start and end times.",
                          code: "00:01:23,456 --> 00:01:25,789",
                          tip: "Remember: SRT uses commas, VTT uses dots for milliseconds",
                        },
                        {
                          t: "Subtitle Text Content",
                          d: "The actual caption text. Can span multiple lines (max 2 recommended). Supports basic HTML tags like <b>, <i>, <u> for styling.",
                          code: "This is the actual subtitle text\nthat appears on screen.",
                          tip: "Keep lines under 42 characters for optimal readability",
                        },
                        {
                          t: "Blank Line Separator",
                          d: "A mandatory empty line that signals the end of one subtitle block and the beginning of the next. Missing separators cause parsing errors.",
                          code: "(blank line)",
                          tip: "Required after every subtitle entry",
                        },
                      ].map((box, i) => (
                        <div
                          key={i}
                          className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <strong className="text-blue-600 block mb-2 uppercase text-[10px] tracking-widest font-black">
                              Component 0{i + 1}
                            </strong>
                            <div className="text-[8px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                              REQUIRED
                            </div>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 mb-2 uppercase">
                            {box.t}
                          </h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                            {box.d}
                          </p>
                          <div className="mt-4 p-4 bg-slate-50 rounded-xl font-mono text-sm text-slate-700">
                            {box.code}
                          </div>
                          <div className="mt-4 text-xs text-blue-600 font-medium flex items-center gap-2">
                            <Zap size={10} /> {box.tip}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 2: Enhanced Interactive Breakdown */}
                  <section id="interactive" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center">
                      2. SRT Syntax Deep Dive
                    </h2>
                    <p className="text-center text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
                      Interactive analysis of a complete{" "}
                      <strong>SRT file structure</strong>. Hover over each
                      element to understand formatting rules and common
                      pitfalls.
                    </p>

                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl font-mono text-sm md:text-base leading-loose relative group overflow-hidden">
                      <div className="absolute top-4 right-4 text-xs text-slate-600 font-bold">
                        example.srt
                      </div>

                      <div className="space-y-8">
                        {/* Block 1 */}
                        <div className="group/block relative">
                          <div className="flex items-start gap-4">
                            <span className="text-slate-600 font-black mt-1">
                              1
                            </span>
                            <div className="flex-1">
                              <div className="group/line relative inline-block p-2 hover:bg-blue-500/20 rounded-lg cursor-help transition-colors">
                                <span className="text-emerald-400 font-bold">
                                  00:00:01,000 --&gt; 00:00:03,450
                                </span>
                                <div className="absolute left-full ml-4 top-0 w-72 p-4 bg-white text-slate-900 text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover/line:opacity-100 group-hover/line:visible transition-all duration-200 border border-blue-100 font-sans pointer-events-none z-50">
                                  <p className="font-black uppercase mb-2 text-blue-600">
                                    Timestamp Format
                                  </p>
                                  <p className="text-xs text-slate-600 mb-2">
                                    Format: <code>HH:MM:SS,ms</code>
                                  </p>
                                  <p className="text-xs text-slate-600">
                                    SRT uses commas for milliseconds (unlike VTT
                                    which uses dots)
                                  </p>
                                </div>
                              </div>
                              <br />
                              <div className="group/line relative inline-block p-2 hover:bg-amber-500/20 rounded-lg cursor-help transition-colors mt-2">
                                <span className="text-slate-100">
                                  Welcome to our tutorial on SRT file
                                  formatting.
                                </span>
                                <div className="absolute left-full ml-4 top-0 w-72 p-4 bg-white text-slate-900 text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover/line:opacity-100 group-hover/line:visible transition-all duration-200 border border-amber-100 font-sans pointer-events-none z-50">
                                  <p className="font-black uppercase mb-2 text-amber-600">
                                    Caption Text
                                  </p>
                                  <p className="text-xs text-slate-600">
                                    Max recommended: 42 characters per line, 2
                                    lines max
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Blank line */}

                        {/* Block 2 */}
                        <div className="group/block relative">
                          <div className="flex items-start gap-4">
                            <span className="text-slate-600 font-black mt-1">
                              2
                            </span>
                            <div className="flex-1">
                              <div className="group/line relative inline-block p-2 hover:bg-emerald-500/20 rounded-lg cursor-help transition-colors">
                                <span className="text-emerald-400 font-bold">
                                  00:00:03,500 --&gt; 00:00:06,800
                                </span>
                              </div>
                              <br />
                              <div className="group/line relative inline-block p-2 hover:bg-amber-500/20 rounded-lg cursor-help transition-colors mt-2">
                                <span className="text-slate-100">
                                  Learn how to create perfect subtitle files
                                  <br />
                                  for video editing and AI training.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-800">
                        <div className="text-xs text-slate-500 space-y-2">
                          <div className="flex items-center gap-2">
                            <Type size={12} /> <strong>Encoding:</strong> Always
                            save as UTF-8 to support special characters
                          </div>
                          <div className="flex items-center gap-2">
                            <Hash size={12} /> <strong>Line Endings:</strong>{" "}
                            Use CRLF (Windows) or LF (Unix) consistently
                          </div>
                          <div className="flex items-center gap-2">
                            <Check size={12} /> <strong>Validation:</strong> Our
                            bulk downloader checks all formatting rules
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* NEW Section: Advanced Formatting */}
                  <section
                    id="advanced-formatting"
                    className="scroll-mt-32 mb-24"
                  >
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="bg-blue-600 text-white p-3 rounded-2xl">
                          <Settings size={24} />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
                            3. Advanced SRT Formatting Rules
                          </h2>
                          <p className="text-slate-500 mt-2">
                            Professional techniques for complex subtitle
                            scenarios
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {[
                          {
                            title: "Styling with HTML Tags",
                            description:
                              "SRT files support limited HTML for text formatting. Use <b>, <i>, <u> tags for emphasis, but avoid complex CSS.",
                            example: "<b>Important</b>: This text is bold",
                            note: "Not all players support HTML tags",
                          },
                          {
                            title: "Positioning & Alignment",
                            description:
                              "While basic SRT doesn't support positioning, some players accept positional hints in the timestamp line.",
                            example:
                              "00:01:00,000 --> 00:01:05,000 X1:100 X2:400 Y1:50 Y2:100",
                            note: "Non-standard extension",
                          },
                          {
                            title: "Multilingual Support",
                            description:
                              "UTF-8 encoding supports all languages. Always include language metadata in filename or header comments.",
                            example:
                              "video_es.srt (Spanish)\nvideo_ja.srt (Japanese)",
                            note: "Essential for localization",
                          },
                          {
                            title: "Line Breaking Strategy",
                            description:
                              "Optimal readability: max 42 characters per line, 2 lines max. Break at natural phrase boundaries.",
                            example:
                              "This is the first line of dialogue\nand this is the second line.",
                            note: "Improves viewer comprehension",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors"
                          >
                            <h4 className="font-black text-slate-900 mb-3 text-lg">
                              {item.title}
                            </h4>
                            <p className="text-sm text-slate-600 mb-4">
                              {item.description}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm text-slate-700 mb-3">
                              {item.example}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <Sparkles size={10} /> {item.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Enhanced Comparison Table */}
                  <section id="comparison" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center leading-tight">
                      4. Format Comparison: SRT vs. VTT vs. TXT
                    </h2>

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl bg-white">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                              Feature Comparison
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-blue-600">
                              SRT (.srt)
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-violet-600">
                              VTT (.vtt)
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                              Clean TXT
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-slate-600 leading-relaxed">
                          {[
                            {
                              feature: "Primary Use Case",
                              srt: "Universal video subtitles",
                              vtt: "Web video (HTML5)",
                              txt: "AI training data",
                            },
                            {
                              feature: "Timestamp Format",
                              srt: "00:01:23,456 (comma)",
                              vtt: "00:01:23.456 (dot)",
                              txt: "No timestamps",
                            },
                            {
                              feature: "Styling Support",
                              srt: "Basic HTML tags",
                              vtt: "Full CSS classes",
                              txt: "Plain text only",
                            },
                            {
                              feature: "AI Training Suitability",
                              srt: "Excellent (clean structure)",
                              vtt: "Good (requires cleaning)",
                              txt: "Perfect (pure text)",
                            },
                            {
                              feature: "Browser Native Support",
                              srt: "Requires conversion",
                              vtt: "Direct support",
                              txt: "Not applicable",
                            },
                            {
                              feature: "Metadata Support",
                              srt: "Minimal",
                              vtt: "Extensive headers",
                              txt: "None",
                            },
                            {
                              feature: "Learning Curve",
                              srt: "Very low",
                              vtt: "Moderate",
                              txt: "None",
                            },
                          ].map((row, i) => (
                            <tr
                              key={i}
                              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                            >
                              <td className="p-6 font-bold text-slate-900">
                                {row.feature}
                              </td>
                              <td className="p-6">
                                <span
                                  className={`font-mono ${row.feature.includes("AI")
                                    ? "font-black text-blue-700"
                                    : ""
                                    }`}
                                >
                                  {row.srt}
                                </span>
                              </td>
                              <td className="p-6">
                                <span
                                  className={`font-mono ${row.feature.includes("AI")
                                    ? "font-black text-violet-700"
                                    : ""
                                    }`}
                                >
                                  {row.vtt}
                                </span>
                              </td>
                              <td className="p-6">
                                <span
                                  className={`font-mono ${row.feature.includes("AI")
                                    ? "font-black text-slate-900"
                                    : ""
                                    }`}
                                >
                                  {row.txt}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h4 className="font-black text-blue-900 mb-3 flex items-center gap-2">
                          <Video size={16} /> Choose SRT When...
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Working with
                            traditional video editing software
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Need maximum
                            compatibility across devices
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Preparing
                            data for speech recognition AI
                          </li>
                        </ul>
                      </div>
                      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6">
                        <h4 className="font-black text-violet-900 mb-3 flex items-center gap-2">
                          <Globe size={16} /> Choose VTT When...
                        </h4>
                        <ul className="space-y-2 text-sm text-violet-800">
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Building
                            modern web video experiences
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Need advanced
                            styling and positioning
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Working with
                            HTML5 video players
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <Cpu size={16} /> Choose TXT When...
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-800">
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Training
                            language models (LLMs)
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Need pure
                            text without timing data
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={14} className="mt-0.5" /> Creating
                            searchable transcripts
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* NEW Section: Format Conversion */}
                  <section id="conversion" className="scroll-mt-32 mb-24">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200">
                      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center">
                        5. SRT Format Conversion Guide
                      </h2>

                      <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <Layers size={20} className="text-blue-600" />
                            Converting SRT to Other Formats
                          </h3>
                          <div className="space-y-6">
                            {[
                              {
                                from: "SRT → VTT",
                                process:
                                  "Change commas to dots in timestamps, add WEBVTT header",
                                tool: "Our bulk converter automates this",
                              },
                              {
                                from: "SRT → TXT",
                                process:
                                  "Remove timestamps and sequence numbers, keep only text",
                                tool: "Perfect for AI training datasets",
                              },
                              {
                                from: "SRT → ASS/SSA",
                                process:
                                  "Convert to Advanced SubStation Alpha with styling",
                                tool: "For advanced karaoke and animation",
                              },
                            ].map((conv, i) => (
                              <div
                                key={i}
                                className="p-4 bg-white border border-slate-200 rounded-2xl"
                              >
                                <div className="font-black text-blue-600 text-sm mb-2">
                                  {conv.from}
                                </div>
                                <p className="text-sm text-slate-600 mb-2">
                                  {conv.process}
                                </p>
                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                  <Zap size={10} /> {conv.tool}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <Download size={20} className="text-blue-600" />
                            Bulk Conversion Workflow
                          </h3>
                          <div className="bg-slate-900 text-white rounded-2xl p-6">
                            <ol className="space-y-4 text-sm">
                              <li className="flex items-center gap-3">
                                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  1
                                </span>
                                <span>
                                  Upload multiple SRT files or paste YouTube
                                  URLs
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  2
                                </span>
                                <span>
                                  Select target format (VTT, TXT, JSON, etc.)
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  3
                                </span>
                                <span>
                                  Apply formatting rules and validation
                                </span>
                              </li>
                              <li className="flex items-center gap-3">
                                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                  4
                                </span>
                                <span>
                                  Download converted files or integrate via API
                                </span>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>


                  {/* Section 4: Enhanced Tools & Editors */}
                  <section id="editing" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center">
                      6. Professional SRT Editing Tools
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                      {[
                        {
                          category: "Text Editors",
                          tools: "Notepad++, Sublime Text, VS Code",
                          useCase: "Manual correction of SRT files",
                          tip: "Always save as UTF-8 encoding",
                        },
                        {
                          category: "Dedicated Software",
                          tools: "Subtitle Edit, Aegisub, Jubler",
                          useCase: "Advanced timing and synchronization",
                          tip: "Visual timeline editing interface",
                        },
                        {
                          category: "Online Converters",
                          tools: "Our bulk YouTube subtitle downloader",
                          useCase: "Mass SRT extraction and conversion",
                          tip: "Process 1000+ videos simultaneously",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow"
                        >
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl font-black text-sm shadow-sm mb-4">
                            {i + 1}
                          </div>
                          <strong className="text-slate-900 block mb-2 uppercase text-sm tracking-widest">
                            {item.category}
                          </strong>
                          <p className="text-sm text-slate-600 mb-3 font-medium">
                            {item.tools}
                          </p>
                          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                            {item.useCase}
                          </p>
                          <div className="text-xs text-blue-600 font-medium flex items-center gap-2">
                            <Sparkles size={10} /> {item.tip}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 原有图片样式/位置保留 */}
                    <div className="my-16 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/30 rotate-[-3deg] shadow-2xl">
                            <Download size={32} className="text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">
                              Need Bulk SRT Files for AI Research?
                            </h3>
                            <p className="text-blue-100 font-medium leading-relaxed">
                              Our professional extraction engine provides
                              perfectly formatted <strong>SRT files</strong>{" "}
                              from any YouTube playlist or channel.
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/"
                          onClick={handleAction}
                          className="bg-white text-blue-600 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-widest whitespace-nowrap"
                        >
                          Start Bulk Extraction
                        </Link>
                      </div>
                    </div>
                  </section>

                  {/* NEW Section: AI Research Use Cases */}
                  <section id="ai-use-cases" className="scroll-mt-32 mb-24">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[3rem] p-8 md:p-16">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="bg-blue-500 p-3 rounded-2xl">
                          <Cpu size={24} />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-white">
                            7. SRT Files for AI & Machine Learning
                          </h2>
                          <p className="text-slate-300 mt-2">
                            Why SRT is the preferred format for AI training data
                          </p>
                        </div>
                      </div>

                      <div className="mb-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <h3 className="text-xl font-black text-white mb-3">SRT File Format Benefits for AI Applications</h3>
                        <p className="text-slate-300 mb-4">The .srt subtitle format provides clean, structured text data that is ideal for machine learning models. Its simple structure makes it easy to parse and convert to training datasets for natural language processing and speech recognition systems.</p>
                        <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-green-400 mt-1 flex-shrink-0" /> Easy parsing for AI training
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-green-400 mt-1 flex-shrink-0" /> Consistent timestamp format
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-green-400 mt-1 flex-shrink-0" /> Universal compatibility
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-green-400 mt-1 flex-shrink-0" /> Clean text extraction
                          </li>
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                          <h4 className="font-black text-xl mb-4 flex items-center gap-3 text-white">
                            <Database size={20} className="text-blue-400" />
                            Clean Data for LLM Training
                          </h4>
                          <p className="text-slate-300 mb-4">
                            SRT's simple structure makes it ideal for creating
                            clean dialogue datasets. The timestamp-text pairing
                            provides perfect alignment for speech recognition
                            models.
                          </p>
                          <div className="text-sm text-slate-400 space-y-2">
                            <div className="flex items-center gap-2">
                              <Check size={14} /> Automatic noise filtering
                              (timestamps removed)
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={14} /> Perfect for fine-tuning GPT,
                              Whisper, BERT
                            </div>
                            <div className="flex items-center gap-2">
                              <Check size={14} /> Direct conversion to JSONL
                              format
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                          <h4 className="font-black text-xl mb-4 flex items-center gap-3 text-white">
                            <ServerCog size={20} className="text-blue-400" />
                            Bulk Processing Pipelines
                          </h4>
                          <p className="text-slate-300 mb-4">
                            Our infrastructure processes millions of SRT files
                            monthly for AI research teams. Automated validation
                            ensures data quality at scale.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-center">
                            {[
                              { value: "2.5M", label: "Monthly SRT Files" },
                              { value: "99.8%", label: "Parsing Success" },
                              { value: "45+", label: "Languages" },
                              { value: "10ms", label: "Processing Time" },
                            ].map((stat, i) => (
                              <div key={i} className="text-center">
                                <div className="text-xl font-black text-white">
                                  {stat.value}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Enhanced FAQ Section */}
                  <section
                    id="faq"
                    className="scroll-mt-32 border-t border-slate-100 pt-24 mb-24 text-left"
                  >
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                      8. SRT File Expert FAQ
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          {
                            q: "What is the standard SRT file format structure?",
                            a: "The standard SRT format consists of four elements per subtitle: 1) Sequence number, 2) Timestamp (HH:MM:SS,ms format), 3) Subtitle text, 4) Blank line separator. This structure must be repeated for each caption.",
                          },
                          {
                            q: "How do I create an SRT file from scratch?",
                            a: "You can create an SRT file using any text editor. Start with '1' as the sequence number, add your timestamps using comma for milliseconds, write your caption text, and add a blank line before the next sequence. Always save with UTF-8 encoding.",
                          },
                          {
                            q: "What's the difference between SRT and VTT files?",
                            a: "SRT uses commas for milliseconds (00:01:23,456) while VTT uses dots (00:01:23.456). VTT supports CSS styling and metadata headers, while SRT is simpler and more universally compatible.",
                          },
                        ].map((faq, i) => (
                          <details
                            key={i}
                            className="group p-6 bg-white rounded-2xl border border-slate-200 cursor-pointer transition-all hover:border-blue-400 open:shadow-lg"
                          >
                            <summary className="flex justify-between items-center font-bold text-slate-800 list-none focus:outline-none select-none">
                              <span>{faq.q}</span>
                              <svg
                                className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </summary>
                            <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed font-medium">
                              {faq.a}
                            </div>
                          </details>
                        ))}
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            q: "Can I download YouTube subtitles as SRT files in bulk?",
                            a: "Yes, using our professional bulk YouTube subtitle downloader, you can extract SRT files from entire playlists or channels simultaneously. The tool automatically formats timestamps correctly and handles multiple languages.",
                          },
                          {
                            q: "How do I convert SRT to TXT for AI training?",
                            a: "Our bulk processor includes an SRT-to-TXT conversion feature that removes timestamps and sequence numbers, leaving only clean dialogue text perfect for training language models like GPT or Whisper.",
                          },
                          {
                            q: "What encoding should I use for SRT files?",
                            a: "Always use UTF-8 encoding for SRT files. This ensures proper display of special characters, accents, and multilingual text. Avoid ANSI or other encodings that can cause character corruption.",
                          },
                        ].map((faq, i) => (
                          <details
                            key={i}
                            className="group p-6 bg-white rounded-2xl border border-slate-200 cursor-pointer transition-all hover:border-blue-400 open:shadow-lg"
                          >
                            <summary className="flex justify-between items-center font-bold text-slate-800 list-none focus:outline-none select-none">
                              <span>{faq.q}</span>
                              <svg
                                className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </summary>
                            <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed font-medium">
                              {faq.a}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Final CTA */}
                  <div className="mt-32 text-center p-12 bg-gradient-to-br from-slate-900 to-black rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#2563eb,_transparent)]"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Terminal size={28} />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">
                        Ready to Master SRT Files?
                      </h3>
                      <p className="text-slate-300 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                        Start extracting perfectly formatted SRT files today
                        with our professional bulk downloader. Process unlimited
                        videos, convert between formats, and prepare clean
                        datasets for AI research.
                      </p>
                      <Link
                        href="/"
                        onClick={handleAction}
                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-sm tracking-widest"
                      >
                        <span>Start Bulk Extraction Now</span>
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                      <p className="text-slate-400 text-xs mt-6">
                        No credit card required • 5 free SRT extractions •
                        Enterprise API available
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
