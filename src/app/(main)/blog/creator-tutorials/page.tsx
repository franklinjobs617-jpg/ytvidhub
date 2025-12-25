"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function EngineeringDecisionsBlogPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollBtns(window.scrollY > 300);
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
      <title>From Pain Point to Production: The Engineering Decisions Behind YTVidHub</title>
      <meta name="description" content="A deep dive into the architectural challenges—from ASR accuracy to clean TXT output—that shaped the development of YTVidHub, the bulk YouTube subtitle downloader." />
      <link rel="canonical" href="https://ytvidhub.com/blog/creator-tutorials" />

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-400/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-indigo-400/10 rounded-full blur-[100px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Engineering Deep Dive
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              From Pain Point <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                To Production
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              The core architectural decisions that transformed a simple idea into the YTVidHub you use today.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest">
              <span>By YTVidHub Engineering</span>
              <span className="text-slate-200">|</span>
              <span>Updated Oct 2025</span>
            </div>
          </div>
        </section>

        {/* === 2. ARTICLE CONTENT === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            
            {/* Intro section */}
            <section className="mb-24">
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p className="text-xl text-slate-900 font-semibold leading-relaxed">
                   When we introduced the concept of a dedicated <strong>Bulk YouTube Subtitle Downloader</strong>, the response was immediate. Researchers, data analysts, and AI builders confirmed a universal pain point: gathering transcripts for large projects is a "massive time sink." 
                </p>
                <p>
                  This is the story of how community feedback and tough engineering choices shaped YTVidHub.
                </p>
              </div>
            </section>

            {/* Section 1: Scalability */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                1. Scalability Meets <br/> Stability
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                The primary hurdle for a true bulk downloader isn't just downloading one file; it's reliably processing hundreds or thousands simultaneously without failure. We needed an architecture that was both robust and scalable.
              </div>

              {/* Window-style Architecture Mockup */}
              <div className="relative group mb-12">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Architecture_Flow_v2.exidraw</span>
                  </div>
                  <img
                    src="../image/ytvidhub-bulk-downloader-architecture-flow.png"
                    alt="Conceptual diagram of YTVidHub's architecture for parallel batch processing of YouTube video IDs."
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">Figure 1: Parallel Backend worker fleet</p>
              </div>

              <div className="text-slate-600 text-lg leading-relaxed">
                Our solution involves a <strong>decoupled, asynchronous job queue</strong>. When you submit a list, our front-end sends video IDs to a message broker. Backend workers then pick up these jobs independently and process them in parallel.
              </div>
            </section>

            {/* Section 2: Data Problem */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                2. Data: More Than <br/> Just SRT
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                 For most analysts, raw SRT files—with timestamps and sequence numbers—are actually "dirty data." They require an extra, tedious pre-processing step before they can be used in analysis tools or RAG systems.
              </div>

              {/* Professional Blockquote Box */}
              <div className="my-16 p-8 bg-blue-50 border-l-8 border-blue-600 rounded-r-3xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl font-serif group-hover:scale-110 transition-transform">"</div>
                <p className="relative z-10 text-slate-800 text-xl font-bold italic leading-relaxed">
                  "I don't need timestamps 99% of the time. I just want a clean block of text to feed into my model. Having to write a Python script to clean every single SRT file is a huge waste of time."
                </p>
              </div>

              <div className="text-slate-600 text-lg leading-relaxed">
                 This feedback was a turning point. We decided to treat the <strong>TXT output as a first-class citizen</strong>. Our system runs a dedicated cleaning pipeline to strip all timestamps and metadata, leaving you with a pristine block of text.
              </div>
            </section>

            {/* Section 3: Roadmap (卡片式布局) */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                3. The Accuracy Dilemma
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Phase 1 */}
                <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-blue-300 transition-all">
                   <div className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4">Phase 1: Available Now</div>
                   <h3 className="text-xl font-black text-slate-900 uppercase mb-4 tracking-tight">Free Baseline Data</h3>
                   <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                     "Established the best possible baseline data using unlimited bulk downloads of all official YouTube subtitles (Manual + ASR) at scale."
                   </p>
                </div>

                {/* Phase 2 */}
                <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-20 text-4xl group-hover:scale-120 transition-transform">🚀</div>
                   <div className="text-blue-100 font-black uppercase text-[10px] tracking-widest mb-4">Phase 2: In Development</div>
                   <h3 className="text-xl font-black uppercase mb-6 tracking-tight text-white">Pro Transcription</h3>
                   <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-blue-100">
                      <li className="flex items-center gap-2"><span>✓</span> OpenAI Whisper Integration</li>
                      <li className="flex items-center gap-2"><span>✓</span> Contextual Keyword Lists</li>
                      <li className="flex items-center gap-2"><span>✓</span> Audio Silent-Segment Removal</li>
                   </ul>
                </div>
              </div>
            </section>

            {/* Bottom CTA Box (对齐定价页按钮风格) */}
            <section className="mt-32">
              <div className="mt-20 text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#2563eb,_transparent)]"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight leading-none italic">
                    Ready to Automate <br/> Your Research?
                  </h3>
                  <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                    Stop the manual work and start saving hours today. The unlimited bulk downloader is live now.
                  </p>
                  <Link href="/" onClick={handleAction} className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                    <span>Try the Bulk Downloader</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </article>
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