"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

export default function FAQPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtns(window.scrollY > 300);

      const sections = ["general", "using-tool", "troubleshooting", "privacy"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqData = {
    general: {
      title: "General Questions",
      items: [
        {
          q: "Is YTVidHub completely free to use?",
          a: (
            <>
              The basic functionality is free. We provide a complimentary{" "}
              <strong>5 Credits per day</strong> to all users, which is enough
              to bulk download 5 YouTube URLs. Premium access for high-volume
              use and our AI Transcription feature requires a subscription to
              manage our server and processing costs.
            </>
          ),
        },
        {
          q: "Do I need to create an account to use the service?",
          a: "No registration is required for basic use. YTVidHub is designed to be as simple as possible. Just visit our site, paste your URL(s), and download your files instantly within the free daily limit.",
        },
        {
          q: "Is this service legal?",
          a: "Downloading publicly available subtitles for personal use, such as for accessibility, language learning, or research, generally falls under fair use. However, you should always respect the copyright of the content creator.",
        },
      ],
    },
    using: {
      title: "Using the Tool",
      items: [
        {
          q: "How do I download subtitles for a single video?",
          a: (
            <>
              Simply copy the URL of the YouTube video you're interested in,
              paste it into the input box on our{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                homepage
              </Link>
              , and click the 'Analyze' button.
            </>
          ),
        },
        {
          q: "How does the bulk subtitle downloader work?",
          a: "To download subtitles from multiple videos at once, paste each YouTube URL on a new line in the input box. Our tool will process all of them and package the files into a single, convenient ZIP archive.",
        },
        {
          q: "What's the difference between SRT, VTT, and TXT formats?",
          a: (
            <>
              <strong>SRT</strong> files include timestamps for video players.{" "}
              <strong>VTT</strong> is a modern standard for web videos.{" "}
              <strong>TXT</strong> files are plain text transcripts without
              timing, ideal for reading or LLM analysis.
            </>
          ),
        },
      ],
    },
    trouble: {
      title: "Troubleshooting",
      items: [
        {
          q: "Why does the tool say 'Subtitles not found'?",
          a: "This message appears if the YouTube video either does not have any manual subtitles available or if the subtitles have been disabled by the video owner. Our tool prioritizes high-quality, manually created captions.",
        },
        {
          q: "The download isn't working. What should I do?",
          a: "First, ensure the YouTube URL is correct and public. Try clearing your browser cache or disabling any ad-blocking extensions. If you've exceeded your daily free limit, you may need to wait or upgrade.",
        },
        {
          q: "Can I download subtitles for private or age-restricted videos?",
          a: "No. Our tool can only access content that is publicly available on YouTube. It cannot process private videos or content that requires a login to view.",
        },
      ],
    },
    privacy: {
      title: "Privacy & Security",
      items: [
        {
          q: "Do you store my data or the videos I download?",
          a: (
            <>
              No. We have a strict privacy policy. We do not store the URLs you
              enter, the files you download, or your IP address. The entire
              process is automated and anonymous. You can read our full{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy here
              </Link>
              .
            </>
          ),
        },
      ],
    },
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <title>Frequently Asked Questions (FAQ) | YTVidHub Help Center</title>
      <meta
        name="description"
        content="Find answers to common questions about our YouTube subtitle downloader. Learn about formats, bulk downloading, troubleshooting, privacy, and more in our FAQ."
      />
      <link rel="canonical" href="https://ytvidhub.com/faq/" />

      {/* Schema.org FAQ-LD */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is YTVidHub completely free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The basic functionality is free. We provide a complimentary 5 Credits per day to all users."
                }
              }
            ]
          }
        `}
      </script>

      <main>
        {/* === 1. HERO SECTION (视觉氛围对齐) === */}
        <section className="relative pt-24 pb-20 md:pt-10 md:pb-0 overflow-hidden bg-slate-50 bg-[url('data:image/svg+xml,%3Csvg_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22%23e5e7eb%22_fill-opacity=%220.5%22_fill-rule=%22evenodd%22%3E%3Cpath_d=%22M0_40L40_0H20L0_20M40_40V20L20_40%22/%3E%3C/g%3E%3C/svg%3E')]">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>

          {/* 背景光晕 */}
          <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] bg-blue-400/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                Help Center
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Frequently Asked <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">
                Questions
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Your questions, answered. Find everything you need to know about
              using YTVidHub below.
            </p>
          </div>
        </section>

        {/* === 2. FAQ CONTENT WITH TOC SIDEBAR === */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-16 items-start">
              {/* Sidebar Table of Contents */}
              <aside className="hidden lg:block sticky top-32">
                <p className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 pl-4 border-l-4 border-blue-600">
                  Categories
                </p>
                <nav className="flex flex-col space-y-1">
                  {[
                    { id: "general", label: "General" },
                    { id: "using-tool", label: "Using the Tool" },
                    { id: "troubleshooting", label: "Troubleshooting" },
                    { id: "privacy", label: "Privacy & Security" },
                  ].map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        activeSection === cat.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {cat.label}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main FAQ List */}
              <div className="space-y-24">
                {/* General Section */}
                <section id="general" className="scroll-mt-32">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">
                    General Questions
                  </h2>
                  <div className="space-y-4">
                    {faqData.general.items.map((item, i) => (
                      <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </section>

                {/* Using Tool Section */}
                <section id="using-tool" className="scroll-mt-32">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">
                    Using the Tool
                  </h2>
                  <div className="space-y-4">
                    {faqData.using.items.map((item, i) => (
                      <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </section>

                {/* Troubleshooting Section */}
                <section id="troubleshooting" className="scroll-mt-32">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">
                    Troubleshooting
                  </h2>
                  <div className="space-y-4">
                    {faqData.trouble.items.map((item, i) => (
                      <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </section>

                {/* Privacy Section */}
                <section id="privacy" className="scroll-mt-32">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-10 border-b border-slate-100 pb-4">
                    Privacy & Security
                  </h2>
                  <div className="space-y-4">
                    {faqData.privacy.items.map((item, i) => (
                      <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. BOTTOM CTA === */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 italic tracking-tighter">
              Still have <br /> questions?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Can't find what you're looking for? Contact our support team
              directly or explore our latest Pro updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:franklinjobs617@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 shadow-xl shadow-blue-500/20 uppercase text-xs tracking-widest"
              >
                Contact Support
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black py-5 px-14 rounded-2xl transition-all hover:-translate-y-1 uppercase text-xs tracking-widest border border-white/10"
              >
                Try Bulk Downloader
              </Link>
            </div>
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

// 内部组件：FaqItem 对齐 FAQ 全局组件样式
function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <details className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-400 open:bg-slate-50/50">
      <summary className="flex justify-between items-center font-bold text-lg text-slate-800 list-none focus:outline-none select-none">
        <span>{question}</span>
        <svg
          className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="mt-4 pt-6 border-t border-slate-100 text-slate-600 leading-relaxed text-base font-medium">
        {answer}
      </div>
    </details>
  );
}
