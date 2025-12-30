"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

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
        "comparison",
        "how-to-use",
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
      {/* === SEO & Metadata (深度针对首页权重优化) === */}
      <title>
        SRT File Format: Technical Guide to .srt Subtitles | YTVidHub
      </title>
      <meta
        name="description"
        content="Master the SRT file format with our technical guide. Learn how to format SRT files correctly for video editing and use our professional YouTube subtitle downloader for LLM data prep."
      />
      <link rel="canonical" href="https://ytvidhub.com/what-is-an-srt-file" />

      <main>
        {/* === 1. HERO SECTION === */}
        <section className="relative pt-24 pb-0 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Advanced Documentation
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The SRT File <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Format Mastery
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Understanding the <strong>SRT file format</strong> is essential
              for creators and AI researchers. If you are looking to
              batch-process video data, our{" "}
              <Link
                href="/"
                className="text-blue-600 font-bold border-b-2 border-blue-200 hover:border-blue-600 transition-all"
              >
                YouTube Subtitle Downloader
              </Link>{" "}
              provides perfectly formatted .srt files ready for any workspace.
            </p>
          </div>
        </section>

        {/* === 2. MAIN LAYOUT WITH SIDEBAR === */}
        <section className="py-10 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Sidebar (TOC) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-32">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pl-4 border-l-4 border-blue-600">
                  Table of Contents
                </p>
                <nav className="flex flex-col space-y-1">
                  {[
                    { id: "anatomy", label: "1. Format Anatomy" },
                    { id: "interactive", label: "2. Technical Breakdown" },
                    { id: "comparison", label: "3. SRT vs VTT vs TXT" },
                    { id: "how-to-use", label: "4. Editing & Extraction" },
                    { id: "faq", label: "5. Expert FAQ" },
                  ].map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        activeSection === cat.id
                          ? "bg-blue-50 text-blue-600 translate-x-2"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {cat.label}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <article className="prose prose-slate prose-lg max-w-none">
                  {/* === 原有图片位置保留：图片 1 === */}
                  <div className="mb-16 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl transition-transform hover:-translate-y-1 duration-500">
                    <img
                      src="./image/A graphic breakdown of the SRT file format.webp"
                      alt="A technical graphic breakdown of the SRT file format, showing sequence numbers, precise timestamps, and clean caption text blocks."
                      className="w-full h-auto"
                    />
                  </div>

                  <p className="text-xl leading-relaxed text-slate-600 mb-12">
                    The <strong>SRT file</strong> (SubRip Subtitle) is the most
                    widely compatible format for captions. Its lightweight,
                    text-based nature makes it the primary choice for{" "}
                    <Link
                      href="/"
                      className="text-blue-600 font-bold underline decoration-blue-200"
                    >
                      bulk YouTube subtitle extraction
                    </Link>{" "}
                    for LLM fine-tuning and professional video localization
                    projects.
                  </p>

                  <div className="my-16 p-10 bg-blue-50 border border-blue-100 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl group-hover:scale-110 transition-transform">
                      📚
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mt-0 uppercase tracking-tight mb-4">
                      What is an SRT File?
                    </h3>
                    <p className="text-slate-700 font-medium leading-relaxed mb-0">
                      An <strong>SRT file</strong> is a synchronized text
                      document that stores subtitle information using a specific{" "}
                      <strong>SRT file format</strong>. Unlike complex XML-based
                      formats, SRT is human-readable and universally supported.
                      This simplicity is why our{" "}
                      <Link
                        href="/"
                        className="font-bold text-blue-600 border-b border-blue-200"
                      >
                        YouTube SRT downloader
                      </Link>{" "}
                      prioritizes this format for research data extraction.
                    </p>
                  </div>

                  {/* Section 1: Anatomy */}
                  <section id="anatomy" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 leading-tight text-center">
                      1. The Technical Anatomy of SRT
                    </h2>
                    <p>
                      To <strong>format an SRT file</strong> correctly, you must
                      follow the standard four-segment sequence for every
                      caption entry:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                      {[
                        {
                          t: "The Counter",
                          d: "A numeric identifier (starting at 1) that specifies the chronological order of the subtitle block.",
                        },
                        {
                          t: "The Timecode",
                          d: "Precise HH:MM:SS,ms format. Remember: SRT uses a comma (,) as the millisecond separator.",
                        },
                        {
                          t: "The Payload",
                          d: "The spoken content. When using a professional extractor, this text is usually pre-cleaned for better readability.",
                        },
                        {
                          t: "The Separation",
                          d: "A mandatory blank line that acts as a delineator between distinct subtitle entries.",
                        },
                      ].map((box, i) => (
                        <div
                          key={i}
                          className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-sm hover:bg-white hover:border-blue-200 transition-all group"
                        >
                          <strong className="text-blue-600 block mb-2 uppercase text-[10px] tracking-widest font-black">
                            Segment 0{i + 1}
                          </strong>
                          <h4 className="text-lg font-black text-slate-900 mb-2 uppercase">
                            {box.t}
                          </h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-0">
                            {box.d}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section 2: Interactive Breakdown */}
                  <section id="interactive" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center">
                      2. Deep Dive: SRT Format Syntax
                    </h2>
                    <p className="text-center text-slate-500 font-medium mb-12">
                      Hover over the syntax below to understand how an{" "}
                      <strong>SRT subtitle file</strong> is built.
                    </p>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl font-mono text-sm md:text-base leading-loose relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10 text-white font-black uppercase text-xs tracking-widest italic">
                        technical_spec.srt
                      </div>

                      <div className="relative z-10 space-y-4">
                        <div className="group/line relative inline-block p-1 hover:bg-blue-500/20 rounded cursor-help">
                          <span className="text-gray-400 font-black">1</span>
                          <div className="absolute left-full ml-4 top-0 w-64 p-3 bg-white text-slate-900 text-xs rounded-xl shadow-2xl opacity-0 group-hover/line:opacity-100 transition-opacity border border-blue-100 font-sans pointer-events-none z-50">
                            <p className="font-black uppercase mb-1">
                              Position Index
                            </p>
                            Always sequential. Our{" "}
                            <strong>bulk extractor</strong> handles these
                            automatically for entire playlists.
                          </div>
                        </div>
                        <br />
                        <div className="group/line relative inline-block p-1 hover:bg-emerald-500/20 rounded cursor-help">
                          <span className="text-emerald-400">
                            00:00:01,000 --&gt; 00:00:03,450
                          </span>
                          <div className="absolute left-full ml-4 top-0 w-64 p-3 bg-white text-slate-900 text-xs rounded-xl shadow-2xl opacity-0 group-hover/line:opacity-100 transition-opacity border border-emerald-100 font-sans pointer-events-none z-50">
                            <p className="font-black uppercase mb-1">
                              Timecode Logic
                            </p>
                            Format: HH:MM:SS,ms. Ensuring this comma is present
                            is key to a valid <strong>SRT file format</strong>.
                          </div>
                        </div>
                        <br />
                        <div className="group/line relative inline-block p-1 hover:bg-amber-500/20 rounded cursor-help">
                          <span className="text-slate-100">
                            Clean data is the foundation of high-performance AI
                            models.
                          </span>
                          <div className="absolute left-full ml-4 top-0 w-64 p-3 bg-white text-slate-900 text-xs rounded-xl shadow-2xl opacity-0 group-hover/line:opacity-100 transition-opacity border border-amber-100 font-sans pointer-events-none z-50">
                            <p className="font-black uppercase mb-1">
                              Subtitle Payload
                            </p>
                            The text content. Optimized for LLM ingestions and
                            clean research datasets.
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Comparison Table */}
                  <section id="comparison" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center leading-tight">
                      3. Comparison: SRT vs. VTT vs. TXT
                    </h2>
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl bg-white">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                              Feature
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-blue-600">
                              SRT (.srt)
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                              VTT (.vtt)
                            </th>
                            <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                              Clean TXT
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-medium text-slate-600 leading-relaxed">
                          <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="p-6 font-bold text-slate-900">
                              Standard Use
                            </td>
                            <td className="p-6 font-black italic uppercase text-blue-700">
                              Offline Video
                            </td>
                            <td className="p-6">Web/HTML5</td>
                            <td className="p-6 italic">AI Research</td>
                          </tr>
                          <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="p-6 font-bold text-slate-900">
                              Timing Punctuation
                            </td>
                            <td className="p-6">Comma (,)</td>
                            <td className="p-6">Dot (.)</td>
                            <td className="p-6">None</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-6 font-bold text-slate-900">
                              Ideal For
                            </td>
                            <td className="p-6">Premiere/VLC</td>
                            <td className="p-6 text-slate-900">
                              Browser Playback
                            </td>
                            <td className="p-6 font-bold">LLM Fine-tuning</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Section 4: Tools & Editors */}
                  <section id="how-to-use" className="scroll-mt-32 mb-24">
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-10 text-center">
                      4. Tools to Format & Extract SRT Files
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-12">
                      You can manually edit any <strong>.srt extension</strong>{" "}
                      file with Notepad or TextEdit. However, for
                      industrial-scale research, using a dedicated{" "}
                      <Link
                        href="/"
                        className="font-bold underline text-blue-600"
                      >
                        YouTube subtitle downloader
                      </Link>{" "}
                      is the only way to ensure data integrity.
                    </p>

                    {/* === 原有图片样式/位置保留 === */}
                    <div className="my-16 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/30 rotate-[-3deg] shadow-2xl">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white">
                            Need Bulk SRT Data for LLM Research?
                          </h3>
                          <p className="text-blue-100 font-medium leading-relaxed mb-0">
                            Our professional extraction engine provides the
                            cleanest <strong>SRT file format</strong> datasets
                            from any playlist or channel.
                          </p>
                        </div>
                        <Link
                          href="/"
                          className="bg-white text-blue-600 font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase text-[10px] tracking-widest whitespace-nowrap"
                        >
                          Try Pro Downloader
                        </Link>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      {[
                        {
                          t: "Text Editors",
                          d: "Standard tools like Notepad++ allow you to correct text within an SRT file. Remember to save in UTF-8 encoding to preserve special characters.",
                        },
                        {
                          t: "Video Players",
                          d: "VLC is the gold standard for testing SRT compatibility. Ensure the subtitle file shares the exact name as your video file.",
                        },
                        {
                          t: "Extraction Hubs",
                          d: "Use a <Link href='/' className='underline'>bulk YouTube SRT downloader</Link> to bypass manual data entry and get perfectly formatted files instantly.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-6 items-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl font-black text-sm shadow-sm">
                            {i + 1}
                          </div>
                          <div>
                            <strong className="text-slate-900 block mb-1 uppercase text-xs tracking-widest">
                              {item.t}
                            </strong>
                            <p className="text-sm text-slate-500 mb-0 leading-relaxed">
                              {item.d}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section
                    id="faq"
                    className="scroll-mt-32 border-t border-slate-100 pt-24 mb-24 text-left"
                  >
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                      Expert SRT Format FAQ
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          q: "What is the standard SRT file format?",
                          a: "A standard SRT file consists of a numeric counter, a timestamp (HH:MM:SS,ms), the spoken text, and a blank line. This simplicity makes it a universal choice for captions.",
                        },
                        {
                          q: "Can I download YouTube subtitles in SRT format in bulk?",
                          a: "Yes. By using a specialized <Link href='/' className='font-black underline text-blue-600'>bulk YouTube subtitle downloader</Link>, you can process entire playlists or channels into .srt files simultaneously.",
                        },
                        {
                          q: "What is the best way to clean SRT data for AI training?",
                          a: "Use our clean transcript feature to remove timestamps and non-lexical noise from your SRT files, converting them into pure semantic data for LLM fine-tuning.",
                        },
                      ].map((faq, i) => (
                        <details
                          key={i}
                          className="group p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 cursor-pointer transition-all hover:border-blue-400 open:bg-white open:shadow-xl"
                        >
                          <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none select-none">
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
                          <div className="mt-6 pt-6 border-t border-slate-200 text-slate-600 leading-relaxed font-medium italic">
                            {faq.a}
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                </article>

                {/* === Final CTA (首页权重输血核心按钮) === */}
                <div className="mt-32 text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#2563eb,_transparent)]"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">
                      Boost Your Data <br /> Extraction Workflow
                    </h3>
                    <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                      Knowledge is power. Now use the most advanced{" "}
                      <strong>YouTube subtitle downloader</strong> to get your
                      perfectly formatted SRT files today.
                    </p>
                    <Link
                      href="/"
                      onClick={handleAction}
                      className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest"
                    >
                      <span>Start Bulk Extracting</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
