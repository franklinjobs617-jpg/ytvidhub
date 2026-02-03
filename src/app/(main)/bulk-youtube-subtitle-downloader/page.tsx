"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import BulkDownloaderSchema from "@/components/seo/BulkDownloaderSchema";

export default function BulkDownloaderPage() {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showScrollBtns, setShowScrollBtns] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 text-slate-800 antialiased">
      <BulkDownloaderSchema />

      <main>
        {/* === 1. HERO SECTION (保持原有样式) === */}
        <section className="bg-slate-50 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[35rem] h-[35rem] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[100px] animate-pulse"></div>

          <div className="relative pt-12 pb-16 text-center px-6 z-10">
            {/* 关键词注入 H1 */}
            <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase tracking-wide text-slate-900 mb-6 drop-shadow-sm leading-tight">
              <span className="text-blue-600">Bulk YouTube Subtitle Downloader</span> - Extract Captions from Playlists
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
              The most powerful <strong>bulk YouTube subtitle downloader</strong> for extracting SRT, VTT, and TXT captions from entire playlists, channels, and multiple videos. Perfect for <strong>AI training datasets</strong>, content creation, and accessibility projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/"
                onClick={handleAction}
                className="px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 text-xs uppercase tracking-widest"
              >
                Start Bulk Downloading
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border-2 border-slate-100 shadow-sm transition-all hover:-translate-y-1 text-xs uppercase tracking-widest"
              >
                View Pricing Plans
              </Link>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-200 shadow-2xl p-1">
                <div className="bg-slate-50 rounded-[1.8rem] p-6 md:p-10 border border-slate-100">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-inner text-left font-mono text-xs leading-7 text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">01.</span>
                        <span>https://youtube.com/watch?v=Example1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">02.</span>
                        <span>https://youtube.com/playlist?list=Example2</span>
                      </div>
                      <div className="mt-2 text-slate-300 italic opacity-60">
                        ... (Batch process 1000+ Subtitles at once)
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-500/20 rotate-3">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                        One Organized ZIP
                      </h3>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        SRT, VTT, or Plain TXT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === [新增板块]：针对 Google 关键词的文本导流 (SEO 内容) === */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Bulk YouTube Subtitle Extraction</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                YTVidHub is the industry-leading <strong>bulk YouTube subtitle downloader</strong> trusted by AI researchers, content creators, and accessibility professionals worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Playlist Subtitle Download</h3>
                <p className="text-slate-600">Extract subtitles from entire YouTube playlists with thousands of videos in one operation.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast Processing</h3>
                <p className="text-slate-600">Our advanced <strong>batch YouTube subtitle extractor</strong> processes hundreds of videos simultaneously.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Multiple Format Support</h3>
                <p className="text-slate-600">Download in SRT, VTT, or clean TXT format - perfect for any use case or platform.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Why Choose Our Bulk YouTube Subtitle Downloader?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">For AI & Machine Learning</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Clean TXT format perfect for training datasets</li>
                    <li>• Bulk extraction for large-scale AI projects</li>
                    <li>• Automated processing saves weeks of manual work</li>
                    <li>• Compatible with popular ML frameworks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">For Content Creators</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Extract transcripts for blog content creation</li>
                    <li>• Download channel archives for backup</li>
                    <li>• Create accessible content with proper captions</li>
                    <li>• Repurpose video content across platforms</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 2. COMPARISON SECTION (保持原有样式) === */}
        <section className="py-20 md:py-28 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4 tracking-tight">
              Advanced Bulk YouTube Subtitle Extraction Technology
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              See how our <strong>professional bulk YouTube subtitle downloader</strong> transforms your subtitle extraction workflow.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    ✕
                  </span>
                  Manual Subtitle Download
                </h3>
                <ul className="space-y-4 text-slate-500 text-sm">
                  <li>• Open dozens of browser tabs and wait.</li>
                  <li>• Click "download srt" for every single video manually.</li>
                  <li>• Deal with cryptically named files like "captions.srt".</li>
                  <li>• Waste hours renaming and organizing files.</li>
                  <li>• Limited to one video at a time - no bulk processing.</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-white border-2 border-blue-600 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Professional
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    ✓
                  </span>
                  YTVidHub Bulk Subtitle Downloader
                </h3>
                <ul className="space-y-4 text-slate-700 text-sm font-medium">
                  <li className="flex gap-3 items-center">
                    ✓ Paste entire playlist or channel URL for bulk processing.
                  </li>
                  <li className="flex gap-3 items-center">
                    ✓ Download <strong>YouTube playlist subtitles</strong> with one click.
                  </li>
                  <li className="flex gap-3 items-center">
                    ✓ Clean SRT/VTT/TXT files named by video title.
                  </li>
                  <li className="flex gap-3 items-center">
                    ✓ Process thousands of videos simultaneously.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Bulk YouTube Subtitle Download Solution</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                From single videos to massive playlists - our <strong>bulk YouTube subtitle downloader</strong> handles any scale of subtitle extraction project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Playlist Downloads</h3>
                <p className="text-sm text-slate-600">Extract subtitles from entire YouTube playlists with our <strong>playlist subtitle downloader</strong>.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Channel Archives</h3>
                <p className="text-sm text-slate-600">Download all subtitles from YouTube channels using our <strong>bulk transcript extractor</strong>.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Multiple Formats</h3>
                <p className="text-sm text-slate-600">Get subtitles in SRT, VTT, or TXT format with our versatile <strong>YouTube caption downloader</strong>.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">AI Training Ready</h3>
                <p className="text-sm text-slate-600">Clean text extraction perfect for machine learning and <strong>AI dataset creation</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. USE CASES (保持原有样式) === */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4 tracking-tight">
              Professional Bulk YouTube Subtitle Extraction Use Cases
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              Discover why professionals choose our <strong>bulk YouTube subtitle downloader</strong> for AI training, research, and content creation.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤖",
                  title: "AI & LLM Training",
                  desc: "Extract massive subtitle datasets in Clean TXT format. Our <strong>bulk YouTube transcript downloader</strong> is the preferred choice for developers fine-tuning GPT and other AI models.",
                },
                {
                  icon: "📝",
                  title: "Content Repurposing",
                  desc: "Turn entire video libraries into SEO-optimized blog posts. Quickly extract transcripts for show notes and social media copy using our <strong>YouTube playlist subtitle extractor</strong>.",
                },
                {
                  icon: "📚",
                  title: "Digital Archiving",
                  desc: "Backup your channel's metadata and captions. Download precise SRT/VTT files for translation and accessibility audits with our <strong>bulk subtitle extraction tool</strong>.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 4. 3-STEP GUIDE (保持原有样式与图片) === */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute left-1/2 top-40 bottom-40 w-px bg-slate-100 hidden lg:block"></div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center">
              Simple Batch Subtitle Process
            </h2>
            <p className="text-lg text-center text-slate-500 mb-24 max-w-2xl mx-auto font-medium">
              How to <strong>download youtube playlist with subtitles</strong> in three easy stages.
            </p>

            <div className="space-y-32">
              {[
                {
                  step: "01",
                  title: "Ingestion: Entire Playlists",
                  desc: "Paste your Playlist or Channel URL. Our recursive engine automatically harvests all individual video links for batch subtitle extraction.",
                  img: "./image/Generated Image October 14, 2025 - 12_19PM.webp",
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-100",
                },
                {
                  step: "02",
                  title: "Format Selection: SRT/VTT/TXT",
                  desc: "Choose the standard that fits your needs. We offer SRT for players, VTT for web, and 'Clean TXT' for AI-ready text corpora.",
                  img: "./image/bulk-guide-step2-paste-list.webp",
                  color: "text-indigo-600",
                  bgColor: "bg-indigo-50",
                  borderColor: "border-indigo-100",
                  reverse: true,
                },
                {
                  step: "03",
                  title: "Final Delivery: Organized ZIP",
                  desc: "Our cloud-based engine processes the batch. Download a single ZIP file where every transcript is perfectly named by the original video title.",
                  img: "./image/Generated Image October 14, 2025 - 12_24PM.webp",
                  color: "text-emerald-600",
                  bgColor: "bg-emerald-50",
                  borderColor: "border-emerald-100",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"
                    } items-center gap-16 lg:gap-24`}
                >
                  <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <div
                      className={`inline-flex items-center px-4 py-1.5 ${item.bgColor} ${item.color} ${item.borderColor} border rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm`}
                    >
                      <span className="mr-2">Step</span>
                      <span className="text-sm">{item.step}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  <div className="md:w-1/2 w-full">
                    <div className="relative group">
                      <div
                        className={`absolute -inset-4 ${item.bgColor} rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                      ></div>
                      <div className="relative bg-white p-2 rounded-[2rem] border border-slate-200 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-1.5 mb-3 px-4 pt-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        </div>
                        <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 aspect-video flex items-center justify-center">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 5. ANY LINK SECTION (保持原有样式) === */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-white">
                Any Link. <br />
                Unlimited Scale.
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                The most flexible <strong>YouTube subtitle downloader</strong> that handles complex playlist structures and massive channel archives.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "📺 Single Videos",
                  "📑 Full Playlists",
                  "👤 Channel Archives",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h3 className="text-xs font-bold mb-6 text-blue-400 uppercase tracking-widest text-center md:text-left">
                Supported URL Formats
              </h3>
              <ul className="space-y-4 font-mono text-[13px] text-slate-300">
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  youtube.com/playlist?list=...
                </li>
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  youtube.com/@ChannelUsername
                </li>
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  youtube.com/watch?v=...
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* === 6. FORMAT DETAILS (保持原有样式) === */}
        <section className="py-20 md:py-28 bg-white text-slate-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-tight text-blue-600">
              Download Subtitles in SRT, VTT, or TXT
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
              Precision or clean text? We support all major industry standards.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Clean TXT Transcript
                </h3>
                <div className="inline-block px-2 py-1 bg-slate-200 rounded text-[10px] font-bold text-slate-600 mb-6 uppercase tracking-widest">
                  For AI & Research
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                  Automatically removes all timestamps and sequence numbers. Get a clean, readable transcript perfect for SEO blogs and LLM training.
                </p>
                <div className="h-28 bg-white rounded-xl border border-slate-200 p-6 font-mono text-[11px] text-slate-300 overflow-hidden shadow-inner">
                  Welcome to our deep dive into the future of media... (Pure Text)
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Timed SRT / VTT
                </h3>
                <div className="inline-block px-2 py-1 bg-blue-100 rounded text-[10px] font-bold text-blue-700 mb-6 uppercase tracking-widest">
                  For Video Players
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                  Standard timecoded files (Start --&gt; End). Perfect for re-uploading, video editing, or offline viewing with VLC.
                </p>
                <div className="h-28 bg-white rounded-xl border border-slate-200 p-6 font-mono text-[11px] text-slate-300 overflow-hidden shadow-inner leading-relaxed">
                  1<br />
                  00:00:01,000 --&gt; 00:00:04,000<br />
                  Welcome to our deep dive...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 7. TECHNICAL FAQ (大幅扩充关键词响应) === */}
        <section className="py-24 bg-slate-50" id="bulk-faq">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
              Bulk YouTube Subtitle Downloader FAQ
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How do I download an entire YouTube playlist with subtitles?",
                  a: (
                    <>
                      To download a <strong>YouTube playlist with subtitles</strong> in bulk, simply copy the playlist URL from your browser and paste it into YTVidHub's <strong>bulk subtitle downloader</strong>. Our advanced engine will crawl the entire playlist, extract the captions for each video, and bundle them into an organized ZIP file for you.
                    </>
                  ),
                },
                {
                  q: "Can I extract subtitles from multiple YouTube videos at once?",
                  a: (
                    <>
                      Yes! You can paste a list of multiple individual video URLs or a channel link. YTVidHub is the leading <strong>bulk YouTube subtitle downloader</strong> and <strong>batch subtitle extractor</strong>, allowing for unlimited URLs for Pro members.
                    </>
                  ),
                },
                {
                  q: "What file formats do you support for captions?",
                  a: (
                    <>
                      We support the three most common formats: <strong>SRT (SubRip)</strong>, <strong>VTT (WebVTT)</strong>, and <strong>Clean TXT</strong>. You can toggle between these formats before starting your bulk download.
                    </>
                  ),
                },
                {
                  q: "Does this tool support auto-generated YouTube subtitles?",
                  a: (
                    <>
                      Absolutely. Our <strong>bulk YouTube transcript downloader</strong> can extract both manually uploaded subtitles and YouTube's auto-generated closed captions (CC) in any available language. The tool works with all types of YouTube captions.
                    </>
                  ),
                },
                {
                  q: "Is there a limit to how many subtitles I can download?",
                  a: (
                    <>
                      Free users have a daily quota for <strong>bulk subtitle downloads</strong>. <strong>Pro members</strong> enjoy unlimited bulk extraction, allowing them to download subtitles for thousands of videos in a single operation using our advanced <strong>YouTube playlist subtitle downloader</strong>.
                    </>
                  ),
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-200 hover:border-blue-400 open:bg-white"
                >
                  <summary className="flex justify-between items-center font-bold text-lg text-slate-800 focus:outline-none list-none select-none">
                    <span>{faq.q}</span>
                    <svg
                      className="w-5 h-5 text-slate-400 transition-transform duration-300 transform group-open:rotate-180 group-open:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* === [新增] 内部链接和相关工具部分 === */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Related YouTube Subtitle Tools</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Explore our complete suite of YouTube subtitle and transcript extraction tools.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Single Video Downloader</h3>
                <p className="text-slate-600 mb-4">
                  Need to download subtitles from just one video? Try our <Link href="/youtube-subtitle-downloader" className="text-blue-600 font-semibold hover:underline">single YouTube subtitle downloader</Link> for quick, individual video caption extraction.
                </p>
                <Link href="/youtube-subtitle-downloader" className="text-blue-600 font-semibold hover:underline text-sm">
                  Try Single Video Tool →
                </Link>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Preparation Guide</h3>
                <p className="text-slate-600 mb-4">
                  Learn how to prepare YouTube transcripts for AI training. Our <Link href="/data-prep-guide" className="text-blue-600 font-semibold hover:underline">comprehensive data prep guide</Link> covers best practices for ML datasets.
                </p>
                <Link href="/data-prep-guide" className="text-blue-600 font-semibold hover:underline text-sm">
                  Read Guide →
                </Link>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">SRT vs VTT Guide</h3>
                <p className="text-slate-600 mb-4">
                  Understand the differences between subtitle formats. Our <Link href="/guide/srt-vs-vtt" className="text-blue-600 font-semibold hover:underline">SRT vs VTT comparison guide</Link> helps you choose the right format.
                </p>
                <Link href="/guide/srt-vs-vtt" className="text-blue-600 font-semibold hover:underline text-sm">
                  Compare Formats →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* === 8. CTA SECTION (保持原有样式) === */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight text-white italic uppercase">
              Scale Your Bulk Subtitle Extraction
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Don't let manual extraction slow you down. YTVidHub is the professional's choice for <strong>bulk YouTube subtitle downloads</strong> and <strong>playlist caption extraction</strong>.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition-all hover:-translate-y-1 text-sm uppercase tracking-wider"
            >
              Get Started with Pro
            </Link>
          </div>
        </section>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}