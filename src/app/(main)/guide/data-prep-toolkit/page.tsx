"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function DataPrepToolkitPage() {
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
      <title>Advanced YouTube Subtitle Data Preparation Toolkit: Beyond Simple Downloads</title>
      <meta name="description" content="The definitive Advanced YouTube Subtitle Data Preparation Toolkit for researchers and developers. Master bulk processing, clean raw transcripts, and bypass API limits with structured JSON output." />
      <link rel="canonical" href="https://ytvidhub.com/guide/data-prep-toolkit" />

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-24 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
          
          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Advanced Researcher Guide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The Advanced <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Subtitle Data Prep Toolkit
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              The definitive guide for researchers and developers. Master bulk processing, clean raw transcripts, and bypass API limits with structured JSON output.
            </p>
          </div>
        </section>

        {/* === 2. ARTICLE CONTENT === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            
            {/* Section 1: Inefficiency */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                1. Why Your Current <br/> Workflow Is Inefficient
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  If you're a developer, researcher, or data scientist, you know that raw subtitle data from YouTube is useless. It’s a swamp of ASR errors, messy formatting, and broken timestamps. This guide is for those who need <strong>advanced YouTube Subtitle Data Preparation</strong>—the tools and methods to convert noise into clean, structured data ready for LLMs, databases, and large-scale analysis.
                </p>
                <p>
                  You cannot manually clean thousands of files. You also can't afford the YouTube Data API quota limits. If you need data from 50+ videos, you need <strong>batch processing</strong>. Our toolkit centers around resolving this efficiency bottleneck.
                </p>
                <h3 className="text-2xl font-bold text-slate-900 pt-8 uppercase tracking-tight">The Case for a Truly Clean Transcript</h3>
                <p>
                   A <strong>YouTube transcript without subtitles</strong> is often just raw output riddled with errors. Our method ensures the final output is 99% clean, standardized text, perfect for training AI models.
                </p>
              </div>

              {/* Window-style Figure (图 1) */}
              <div className="mt-20 group relative">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <img
                    src="../image/An infographic illustrating the advanced workflow.webp"
                    alt="Workflow diagram illustrating advanced YouTube data preparation from a Playlist to structured output."
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Infographic: Advanced Data Prep Pipeline
                </p>
              </div>
            </section>

            {/* Section 2: Power of Batch */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                2. The Power of Batch Processing
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                Downloading subtitles from an entire playlist is the only way to scale your project. Manual URL-by-URL extraction creates insurmountable bottlenecks.
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Step 1: Recursive Ingestion</h3>
                    <p className="text-slate-500 leading-relaxed">Simply input the playlist URL. Our tool queues every video in the list automatically, harvesting links recursively.</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Step 2: Structured Output</h3>
                    <p className="text-slate-500 leading-relaxed">Developers demand structured data. We offer <strong>JSON export</strong> with segment IDs and clean text fields, acting as a <strong>free YouTube API alternative</strong>.</p>
                 </div>
              </div>

              {/* Blue Box (Workflow Visualization) */}
              <div className="my-16 p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">📥</div>
                <div className="relative z-10">
                  <div className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4">Visualizing the Bulk Workflow</div>
                  <ol className="space-y-4 text-slate-700 font-medium">
                    <li className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-[10px]">1</span>
                      <span><strong>Activate Bulk Mode:</strong> Switch from single URL to playlist/channel processing mode.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-[10px]">2</span>
                      <span><strong>Select JSON Format:</strong> Choose structured data output to bypass complex parsing scripts.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-[10px]">3</span>
                      <span><strong>Initiate ZIP Download:</strong> Package all processed files into one clean archive.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Section 3: API Bypassing */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                3. Bypassing API Limits
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                Why pay hundreds of dollars in API quota when you only need the text? We provide superior output compared to raw extraction methods.
              </div>

              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl mb-12 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-3xl shadow-xl">
                    dlp
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3">The yt-dlp Alternative</h3>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      For power users, tools like <strong>yt-dlp</strong> are excellent, but they still require cleaning scripts. Our tool automates the cleaning <em>before</em> the download, saving you days of custom scripting and labor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-World Impact (Blue Box) */}
              <div className="my-16 p-10 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] shadow-sm">
                 <h4 className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6 border-b border-indigo-100 pb-4">Real-World Impact: Cost & Time Savings</h4>
                 <div className="space-y-6">
                    {[
                      { project: "Project A", title: "80% Cost Reduction", desc: "A 5,000-video data pull via official API was estimated at $500. Our flat credit package reduced this by 80%." },
                      { project: "Project B", title: "3 Hours vs 5 Minutes", desc: "A researcher manually cleaning a 100-video playlist with Python spent 3 hours; our tool finished in 5 minutes." },
                      { project: "Project C", title: "Labor Efficiency", desc: "Reduced manual post-cleaning time from 8 hours per 1,000 transcripts to just 30 minutes of validation." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="font-black text-indigo-300 text-sm">{item.project}</div>
                        <div>
                          <p className="font-bold text-slate-900 leading-none mb-1">{item.title}</p>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </section>

            {/* Section 4: Expert Insight */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                4. The Summarizer Myth
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  I see many people searching for a <strong>youtube video summarizer ai without subtitles</strong>. This logic is fundamentally flawed. Any AI summarizer is only as good as the input data. 
                </p>
                <p>
                   If your input is a raw, ASR-generated transcript, your summary will be riddled with errors. <strong>Our core value is providing the clean input that makes AI tools actually useful.</strong>
                </p>
              </div>

              {/* Yellow Warning Card */}
              <div className="my-16 p-8 bg-amber-50 border border-amber-200 rounded-[2rem] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:rotate-12 transition-transform">⚠️</div>
                <div className="relative z-10">
                   <div className="text-amber-700 font-black uppercase text-[10px] tracking-widest mb-4">Critical View: Garbage In, Garbage Out</div>
                   <p className="text-amber-900 text-base font-medium leading-relaxed italic">
                     "When an AI summarizer is fed raw ASR transcripts, it cannot distinguish between meaningful content and noise. Misidentified terms and run-on sentences are interpreted as factual. Data preparation isn't optional—it's the foundation."
                   </p>
                </div>
              </div>

              {/* Figure 2 */}
              <div className="group relative">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex gap-1.5 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <img
                    src="../image/ytvidhub-bulk-playlist-json-export-for-developers.webp"
                    alt="Screenshot of the Bulk Playlist Subtitle Downloader tool, highlighting the JSON Export feature for developers."
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Feature Spotlight: Structured JSON Export for Developers
                </p>
              </div>
            </section>

            {/* Section 5: Conclusion */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-8 text-center leading-tight">
                5. Conclusion
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed text-center italic max-w-2xl mx-auto">
                Data prep is the invisible 90% of any successful data project. Stop settling for messy output that costs you time and money. Our toolkit is designed by professionals, for professionals.
              </p>

              {/* Bottom CTA Box (首页风格) */}
              <div className="mt-20 text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#4f46e5,_transparent)]"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                    Scale Your Data Pipeline
                  </h3>
                  <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium leading-relaxed">
                    Stop Wrestling with API quotas. Unlock the advanced bulk and JSON features now.
                  </p>
                  <Link href="/" onClick={handleAction} className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                    <span>Unlock Pro Features</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* === 7. FAQ SECTION (完全对齐 Pricing 页 Q&A) === */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
           <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                 Technical Q&A
              </h2>
              <div className="space-y-4">
                {[
                  { 
                    q: "What makes JSON better for developers?", 
                    a: "JSON provides key-value pairs (timestamps, text, segment IDs) that allow developers to programmatically inject YouTube data into vector databases or LLM prompt chains without regex parsing." 
                  },
                  { 
                    q: "Can I process more than 1,000 URLs?", 
                    a: "Yes. Our Pro and Researcher plans allow for large-scale ingestion. If you need 10,000+ URLs processed, please contact our support for a custom enterprise solution." 
                  }
                ].map((faq, i) => (
                  <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-white">
                    <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base">{faq.a}</div>
                  </details>
                ))}
              </div>
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