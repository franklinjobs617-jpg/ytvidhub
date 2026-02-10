"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function MasteringVttAnalysisGuide() {
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
        {/* === 1. HERO SECTION (Aligned with Pricing/Bulk Downloader) === */}
        <section className="relative pt-24 pb-10 md:pt-10 md:pb-2 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* Background Aurora Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Developer Technical Guide
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Mastering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Clean VTT Data
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              If you're reading this, you’re past the point of casual YouTube
              viewing. You understand that video subtitles are not just
              captions; they are <strong>raw, structured data</strong>.
            </p>
          </div>
        </section>

        {/* === 2. THE QUALITY CRISIS (Pro Style Article Layout) === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                1. The VTT Data <br /> Quality Crisis
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p>
                  The standard WebVTT (<code>.vtt</code>) file downloaded from
                  most sources is toxic to a clean database. It contains layers
                  of metadata, timecodes, and ASR noise markers that destroy the
                  purity of the linguistic data.
                </p>
              </div>

              {/* Code Snippet Wrapper */}
              <div className="mt-12 bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-white font-black uppercase tracking-widest text-xs">
                  Raw VTT Input
                </div>
                <pre className="font-mono text-sm text-blue-300 leading-relaxed overflow-x-auto">
                  <code>
                    {`WEBVTT
Kind: captions
Language: en

1:23.456 --> 1:25.789 align:start position:50%
[Music]

1:26.001 --> 1:28.112
>> Researcher: Welcome to the data hygiene`}
                  </code>
                </pre>
              </div>

              <div className="mt-12 text-slate-600 text-lg leading-relaxed mb-12">
                Your time is the most expensive variable in this equation. If
                you are still writing regex scripts to scrub this debris, your
                methodology is inefficient. The solution isn't better cleaning
                scripts; it’s better extraction.
              </div>

              {/* Real-World Data Insight Box */}
              <div className="my-16 p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div className="relative z-10">
                  <div className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    Real-World Performance Data
                  </div>
                  <p className="text-slate-700 text-lg font-semibold italic leading-relaxed">
                    "On a corpus of 50 technical conference talks, raw files
                    required 5.1s per file for scrubbing. YTVidHub's clean
                    output dropped this to 0.3s—a 17x throughput gain allowing
                    for datasets 5x larger in the same timeframe."
                  </p>
                </div>
              </div>

              {/* Window-style Figure (Figure 1) */}
              <div className="group relative">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      Comparison Engine
                    </span>
                  </div>
                  <img
                    src="/image/ytvidhub-raw-vtt-vs-clean-vtt-comparison.webp"
                    alt="Side-by-side comparison of a raw, messy WebVTT file and the clean VTT output from the YTVidHub extractor."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* Section 2: VTT vs SRT Table */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                2. WebVTT vs. SRT
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12 text-center">
                The choice between <code>.vtt</code> and <code>.srt</code> is
                crucial for HTML5 media players and advanced data analysis.
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-white mb-16">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900">
                        Feature
                      </th>
                      <th className="p-6 font-black text-xs uppercase tracking-widest text-slate-900 border-x border-slate-100">
                        SRT (.srt)
                      </th>
                      <th className="p-6 font-black text-xs uppercase tracking-widest text-blue-600">
                        WebVTT (.vtt)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium text-slate-600">
                    <tr className="border-t border-slate-100 group hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-bold text-slate-900">
                        Structure
                      </td>
                      <td className="p-6 border-x border-slate-50 italic text-slate-400">
                        Index & Timecode
                      </td>
                      <td className="p-6">
                        Timecode +{" "}
                        <strong className="text-slate-800">
                          Optional Metadata
                        </strong>
                      </td>
                    </tr>
                    <tr className="border-t border-slate-100 group hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-bold text-slate-900">
                        Punctuation
                      </td>
                      <td className="p-6 border-x border-slate-50 italic text-slate-400">
                        Basic
                      </td>
                      <td className="p-6 text-slate-800 font-bold">
                        Supports Advanced Markers
                      </td>
                    </tr>
                    <tr className="border-t border-slate-100 group hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-bold text-slate-900">Standard</td>
                      <td className="p-6 border-x border-slate-50 italic text-slate-400">
                        Informal
                      </td>
                      <td className="p-6">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-[10px] font-black">
                          W3C STANDARD
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Clean Workflow Figure (Figure 2) */}
              <div className="group relative">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      Settings Panel
                    </span>
                  </div>
                  <img
                    src="/image/ytvidhub-vtt-download-clean-mode-settings.webp"
                    alt="Screenshot showing the YTVidHub interface where users select the VTT subtitle format and activate the Clean Mode option."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: API Bypassing */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                3. Bulk Downloader <br /> Strategies
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                Your research project requires not one VTT file, but one
                hundred. This is where the YouTube Data API becomes a
                catastrophic workflow bottleneck.
              </div>

              <div className="my-16 p-10 bg-amber-50 border border-amber-200 rounded-[3rem] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:rotate-12 transition-transform">
                  ⚠️
                </div>
                <div className="relative z-10">
                  <div className="text-amber-700 font-black uppercase text-[10px] tracking-widest mb-4">
                    Critical Insight: The API Quota Wall
                  </div>
                  <p className="text-amber-900 text-lg font-semibold leading-relaxed italic">
                    "Relying on the official API for bulk acquisition is a
                    flawed O(N²) solution. You pay quota dollars per request AND
                    pay developers to write scrubbing scripts that YTVidHub
                    performs internally for free."
                  </p>
                </div>
              </div>

              {/* Figure 3 */}
              <div className="group relative">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      Bulk Playlist Process
                    </span>
                  </div>
                  <img
                    src="/image/ytvidhub-bulk-playlist-vtt-downloader.webp"
                    alt="Visual representation of the bulk subtitle downloader processing a YouTube playlist URL into multiple, clean VTT files."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Steps */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                4. Step-by-Step Guide
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Input the Target",
                    desc: "Paste the URL of a single video, or paste a Playlist URL for recursive harvesting of all video IDs.",
                  },
                  {
                    step: "02",
                    title: "Configure Output",
                    desc: "Set target language, choose VTT format, and ensure the 'Clean Mode' toggle is active.",
                  },
                  {
                    step: "03",
                    title: "Process & Notify",
                    desc: "For large batches, our server processes asynchronously. You'll receive a notification when the package is ready.",
                  },
                  {
                    step: "04",
                    title: "Structured Data Delivery",
                    desc: "The final ZIP contains pre-cleaned VTT files, logically organized for your processing scripts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1 uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: AI Output */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                5. The VTT Output
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    title: "Tokenization",
                    desc: "Feed directly into custom LLM pipelines without wasting tokens on timecode noise.",
                  },
                  {
                    title: "Topic Modeling",
                    desc: "Identify dominant themes across clusters unimpeded by technical structural junk.",
                  },
                  {
                    title: "JSON Export",
                    desc: "Easily convert the sanitized VTT into JSON objects for database storage.",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-300 transition-colors"
                  >
                    <h4 className="font-black text-slate-900 mb-3 uppercase text-[10px] tracking-widest text-blue-600">
                      {card.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Figure 4 */}
              <div className="group relative">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      JSON Structure Preview
                    </span>
                  </div>
                  <img
                    src="/image/clean-vtt-to-json-output-structure.webp"
                    alt="Example of clean VTT data converted into a structured JSON object for data analysis."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* === BOTTOM CTA SECTION === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter leading-tight">
              Stop Scrapers, <br /> Start Analyzing
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Extraction built by data scientists, for data scientists. Unlock
              bulk VTT downloads and clean mode today.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest"
            >
              <span>Start Your Bulk Download</span>
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
        </section>
      </main>

      {/* Floating Buttons */}


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
