"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function SpanishYTChannelsBlogPage() {
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

  const channels = [
    { title: "Easy Spanish", desc: "The gold standard. Street interviews with clear, authentic pronunciation and exceptionally high-quality subtitles.", icon: "🇪🇸" },
    { title: "SpanishPod101", desc: "Structured lessons for all levels, often featuring dual-language subtitles for easy comparison.", icon: "🎧" },
    { title: "Luisito Comunica", desc: "High-energy travel vlogs. Perfect for advanced learners to practice listening to fast, natural speech.", icon: "✈️" },
    { title: "La Cocina de Elena", desc: "Learn everyday vocabulary and cooking terms by following along with authentic Spanish recipes.", icon: "🍳" },
    { title: "Draw My Life en Español", desc: "Simple, engaging narratives with visuals that aid comprehension. Subtitles are consistently excellent.", icon: "✏️" },
    { title: "Curiosamente", desc: "Animated educational videos on a wide range of topics, great for expanding specific vocabulary sets.", icon: "💡" },
    { title: "Noticias Telemundo", desc: "For advanced learners who want to practice with formal, broadcast-quality Spanish news reports.", icon: "📰" },
    { title: "EnchufeTV", desc: "Hilarious comedy sketches. Excellent for picking up modern slang and understanding fast-paced dialogue.", icon: "🎭" },
    { title: "BookBox Spanish", desc: "Animated children's stories with subtitles that are perfectly synced, ideal for beginners.", icon: "📚" },
    { title: "TED en Español", desc: "Inspiring talks on diverse subjects, providing exposure to academic and professional language.", icon: "🎤" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-10 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Language Learning Guide
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Top Spanish <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Immersion Channels
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Struggling to find quality content? We've curated the best YouTube channels with reliable subtitles,
              perfect for extracting text and supercharging your Spanish.
            </p>
          </div>
        </section>

        {/* === 2. CURATED CHANNEL LIST (网格化升级) === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center leading-tight">
              Our Curated Top 10 <br /> Channels
            </h2>
            <div className="text-center max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed mb-20 font-medium italic">
              Each of these channels consistently provides high-quality Spanish subtitles, making them ideal for vocabulary extraction.
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {channels.map((channel, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-300 hover:shadow-xl hover:bg-white group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                      {channel.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{channel.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">{channel.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 3. STUDY METHOD (步骤引导) === */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center leading-tight">
              The Subtitle-to-Anki <br /> Workflow
            </h2>
            <div className="text-center max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed mb-20 font-medium italic">
              Watching is passive. True learning happens when you actively engage.
              Here’s how to turn any video from these channels into a powerful study tool.
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                {[
                  { step: "1", title: "Download Subtitles", desc: "Paste the URL into YTVidHub and select the 'Clean TXT' format to get a pure text file without any timestamps." },
                  { step: "2", title: "Identify Vocabulary", desc: "Read through the transcript and copy interesting sentences or idiomatic expressions you want to master." },
                  { step: "3", title: "Create Anki Cards", desc: "Paste the Spanish sentence on the front and its translation on the back. Review daily for rapid growth." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Window-style Figure Mockup */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">Study Workflow Visualization</span>
                  </div>
                  <img
                    src="/image/language-learning-anki-youtube-workflow.webp"
                    alt="Language learning workflow: Scene showing the use of YouTube subtitle data for language study materials."
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 4. CTA SECTION (对齐首页风格) === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter leading-tight">
              Ready to Build Your <br /> Vocabulary Library?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Want to extract subtitles from an entire channel's playlist for vocabulary mining? Our bulk downloader gets all the data you need in one click.
            </p>
            <Link href="/tools/playlist-subtitles-bulk" className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest">
              <span>Read The Bulk Download Guide</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="py-12 bg-white text-center">
          <p className="text-slate-400 text-sm font-medium">
            Extract subtitles for free today using our powerful <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-600 hover:underline">Bulk Downloader</Link>.
          </p>
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