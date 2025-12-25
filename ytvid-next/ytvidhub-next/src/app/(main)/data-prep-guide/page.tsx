"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

// import FAQ from "@/components/landing/FAQ";

export default function DataPrepGuidePage() {
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
      <title>LLM Data Prep Guide: Mastering YouTube Transcript Extraction | YTVidHub</title>
      <meta name="description" content="The definitive guide on extracting and cleaning YouTube data for LLM training. Learn advanced techniques to eliminate ASR noise and build better research datasets." />
      <link rel="canonical" href="https://ytvidhub.com/data-prep-guide" />

      <main>
        <section className="relative pt-2 pb-20 md:pt-10 md:pb-24 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-400/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Engineering Blog
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The Definitive Guide to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                LLM Data Preparation
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Mastering bulk extraction, cleaning noisy ASR data, and structuring output for modern AI pipelines.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
              <img src="./image/icon.webp" className="w-8 h-8 rounded-full border border-slate-200" alt="Franklin Jobs" />
              <span>By Franklin Jobs</span>
              <span className="text-slate-200">|</span>
              <span>Updated Oct 2025</span>
              <span className="text-slate-200">|</span>
              <span>8 min read</span>
            </div>
          </div>
        </section>

        {/* === 2. ARTICLE CONTENT === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            
            {/* Introduction Section */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                The Hidden Cost of Dirty Data
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  Welcome to the definitive guide. If you are looking to scale your LLM or NLP projects using real-world conversational data from YouTube, you know the hidden cost isn't just time—it's the <strong>quality of your training set</strong>.
                </p>
                <p>
                  We built YTVidHub because generic subtitle downloaders fail at the critical second step: <strong>data cleaning</strong>. This guide breaks down exactly how to treat raw transcript data to achieve production-level readiness.
                </p>
              </div>
            </section>

            {/* Technical Challenge Section */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                Why Raw SRT Files <br/> Slow Down Your Pipeline
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                Many tools offer bulk download, but they often deliver messy output. For Machine Learning, this noise can be catastrophic, leading to poor model performance and wasted compute cycles.
              </div>

              {/* Window-style Image Container (图 1) */}
              <div className="relative group mb-12">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <img
                    src="./image/data-prep-pipeline-flowchart.webp"
                    alt="Flowchart illustrating the 4 stages of processing raw YouTube subtitles for LLM data preparation"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">Figure 1: The Ideal Data Pipeline</p>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">The Scourge of ASR Noise</h3>
              <ul className="space-y-4 text-slate-600 text-lg">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">01.</span>
                  <span><strong>Timestamp Overload:</strong> Raw SRT/VTT files are riddled with time codes that confuse tokenizers and inflate context windows unnecessarily.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">02.</span>
                  <span><strong>Speaker Label Interference:</strong> Automatically inserted speaker tags (e.g., `[MUSIC]`, `[SPEAKER_01]`) need removal or intelligent tagging.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">03.</span>
                  <span><strong>Accuracy Discrepancies:</strong> The challenge of automatically generated subtitles requires a robust verification layer.</span>
                </li>
              </ul>
            </section>

            {/* Solution & Format Section */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                From Bulk Download <br/> to Structured Data
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                The key to efficiency is integrating the download and cleaning steps into a seamless pipeline. This is where a dedicated tool shines over managing a complex web of custom scripts.
              </div>

              {/* Window-style Image Container (图 2) */}
              <div className="relative group mb-16">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <img
                    src="./image/subtitle-format-comparison-table.webp"
                    alt="Comparison table showing pros and cons of SRT, VTT, and Clean TXT formats for LLM fine-tuning"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">Figure 2: Format Comparison Matrix</p>
              </div>

              {/* Pro Tip Box (对齐 Pricing 风格) */}
              <div className="my-16 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform">💡</div>
                <div className="relative z-10">
                  <div className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    Pro Tip from YTVidHub
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed font-semibold italic">
                    "For most modern LLM fine-tuning, a clean, sequential TXT file (like our Research-Ready TXT) is superior to timestamped files. Focus on data density and semantic purity, not metadata overhead."
                  </p>
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                RAG Systems Application
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                One of the most powerful applications of clean, bulk transcript data is in building robust Retrieval-Augmented Generation (RAG) systems. By feeding a large corpus into a vector database, you can provide your LLM with real-time context.
              </div>

              {/* Window-style Image Container (图 3) */}
              <div className="relative group mb-12">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <img
                    src="./image/llm-rag-data-injection.webp"
                    alt="Visualizing how clean YouTube data from YTVidHub is injected into a modern LLM RAG system"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">Figure 3: RAG Injection Workflow</p>
              </div>

              {/* Bottom CTA Box (对齐首页风格) */}
              <div className="mt-20 text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#4f46e5,_transparent)]"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight leading-none">
                    Ready to build your <br/> own RAG system?
                  </h3>
                  <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium">
                    Start by gathering high-quality data with a tool built for the job. No scripts required.
                  </p>
                  <Link href="/" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-12 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                    <span>Use Bulk Downloader</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* === FAQ SECTION (对齐之前讨论的 FAQ 样式) === */}
        <section className="py-24 bg-slate-50/50 border-t border-slate-100">
           <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                Technical Q&A
              </h2>
              <div className="space-y-4">
                {[
                  { 
                    q: "Why is data cleaning essential for LLMs?", 
                    a: "LLMs are sensitive to 'noise' in data. Timestamps and speaker tags increase token consumption and can mislead the model's understanding of sentence structure and flow." 
                  },
                  { 
                    q: "What is the best format for fine-tuning?", 
                    a: "Clean TXT is generally best for fine-tuning as it maximizes data density. For RAG systems, JSON or VTT may be preferred to maintain source traceability." 
                  }
                ].map((faq, i) => (
                  <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-white">
                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed">{faq.a}</div>
                  </details>
                ))}
              </div>
           </div>
        </section>
      </main>

      {/* Floating Back to Top */}
 

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