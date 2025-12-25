"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function HowToUsePage() {
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
      {/* === SEO & Metadata (100% 保留) === */}
      <title>How to Use Our YouTube Subtitle Downloader | YTVidHub</title>
      <meta name="description" content="A step-by-step guide on how to download YouTube subtitles. Learn to use our tool for single videos, bulk downloads with unlimited URLs for Pro users, and choosing the right format." />
      <link rel="canonical" href="https://ytvidhub.com/how-to-use" />

      <main>
        {/* === 1. HERO SECTION (视觉氛围对齐定价页) === */}
        <section className="relative pt-24 pb-20 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
                 Documentation
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              How to Use <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Our Downloader
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Everything you need to know about YTVidHub, from single extractions to industrial-scale batch processing.
            </p>
          </div>
        </section>

        <article className="pb-24 bg-white">
          <div className="container mx-auto px-6">
            
            {/* === Section 1: Single Download (居中大图布局) === */}
            <section className="mb-40 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-6 text-center">
                 1. Single Video Download
              </h2>
              <p className="text-slate-500 text-lg text-center max-w-3xl mx-auto mb-16 font-medium">
                  For any single YouTube video, getting subtitles is a breeze. Our tool is designed to be as fast and straightforward as possible.
              </p>
              
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                 <div className="lg:col-span-4 space-y-8">
                    <div className="flex gap-6 items-start p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">1</div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">Copy & Paste URL</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Simply find the YouTube video you need, copy its URL, and paste it directly into the input box on our homepage.</p>
                        </div>
                    </div>
                 </div>

                 {/* 放大后的动图容器 */}
                 <div className="lg:col-span-8 group relative">
                    <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-100 transition-opacity duration-700"></div>
                    <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden p-1.5 transition-all duration-500 group-hover:scale-[1.01]">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <span className="ml-4 text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">Single Extraction Demo.gif</span>
                      </div>
                      <img
                        src="./image/5ed5628e-810f-48c8-a171-35c94fbb7e57.gif"
                        alt="Single Video Download Demo"
                        className="w-full h-auto rounded-b-[1.5rem]"
                      />
                    </div>
                 </div>
              </div>
            </section>

            {/* === Section 2: Mastering Bulk (大尺寸对比卡片) === */}
            <section className="mb-40 max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-16 text-center">
                 2. Mastering Bulk Downloads
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-10">
                 {/* Free Users Card */}
                 <div className="flex flex-col p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-200 hover:shadow-2xl hover:bg-white transition-all duration-500 group">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center font-black text-slate-600 shadow-sm">A</div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">For Free Users</h3>
                    </div>
                    <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                       Every user gets free daily credits, allowing you to process small batches of URLs (one per line). 
                    </p>
                    {/* 这里的图片展示区域变大 */}
                    <div className="mt-auto rounded-2xl border-4 border-white overflow-hidden shadow-xl">
                        <img src="./image/fa96f3b2-faf1-433f-9210-e095bb8cb5a7.gif" alt="Free Bulk download" className="w-full h-auto" />
                    </div>
                 </div>

                 {/* Pro Members Card */}
                 <div className="flex flex-col p-8 md:p-12 rounded-[3rem] bg-indigo-600 text-white shadow-[0_32px_64px_-12px_rgba(79,70,229,0.3)] relative overflow-hidden transform hover:-translate-y-2 transition-all duration-500 group">
                    <div className="absolute top-0 right-0 bg-white/10 px-10 py-4 rounded-bl-[2rem] text-[11px] font-black uppercase tracking-widest italic">Unlimited Power</div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-black text-indigo-600 shadow-lg">B</div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">For Pro Members</h3>
                    </div>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-10 font-medium">
                       The batch limit is <strong>completely removed</strong>. Paste hundreds—or even thousands—of URLs at once. No restrictions, no waiting.
                    </p>
                    <div className="mt-auto p-8 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-sm">
                        <p className="text-white text-lg font-bold italic leading-relaxed">
                            "Pro members can process entire YouTube channels or massive research datasets in a single click."
                        </p>
                    </div>
                 </div>
              </div>

              {/* 升级引导对齐定价页按钮样式 */}
              <div className="mt-16 bg-blue-50 rounded-[2.5rem] p-10 border-2 border-blue-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-200">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Remove All Restrictions</h4>
                  <p className="text-slate-500 mt-1 font-medium text-lg leading-relaxed">Unlock the full potential of YTVidHub Pro with unlimited bulk processing.</p>
                </div>
                <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-1 uppercase text-xs tracking-widest whitespace-nowrap">
                   Upgrade to Pro
                </Link>
              </div>
            </section>

            {/* === Section 3: Understanding Formats (定价页同款三列卡片) === */}
            <section className="mb-40 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-16 text-center">
                 3. Understanding Formats
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "SRT (SubRip)", desc: "Contains precise timestamps, perfect for video editors (Adobe Premiere, Final Cut) and media players (VLC)." },
                  { name: "TXT (Transcript)", desc: "Pure spoken words without any timing information. Ideal for blog posts, study notes, or LLM analysis." },
                  { name: "VTT (WebVTT)", desc: "Standard for HTML5 video players. Supports advanced styling and web accessibility features." }
                ].map((format, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-blue-200">
                    <h3 className="text-xl font-black text-blue-600 mb-4 uppercase tracking-widest">{format.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{format.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* === Section 4: Troubleshooting (定价页 FAQ 样式) === */}
            <section className="mb-24 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                 4. Quick Troubleshooting
              </h2>
              <div className="space-y-4">
                {[
                  { q: "Why does the tool say \"Subtitles not found\"?", a: "This message appears if the YouTube video either does not have captions enabled or is set to private. Our tool can only access publicly available subtitles." },
                  { q: "What's the difference between auto-generated and manual subtitles?", a: "Auto-generated subtitles are created by YouTube's AI and may contain errors. Manual subtitles are uploaded by the video creator and are usually 99% accurate." },
                  { q: "My bulk download failed. What should I do?", a: "Ensure each URL is on a separate line. If it persists, try a smaller batch. Pro members with 1000+ URLs should ensure a stable connection during submission." }
                ].map((faq, i) => (
                  <details key={i} className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-slate-50/50">
                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none select-none">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-6 pt-6 border-t border-slate-200 text-slate-600 leading-relaxed text-base font-medium">{faq.a}</div>
                  </details>
                ))}
              </div>
            </section>

          </div>
        </article>
      </main>

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