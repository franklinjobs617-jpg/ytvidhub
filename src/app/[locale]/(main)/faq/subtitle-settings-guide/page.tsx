"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function SubtitleSettingsGuidePage() {
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
      {/* === SEO & Metadata (100% 原样保留) === */}
      <title>The Ultimate YouTube Subtitle Settings Guide: Fix Any CC Problem Fast</title>
      <meta name="description" content="The definitive guide to the Ultimate YouTube Subtitle Settings and quick fixes for common CC problems. Learn how to change language, size, color, and troubleshoot display issues." />
      <link rel="canonical" href="https://ytvidhub.com/faq/subtitle-settings-guide/" />

      <main>
        {/* === 1. HERO SECTION (与定价页氛围一致) === */}
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Viewer Assistance Guide
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Subtitle Settings Guide
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Fix any CC problem fast. This definitive guide shows you exactly how to adjust, fix, and optimize your closed captions on any device.
            </p>
          </div>
        </section>

        {/* === 2. ARTICLE CONTENT === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">

            {/* Section 1: Basic Control */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                1. Mastering Basic <br /> Subtitle Control
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12 text-center">
                Before we fix broken captions, let's cover the essentials. These are the controls 90% of users miss.
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Quick Fixes</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Always check the CC icon first. If missing, the uploader hasn't provided captions. This is the #1 reason <strong>why youtube subtitles are not working</strong>.
                  </p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">TV & Mobile</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    On TV, look for the CC button in playback settings. On mobile, tap the screen to reveal the "CC" toggle in the top-right corner.
                  </p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Icon Greyed Out?</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Ensure "Always show captions" is active in <strong>YouTube Settings &gt; Playback and performance</strong> to re-enable the icon globally.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Customization */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                2. Advanced Customization
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed mb-12">
                Standard white text on a black background is often hard to read. You can optimize the size, color, and font of your subtitles for a better personal experience.
              </div>

              {/* Window-style Figure (图 1) */}
              <div className="mt-12 group relative">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Accessibility Options</span>
                  </div>
                  <img
                    src="../image/youtube-player-subtitle-options-custom-style.webp"
                    alt="Screenshot of the YouTube accessibility menu showing controls for changing subtitle size and background color."
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Pro Tip: Click Gear Icon &gt; Subtitles/CC &gt; Options
                </p>
              </div>
            </section>

            {/* Section 3: Language Barrier */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                3. Changing Languages
              </h2>
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed mb-12">
                <p>
                  The most common question is <strong>"how to change language of subtitles on youtube."</strong> While simple for official tracks, auto-translated tracks often fail with technical jargon or slang.
                </p>
              </div>

              {/* Indigo Box (Common Errors) */}
              <div className="my-16 p-10 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:scale-110 transition-transform">🌐</div>
                <div className="relative z-10">
                  <div className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6">Common Auto-Translation Errors</div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <strong className="text-slate-900 block mb-2">Idiomatic Failures</strong>
                      <p className="text-slate-500 text-sm italic">Direct translations lose the true cultural meaning.</p>
                    </div>
                    <div>
                      <strong className="text-slate-900 block mb-2">Technical Inaccuracy</strong>
                      <p className="text-slate-500 text-sm italic">"Strings" in code become "ropes" in translation.</p>
                    </div>
                    <div>
                      <strong className="text-slate-900 block mb-2">Lack of Context</strong>
                      <p className="text-slate-500 text-sm italic">Sarcasm or positive slang reversed to negative.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Expert Insight */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
                4. Expert Insight
              </h2>

              {/* Yellow Critical View Card */}
              <div className="my-16 p-10 bg-amber-50 border border-amber-200 rounded-[3rem] shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:rotate-12 transition-transform">⚠️</div>
                <div className="relative z-10">
                  <div className="text-amber-700 font-black uppercase text-[10px] tracking-widest mb-4 italic underline decoration-2 decoration-amber-300">Critical View: Settings Fix the Display, Not the Data</div>
                  <p className="text-amber-900 text-lg font-semibold leading-relaxed">
                    "Changing font size won't correct a misspelled word. Making the background opaque won't fix awkward line breaks. Settings are a visual overlay. For accurate research, you must start with a clean source transcript."
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Conclusion & CTA */}
            <section className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-8 text-center leading-tight">
                5. Conclusion
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed text-center font-medium max-w-2xl mx-auto">
                You now have the power to fix any subtitle viewing issue. But if your goal is to <em>use</em> the text for study or data, your journey has just begun.
              </p>

              {/* Bottom CTA Box (首页风格) */}
              <div className="mt-20 text-center p-12 bg-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_#2563eb,_transparent)]"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
                    Need High-Quality Text?
                  </h3>
                  <p className="text-slate-400 mb-10 max-w-md mx-auto font-medium">
                    Watching is good, analyzing is better. Extract clean, timestamp-free text for your next project.
                  </p>
                  <Link href="/" onClick={handleAction} className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                    <span>Get Clean Text Now</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* === 6. FAQ SECTION (对齐全局组件风格) === */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
              Quick FAQ
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "How do I sync subtitles if they are lagging?",
                  a: "On standard YouTube settings, you can't manually shift timing. This requires downloading the SRT file and using a subtitle editor for precise time-code realignment."
                },
                {
                  q: "Can I use these settings on the YouTube TV app?",
                  a: "Yes, though the menu is simplified. While playing a video, press Up on your remote to find the CC and Gear icons."
                }
              ].map((faq, i) => (
                <details key={i} className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-blue-400 open:bg-white">
                  <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none select-none">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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