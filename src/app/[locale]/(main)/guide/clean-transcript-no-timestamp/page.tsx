"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function CleanTranscriptGuidePage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollBtns(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      {/* === SEO & Metadata (100% 原样保留) === */}
      <title>Clean Subtitles: Remove Timestamps for Research & LLM Data</title>
      <meta name="description" content="Learn the best method to remove timestamps and ASR noise from YouTube subtitles. Get research-ready, clean text data for your projects." />
      <link rel="canonical" href="https://ytvidhub.com/guide/clean-transcript-no-timestamp" />

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-24 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Data Science Guide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Clean Subtitles <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Flawless Data
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Data quality is non-negotiable for LLM training and academic research. 
              Learn the professional method to remove timestamps and ASR noise for truly pristine text data.
            </p>
          </div>
        </section>

        {/* === 2. THE PROBLEM SECTION === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
               The Pitfall of Raw <br/> SRT/VTT Files
            </h2>
            <div className="text-center max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium">
                Standard subtitle files are poison for high-stakes projects. Feeding noisy data into your LLM or research model doesn't just lower quality—it actively compromises your results.
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight border-l-4 border-blue-600 pl-6">
                  How Raw Data Corrupts Your Work:
                </h3>
                <ul className="space-y-8">
                  {[
                    { 
                        title: "Timestamps & Tags", 
                        desc: "Useless structural data that confuses tokenizers and requires tedious pre-processing.", 
                        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    },
                    { 
                        title: "ASR Noise", 
                        desc: "Filler words like 'um,' 'uh,' and non-speech tags like [Applause] pollute semantic meaning.", 
                        icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                    },
                    { 
                        title: "Inconsistent Formatting", 
                        desc: "Different videos produce varied outputs, creating a data-wrangling nightmare for scaling.", 
                        icon: "M4 6h16M4 12h16m-7 6h7" 
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <strong className="block text-slate-900 text-lg mb-1">{item.title}</strong>
                        <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before/After Window Mockup */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Subtitle Pipeline Viewer</span>
                  </div>
                  <img
                    src="../image/clean-transcript-no-timestamp-before-after.webp"
                    alt="Comparison of raw YouTube subtitles (with timestamps) vs. clean, research-ready TXT text."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. HOW IT WORKS SECTION === */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
               How Our "Clean Mode" Works
            </h2>
            <div className="text-center max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium italic">
                Our engine goes beyond simple find-and-replace. It uses a multi-stage parser to surgically remove noise and deliver pure, high-quality text.
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                    step: "01", 
                    title: "Structural Tag Elimination", 
                    desc: "Precisely strips away all SRT/VTT timecodes, sequence numbers, and formatting tags without affecting the core text.",
                    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                },
                { 
                    step: "02", 
                    title: "ASR Noise Filtering", 
                    desc: "Identifies and removes common Automatic Speech Recognition artifacts like [Music] or [Applause] tags.",
                    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
                },
                { 
                    step: "03", 
                    title: "Format Unification", 
                    desc: "Consolidates all text fragments into a single, continuous paragraph, ready for any text processor or model.",
                    icon: "M4 6h16M4 12h16M4 18h7" 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.step}. {item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 4. CTA SECTION (对齐首页风格) === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter leading-tight">
              Ready for a Professional Workflow?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Cleaning individual files is just one part of the puzzle. Our complete guide covers bulk downloading, advanced formatting, and everything you need to build a robust data pipeline.
            </p>
            <Link href="/data-prep-guide" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
              <span>Read The Complete Guide</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Buttons */}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}