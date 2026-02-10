"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function YouTubeApiAlternativeGuide() {
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
        <section className="relative pt-24 pb-20 md:pt-10 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 (对齐定价页) */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Developer Documentation
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Ditch the API. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Get Subtitles Directly.
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              API quotas and complexity are major hurdles for data projects. Discover a professional,
              no-API alternative to get structured JSON or clean TXT data instantly.
            </p>
          </div>
        </section>

        {/* === 2. THE API BOTTLENECK SECTION === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
              The Official API <br /> is a Bottleneck
            </h2>
            <div className="text-center max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium">
              For projects requiring large-scale subtitle data, the YouTube Data API quickly becomes a technical and financial burden that slows down development.
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight border-l-4 border-rose-500 pl-6 text-left">
                  Common Developer Pain Points:
                </h3>
                <ul className="space-y-8">
                  {[
                    {
                      title: "High Quota Costs",
                      desc: "Each API call consumes valuable quota, making large-scale data extraction for LLMs prohibitively expensive.",
                      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
                    },
                    {
                      title: "Complex OAuth Setup",
                      desc: "Requires authentication, project management, and Google Cloud library overhead just to fetch a simple transcript.",
                      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    },
                    {
                      title: "Aggressive Rate Limiting",
                      desc: "Requests can easily lead to temporary IP blocks, halting your data collection pipeline unexpectedly.",
                      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-rose-50 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div className="text-left">
                        <strong className="block text-slate-900 text-lg mb-1">{item.title}</strong>
                        <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quota vs Cost Mockup */}
              <div className="relative group">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Quota Comparison Matrix</span>
                  </div>
                  <img
                    src="/image/youtube-api-quota-vs-export-cost.webp"
                    alt="YouTube Data API quota cost comparison chart: High cost of API vs. free/low-cost export using YTVidHub."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. DIRECT EXPORT SOLUTION (三列卡片) === */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 leading-tight">
              The Quota-Free, <br /> No-API Alternative
            </h2>
            <div className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium italic">
              YTVidHub uses a robust backend parser to deliver API-level functionality without the headaches, giving you direct access to pristine data.
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Structured JSON Output",
                  desc: "Get subtitles directly as a clean, easily parsable JSON object, perfect for integrating into any app or vector database.",
                  icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                },
                {
                  title: "Built for Bulk Ingestion",
                  desc: "Our engine handles entire playlists in one session, making it ideal for high-volume dataset creation for fine-tuning.",
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                },
                {
                  title: "Guaranteed Clean Data",
                  desc: "All exported data is pre-cleaned of timecodes and ASR noise, saving you 80% of data-prep time.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 text-left">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 4. JSON STRUCTURE PREVIEW (模拟代码窗口) === */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center">
              Predictable, Clean JSON
            </h2>
            <div className="text-center text-slate-500 text-lg mb-16 font-medium">
              We provide a simple, speaker-segmented JSON structure that is immediately ready for database import.
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex gap-2 items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                  <span className="ml-4 text-xs font-mono text-slate-400">subtitle_schema_preview.json</span>
                </div>
                <div className="p-2 md:p-4 bg-slate-900">
                  <img
                    src="/image/clean-json-data-structure-for-llm.webp"
                    alt="Example of clean JSON data structure for LLM training, showing clearly organized subtitle segments."
                    className="w-full h-auto rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 5. CTA SECTION (对齐首页) === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter leading-tight">
              Ready to Ditch <br /> the API Quota?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Stop fighting with Rate Limits. Start building with high-quality data. Get your first structured export in seconds.
            </p>
            <Link href="/" onClick={handleAction} className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
              <span>Start Free Export</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* === 6. DEVELOPER FAQ (对齐 FAQ 组件样式) === */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-left">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
              Developer FAQ
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What are the rate limits for the YTVidHub tool?",
                  a: "Our free plan offers generous daily limits for casual use. For large-scale or programmatic needs, our paid plans provide significantly higher limits and are designed for production-level data collection."
                },
                {
                  q: "How do you handle multiple available languages?",
                  a: "Our tool automatically detects all available subtitle tracks (both human-translated and auto-generated). You can select the specific language tag needed from the interactive menu."
                },
                {
                  q: "Is this compliant with YouTube's Terms of Service?",
                  a: "We provide access to publicly available content. We strongly encourage users to respect copyright laws and use the data in accordance with YouTube’s policies, focusing on fair use cases like research and LLM training."
                }
              ].map((faq, i) => (
                <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-slate-50/50">
                  <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base font-medium">{faq.a}</div>
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