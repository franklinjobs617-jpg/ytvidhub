"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function TermsOfServicePage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const [activeTab, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtns(window.scrollY > 300);

      // 侧边栏高亮逻辑
      const sections = ["acceptance", "service", "responsibilities", "disclaimer", "liability", "property", "termination", "changes", "law"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "acceptance", label: "1. Acceptance" },
    { id: "service", label: "2. Service Description" },
    { id: "responsibilities", label: "3. User Conduct" },
    { id: "disclaimer", label: "4. Disclaimer" },
    { id: "liability", label: "5. Liability" },
    { id: "property", label: "6. Intellectual Property" },
    { id: "termination", label: "7. Termination" },
    { id: "changes", label: "8. Changes to Terms" },
    { id: "law", label: "9. Governing Law" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <title>Terms of Service | YTVidHub - Usage Guidelines</title>
      <meta name="description" content="Review the Terms of Service for using YTVidHub. This document outlines your responsibilities, our liability, and the proper use of our free subtitle downloader." />
      <link rel="canonical" href="https://ytvidhub.com/terms-of-service/" />

      <main>
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Legal Documentation
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Terms of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Service
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-6 leading-relaxed font-medium">
              Please read these terms carefully before using our service.
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Last Updated: October 11, 2025
            </p>
          </div>
        </section>

        {/* === 2. CONTENT WITH SIDEBAR === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Sidebar TOC (对齐专业文档风格) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pl-4 border-l-4 border-blue-600">Sections</p>
                <nav className="flex flex-col space-y-1">
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                        ? "bg-blue-50 text-blue-600 translate-x-2"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main Clauses Area */}
              <div className="lg:col-span-9">
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-[2] space-y-16">

                  <section id="acceptance" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      1. Acceptance of Terms
                    </h2>
                    <p>
                      By accessing and using YTVidHub (the &quot;Service&quot;), you accept and
                      agree to be bound by the terms and provision of this agreement. If
                      you do not agree to abide by these terms, please do not use this
                      Service.
                    </p>
                  </section>

                  <section id="service" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      2. Description of Service
                    </h2>
                    <p>
                      YTVidHub provides a tool that allows users to download publicly
                      available subtitles from videos hosted on YouTube. The Service is
                      provided for personal, non-commercial use. We are an independent
                      service and are not affiliated with, sponsored, or endorsed by
                      YouTube or Google LLC.
                    </p>
                  </section>

                  <section id="responsibilities" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      3. User Responsibilities
                    </h2>
                    <p className="mb-8 font-bold text-slate-900">You, the user, agree to the following:</p>
                    <ul className="space-y-6 list-none p-0">
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">Content Rights</strong>
                        You are solely responsible for ensuring you have the legal right to access the content. The subtitles are the intellectual property of the respective YouTube content creators.
                      </li>
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">Permitted Use</strong>
                        The Service is intended for personal, educational, or research purposes under fair use. You agree not to use the downloaded subtitles for any commercial purposes without permission.
                      </li>
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">Prohibited Actions</strong>
                        You agree not to misuse the Service. This includes attempting to disrupt our servers, excessive scraping, or using the Service for illegal activities.
                      </li>
                    </ul>
                  </section>

                  <section id="disclaimer" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      4. Disclaimer of Warranties
                    </h2>
                    <p>
                      The Service is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis.
                      YTVidHub makes no warranty that the Service will be uninterrupted,
                      timely, secure, or error-free. We do not guarantee the accuracy,
                      completeness, or availability of any subtitles.
                    </p>
                  </section>

                  <section id="liability" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      5. Limitation of Liability
                    </h2>
                    <p>
                      In no event shall YTVidHub or its owners be liable for any direct,
                      indirect, incidental, special, or consequential damages resulting
                      from the use or the inability to use the Service. This includes liability for
                      any copyright infringement claims that may arise from your use of
                      the downloaded content.
                    </p>
                  </section>

                  <section id="property" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      6. Intellectual Property
                    </h2>
                    <p>
                      All content on this website, including the YTVidHub name, logo,
                      design, and underlying code, is the property of YTVidHub. The YouTube name and logo are trademarks of Google LLC.
                    </p>
                  </section>

                  <section id="termination" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      7. Termination of Service
                    </h2>
                    <p>
                      We reserve the right to modify, suspend, or terminate the Service
                      at any time, for any reason, without notice. We will not be liable
                      to you or any third party for any modification.
                    </p>
                  </section>

                  <section id="changes" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      8. Changes to Terms
                    </h2>
                    <p>
                      We may revise these Terms of Service from time to time. The most
                      current version will always be posted on this page. By continuing
                      to use the Service, you agree to be bound by the revised terms.
                    </p>
                  </section>

                  <section id="law" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4">
                      9. Governing Law
                    </h2>
                    <div className="p-8 rounded-[2rem] bg-blue-50 border border-blue-100 shadow-sm">
                      <p className="text-blue-900 font-bold m-0 leading-relaxed">
                        This agreement shall be governed by and construed in accordance
                        with the laws of the State of Delaware, United States, without
                        regard to its conflict of law provisions.
                      </p>
                    </div>
                  </section>

                </div>
              </div>
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