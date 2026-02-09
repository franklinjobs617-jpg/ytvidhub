"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function PrivacyPolicyPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const [activeTab, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtns(window.scrollY > 300);

      const sections = [
        "introduction",
        "no-collection",
        "analytics",
        "cookies",
        "third-parties",
        "security",
        "changes",
        "contact",
      ];
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
    { id: "introduction", label: "1. Introduction" },
    { id: "no-collection", label: "2. Zero Collection" },
    { id: "analytics", label: "3. Anonymous Analytics" },
    { id: "cookies", label: "4. Cookies" },
    { id: "third-parties", label: "5. Third Parties" },
    { id: "security", label: "6. Data Security" },
    { id: "changes", label: "7. Changes" },
    { id: "contact", label: "8. Contact Us" },
  ];

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <title>Privacy Policy | YTVidHub - Your Data Protection</title>
      <meta
        name="description"
        content="Read the official Privacy Policy for YTVidHub. We explain what little data we collect, our commitment to anonymity, and how we protect your privacy."
      />
      <link rel="canonical" href="https://ytvidhub.com/privacy-policy/" />

      <main>
        {/* === 1. HERO SECTION (视觉风格与 Terms 保持高度一致) === */}
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Data Protection
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Privacy Policy
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-6 leading-relaxed font-medium">
              Your privacy is not just a policy, it&apos;s our core design
              philosophy.
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Last Updated: October 11, 2025
            </p>
          </div>
        </section>

        {/* === 2. MAIN CONTENT WITH SIDEBAR (布局与 Terms 完全同步) === */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Sidebar TOC (随动高亮目录) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 pl-4 border-l-4 border-blue-600">
                  Sections
                </p>
                <nav className="flex flex-col space-y-1">
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                        ? "bg-blue-50 text-blue-600 translate-x-2 shadow-sm"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main Policy Content */}
              <div className="lg:col-span-9">
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-[2] space-y-20">
                  <section id="introduction" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      1. Introduction
                    </h2>
                    <p>
                      Welcome to YTVidHub (&quot;we&quot;, &quot;our&quot;, or
                      &quot;us&quot;). We are deeply committed to protecting the
                      privacy of our users. This Privacy Policy explains our
                      principles regarding your information. Our guiding rule is
                      simple: we collect the absolute minimum amount of
                      information required, and we have architected our system
                      to be <strong>anonymous by design.</strong>
                    </p>
                  </section>

                  <section id="no-collection" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      2. The Data We Do Not Collect
                    </h2>
                    <p className="mb-8 font-bold text-slate-900">
                      Our service is built to be stateless. We explicitly DO NOT
                      collect or store:
                    </p>
                    <ul className="space-y-6 list-none p-0">
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">
                          Your IP Address
                        </strong>
                        Your IP address is not logged or stored on our servers
                        in connection with your activity.
                      </li>
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">
                          Submitted URLs
                        </strong>
                        The YouTube video URLs you paste are used in real-time
                        and are immediately discarded. They are never written to
                        any database.
                      </li>
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">
                          Downloaded Files
                        </strong>
                        Subtitle files are generated on-the-fly and streamed
                        directly to you. They never touch our physical hard
                        drives.
                      </li>
                      <li className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
                        <strong className="text-slate-900 block mb-2 uppercase text-xs tracking-widest text-blue-600 font-black">
                          Personal Info
                        </strong>
                        We do not have an account system for free users. We do
                        not ask for or store your name or email address.
                      </li>
                    </ul>
                  </section>

                  <section id="analytics" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      3. Anonymous Analytics
                    </h2>
                    <p>
                      We use a privacy-centric web analytics service that does
                      not track individual users. The data we collect is
                      anonymous, aggregated, and includes: Total Page Views,
                      General Geographic Data (Country Level), Referrer
                      Information, and Browser Type.
                    </p>
                  </section>

                  <section id="cookies" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      4. Our Stance on Cookies
                    </h2>
                    <p>
                      YTVidHub does not use cookies for tracking, advertising,
                      or profiling. Any essential cookies used would be strictly
                      for basic site functionality and would not contain
                      personal information.
                    </p>
                  </section>

                  <section id="third-parties" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      5. Third-Party Interactions
                    </h2>
                    <p>
                      Our tool interacts with YouTube&apos;s public
                      infrastructure server-side to protect your privacy. Your
                      browser only communicates with our servers, not directly
                      with YouTube&apos;s servers through our tool.
                    </p>
                  </section>

                  <section id="security" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      6. Data Security
                    </h2>
                    <p>
                      We employ standard security practices, including HTTPS for
                      all communications, to ensure that your interaction with
                      our site is secure and encrypted, protecting it from
                      eavesdropping.
                    </p>
                  </section>

                  <section id="changes" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      7. Changes to Policy
                    </h2>
                    <p>
                      We may update this policy to reflect changes in our
                      practices. The &quot;Last Updated&quot; date at the top
                      will always indicate when the last changes were made.
                    </p>
                  </section>

                  <section id="contact" className="scroll-mt-32">
                    <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wide text-slate-900 mb-6 border-b border-slate-100 pb-4 leading-tight">
                      8. How to Contact Us
                    </h2>
                    <div className="p-8 rounded-[2rem] bg-blue-50 border border-blue-100 shadow-sm">
                      <p className="text-blue-900 font-bold mb-2 uppercase text-xs tracking-widest">
                        Official Contact
                      </p>
                      <a
                        href="mailto:franklinjobs617@gmail.com"
                        className="text-2xl font-black text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        franklinjobs617@gmail.com
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
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
