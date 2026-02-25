"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function AboutPage() {
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

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-10 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100">
                Our Story
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Built for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Creative Community
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
              We build tools that respect your time, simplify your data
              workflow, and empower your research.
            </p>
          </div>
        </section>

        {/* === 2. STORY & MISSION (纯净排版) === */}
        <article className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="max-w-4xl mx-auto text-center mb-32">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-slate-900 mb-10 border-b border-slate-100 pb-8 inline-block">
                Our Mission
              </h2>
              <div className="text-lg md:text-xl text-slate-600 leading-[2] space-y-8 font-medium">
                <p>
                  YTVidHub was born from a simple frustration: downloading
                  subtitles from multiple YouTube videos was a slow, repetitive,
                  and inefficient process.
                </p>
                <p className="text-slate-900 font-bold italic">
                  "As researchers and creators, we spent countless hours copying
                  files one by one. We knew there had to be a better way."
                </p>
                <p>
                  Our goal is to provide the most efficient and user-friendly
                  YouTube subtitle downloader on the web.
                </p>
              </div>
            </div>

            {/* 三大原则 - 升级为定价页同款极简卡片 */}
            <div className="grid md:grid-cols-3 gap-10 mb-32">
              {[
                {
                  title: "Efficiency First",
                  icon: "⚡",
                  desc: "Our bulk download feature is the heart of YTVidHub. We respect your time by accelerating your data gathering.",
                },
                {
                  title: "Free & Global",
                  icon: "🌍",
                  desc: "A generous free tier for everyone, supported by premium options that ensure our long-term server growth.",
                },
                {
                  title: "Privacy Secure",
                  icon: "🛡️",
                  desc: "We believe in your right to privacy. Our service is anonymous; we never track your URLs or store your data.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Illustration Section (Window Mockup 保持专业感) */}
            <div className="max-w-4xl mx-auto group">
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-1 transition-transform duration-700 group-hover:scale-[1.01]">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-4 text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-tight">
                    Mission_Flow_v1.png
                  </span>
                </div>
                <img
                  src="/image/Illustration of multiple YouTube video thumbnails flowing into a download folder, representing fast bulk subtitle downloading.webp"
                  alt="Fast bulk subtitle downloading visualization"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <section id="contact" className="mt-48">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest text-slate-900 mb-12 leading-tight">
                  Get In Touch
                </h2>

                <div className="relative p-12 md:p-20 rounded-[3rem] bg-white border border-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.05)] overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-[80px]"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 rounded-full blur-[80px]"></div>

                  <div className="relative z-10">
                    <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
                      Have a question, feedback, or a feature request?{" "}
                      <br className="hidden md:block" />
                      Our team is ready to listen.
                    </p>

                    <div className="inline-flex flex-col items-center group">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">
                        Official Support Email
                      </span>
                      <a
                        href="mailto:franklinjobs617@gmail.com"
                        className="text-2xl md:text-5xl font-display font-black text-slate-900 hover:text-blue-600 transition-all duration-300 border-b-4 border-slate-100 hover:border-blue-200 pb-2"
                      >
                        admin@ytvidhub.com
                      </a>
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-6">
                      <div className="flex items-center gap-3 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                          Average Response: 48h
                        </span>
                      </div>
                      <p className="text-slate-400 text-[13px] italic max-w-md">
                        Note: Email is the most effective way to ensure your
                        message reaches the right engineer on our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>


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
