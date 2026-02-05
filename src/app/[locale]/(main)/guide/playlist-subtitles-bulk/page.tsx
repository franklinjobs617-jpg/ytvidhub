"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function PlaylistBulkDownloadGuide() {
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

      <main>
        {/* === 1. HERO SECTION (Aligned with Pricing/Home) === */}
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-24 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          {/* Background Aurora Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Power User Guide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Download Every Playlist <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Subtitle in One Click
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Stop wasting hours on manual downloads. Here’s the definitive method to get every subtitle from any playlist as a single, clean ZIP file.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/" 
                onClick={handleAction}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 text-xs uppercase tracking-widest"
              >
                Go to Bulk Downloader →
              </Link>
            </div>
          </div>
        </section>

        {/* === 2. THE DILEMMA SECTION (Pain vs Gain) === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
               The Data Collector's <br/> Dilemma
            </h2>
            <div className="text-center max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium italic">
                Manually processing a 50-video playlist is a nightmare of inefficiency. It’s slow, tedious, and delivers messy results. There is a better way.
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight border-l-4 border-rose-500 pl-6">
                  The Old Way is Broken:
                </h3>
                <ul className="space-y-8">
                  {[
                    { 
                        title: "150+ Clicks", 
                        desc: "Repetitive, mind-numbing navigation for each video in the sequence.", 
                        icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5",
                        color: "rose"
                    },
                    { 
                        title: "Hours Wasted", 
                        desc: "Time lost to tedious tasks that should be automated for research focus.", 
                        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                        color: "rose"
                    },
                    { 
                        title: "Messy Files", 
                        desc: "Raw SRTs full of timestamps and junk that require manual post-cleaning.", 
                        icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
                        color: "rose"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-rose-50 rounded-2xl text-rose-500">
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

              {/* Efficiency Comparison Mockup */}
              <div className="relative group">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Efficiency Matrix</span>
                  </div>
                  <img
                    src="../image/youtube-playlist-subtitles-bulk-download-efficiency.webp"
                    alt="Manual vs. YTVidHub: Efficiency comparison for bulk downloading all YouTube playlist subtitles in one ZIP file."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. THE 3-STEP SOLUTION (Vertical Timeline) === */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center leading-tight">
               The 3-Step Solution
            </h2>
            <div className="text-center max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed mb-20 font-medium">
                Our Bulk Engine transforms hours of work into seconds. Follow this simple workflow to get all your subtitles instantly.
            </div>

            <div className="space-y-16">
               {[
                 { 
                    step: "1", 
                    title: "Paste Your Playlist URL", 
                    desc: "Navigate to the YTVidHub Bulk Downloader and paste the full URL of the YouTube playlist you need. Our engine recursively scans for every video ID." 
                 },
                 { 
                    step: "2", 
                    title: "Select Your Desired Format", 
                    desc: "Choose your output format—we recommend Clean TXT for research or JSON for development. The files are delivered ready-to-use.",
                    img: "../image/ytvidhub-playlist-export-formats-clean-txt.webp",
                    imgAlt: "Screenshot of YTVidHub's bulk export: Clean TXT, JSON, and SRT files contained within the single downloaded ZIP archive."
                 },
                 { 
                    step: "3", 
                    title: "Download Your Single ZIP File", 
                    desc: "Click 'Download.' YTVidHub processes everything server-side and packages all subtitles into one organized ZIP file. One click, one file, project done.",
                    isSuccess: true 
                 }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group">
                   <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg ${item.isSuccess ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                         {item.isSuccess ? '✓' : item.step}
                      </div>
                      {i < 2 && <div className="w-px h-full bg-slate-100 my-4"></div>}
                   </div>
                   <div className="pb-12">
                      <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed mb-8">{item.desc}</p>
                      {item.img && (
                        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xl p-1 bg-white">
                           <img src={item.img} alt={item.imgAlt} className="w-full h-auto rounded-xl" />
                        </div>
                      )}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* === 4. FEATURE GRID (Aligned with Pricing Cards) === */}
        <section className="py-24 bg-slate-50/50 border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-16 text-center">
               A Smarter Workflow
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                    title: "Built for Speed", 
                    desc: "Server-side processing means the entire playlist is handled in seconds, regardless of its size.", 
                    icon: "M13 10V3L4 14h7v7l9-11h-7z" 
                },
                { 
                    title: "Research-Ready Data", 
                    desc: "Our 'Clean TXT' format strips away all timestamps and metadata, giving you pure text.", 
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                },
                { 
                    title: "No API Headaches", 
                    desc: "Forget complex code, authentication, and restrictive quotas. Just paste a URL and download.", 
                    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7v10M12 21v-8M20 7v10" 
                },
                { 
                    title: "One Organized File", 
                    desc: "All subtitles are packaged into a single, logically named ZIP file. No more scattered downloads.", 
                    icon: "M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2z" 
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 5. CTA SECTION (Aligned with Home) === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter leading-tight">
              Ready for Pro Data Prep?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
               Downloading is just the start. Build a robust data pipeline for LLM training or advanced research with our industrial-strength extraction tools.
            </p>
            <Link href="/data-prep-guide" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
              <span>Read The Data Prep Guide</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* === 6. FAQ SECTION (Aligned with standard Q&A) === */}
        <section className="py-24 bg-white border-t border-slate-100">
           <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
                 Technical Q&A
              </h2>
              <div className="space-y-4">
                {[
                  { 
                    q: "Does YTVidHub handle all languages in a playlist?", 
                    a: "Yes. Our bulk downloader detects all available languages (both original and auto-generated) for every video in the playlist, allowing you to select the required language before you download." 
                  },
                  { 
                    q: "Can I download subtitles for a whole YouTube Channel?", 
                    a: "Our Bulk Engine is optimized for Playlist URLs. To download all videos from a Channel, simply place the Channel's videos into a temporary playlist on YouTube and use our tool with that URL." 
                  }
                ].map((faq, i) => (
                  <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-slate-50/50">
                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed font-medium">{faq.a}</div>
                  </details>
                ))}
              </div>
           </div>
        </section>
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