"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";

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
      <title>Unlimited Bulk YouTube Subtitle Downloader | YTVidHub</title>
      <meta
        name="description"
        content="Our unique bulk downloader saves you hours. Paste an unlimited list of YouTube URLs with a Pro plan and download all subtitles in one organized ZIP file."
      />
      <link
        rel="canonical"
        href="https://ytvidhub.com/bulk-youtube-subtitle-downloader"
      />

      <main>
        <section className="bg-slate-50 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[35rem] h-[35rem] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[100px] animate-pulse"></div>

          <div className="relative pt-12 pb-16 text-center px-6 z-10">
            <h1 className="text-5xl md:text-6xl font-display font-black italic uppercase tracking-wide text-slate-900 mb-6 drop-shadow-sm leading-tight">
              Simple, Powerful Bulk Extraction
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
              Stop wasting time on manual downloads. Paste your entire video
              list—no matter the size—and get a perfectly organized ZIP file in
              seconds.
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
                        <span>https://youtu.be/video_link_alpha</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 font-bold">02.</span>
                        <span>https://youtu.be/playlist_link_beta</span>
                      </div>
                      <div className="mt-2 text-slate-300 italic opacity-60">
                        ... (Batch process 1000+ URLs at once)
                      </div>
                    </div>

                    {/* 右侧结果展示 */}
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
                        Named by original title
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 2. COMPARISON SECTION (H2 对齐定价页) === */}
        <section className="py-20 md:py-28 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4 tracking-tight">
              From Tedious to Effortless
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              See how YTVidHub transforms your data collection workflow.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    ✕
                  </span>
                  The Manual Way
                </h3>
                <ul className="space-y-4 text-slate-500 text-sm">
                  <li>• Open dozens of browser tabs and wait.</li>
                  <li>• Manually click "download" for every video.</li>
                  <li>• Deal with cryptically named files.</li>
                  <li>• Waste hours renaming and organizing.</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-white border-2 border-blue-600 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    ✓
                  </span>
                  The YTVidHub Way
                </h3>
                <ul className="space-y-4 text-slate-700 text-sm font-medium">
                  <li className="flex gap-3 items-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>{" "}
                    Paste your entire list—even 1000+ URLs.
                  </li>
                  <li className="flex gap-3 items-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>{" "}
                    Click one button to process asynchronously.
                  </li>
                  <li className="flex gap-3 items-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>{" "}
                    Get a single ZIP, files named by title.
                  </li>
                  <li className="flex gap-3 items-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>{" "}
                    Save hours for actual research.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. USE CASES (H2 对齐) === */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-4 tracking-tight">
              Built for Scale
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              Adaptable for AI training, content marketing, or digital
              archiving.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤖",
                  title: "AI & LLM Training",
                  desc: "Download entire channels in Clean TXT format. Perfect for fine-tuning GPT models without timestamp noise.",
                },
                {
                  icon: "📝",
                  title: "Content Repurposing",
                  desc: "Turn video libraries into SEO blog posts. Extract subtitles from webinars to quickly generate show notes.",
                },
                {
                  icon: "📚",
                  title: "Archiving & Translation",
                  desc: "Backup metadata. Download SRT files with precise timing to feed into translation software.",
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

        {/* === 4. 3-STEP GUIDE (H2 对齐) === */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* 背景装饰：增加一个极淡的连接线，增强“工作流”的连续感 */}
          <div className="absolute left-1/2 top-40 bottom-40 w-px bg-slate-100 hidden lg:block"></div>

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {/* H2 标题：完全对齐 Pricing 页面的规范 */}
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-4 text-center">
              Your New 3-Step Workflow
            </h2>
            <p className="text-lg text-center text-slate-500 mb-24 max-w-2xl mx-auto font-medium">
              Professional data extraction simplified into three effortless
              stages.
            </p>

            <div className="space-y-32">
              {[
                {
                  step: "01",
                  title: "Ingestion: Entire Channels",
                  desc: "Forget manually copying thousands of URLs. Just paste a Channel URL or Playlist URL, and our engine automatically performs recursive link harvesting for you.",
                  img: "./image/Generated Image October 14, 2025 - 12_19PM.webp",
                  color: "text-blue-600",
                  bgColor: "bg-blue-50",
                  borderColor: "border-blue-100",
                },
                {
                  step: "02",
                  title: "Data Standard: Clean VTT",
                  desc: "Raw SRT is unusable for NLP. We strip speaker cues and metadata intelligently, leaving you with a pristine, text-only corpus ready for AI training.",
                  img: "./image/bulk-guide-step2-paste-list.webp",
                  color: "text-indigo-600",
                  bgColor: "bg-indigo-50",
                  borderColor: "border-indigo-100",
                  reverse: true,
                },
                {
                  step: "03",
                  title: "Deliverability: One ZIP",
                  desc: "We process the queue asynchronously in the background. The result is a single ZIP archive, where every file is perfectly named after the video title.",
                  img: "./image/Generated Image October 14, 2025 - 12_24PM.webp",
                  color: "text-emerald-600",
                  bgColor: "bg-emerald-50",
                  borderColor: "border-emerald-100",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    item.reverse ? "md:flex-row-reverse" : "md:flex-row"
                  } items-center gap-16 lg:gap-24`}
                >
                  {/* 文字区域 */}
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

                  {/* 图片区域：优化为“浏览器/应用窗口”感 */}
                  <div className="md:w-1/2 w-full">
                    <div className="relative group">
                      {/* 背景装饰：卡片背后的光晕 */}
                      <div
                        className={`absolute -inset-4 ${item.bgColor} rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                      ></div>

                      <div className="relative bg-white p-2 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:-translate-y-2">
                        {/* 模拟浏览器顶栏 */}
                        <div className="flex items-center gap-1.5 mb-3 px-4 pt-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        </div>

                        {/* 图片容器 */}
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

        {/* === 5. ANY LINK SECTION (极简暗色块) === */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight text-white">
                Any Link. <br />
                Any Scale.
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our parsing engine handles complex YouTube structures without
                any manual intervention.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "📺 Single Videos",
                  "📑 Full Playlists",
                  "👤 Entire Channels",
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
                Supported Formats
              </h3>
              <ul className="space-y-4 font-mono text-[13px] text-slate-300">
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  https://www.youtube.com/playlist?list=...
                </li>
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  https://www.youtube.com/@ChannelName
                </li>
                <li className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                  https://youtu.be/VideoID
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* === 6. FORMAT DETAILS === */}
        <section className="py-20 md:py-28 bg-white text-slate-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 tracking-tight">
              Choose Your Output
            </h2>
            <p className="text-lg text-center text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              Precision or readability? We support both.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Clean TXT
                </h3>
                <div className="inline-block px-2 py-1 bg-slate-200 rounded text-[10px] font-bold text-slate-600 mb-6 uppercase tracking-widest">
                  Plain Text
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Removes all timestamps and sequence numbers. A continuous
                  stream of text. Ideal for datasets.
                </p>
                <div className="h-28 bg-white rounded-xl border border-slate-200 p-6 font-mono text-[11px] text-slate-300 overflow-hidden shadow-inner">
                  Hello everyone welcome back to the channel today we are
                  discussing the implications of...
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  SRT / VTT
                </h3>
                <div className="inline-block px-2 py-1 bg-blue-100 rounded text-[10px] font-bold text-blue-700 mb-6 uppercase tracking-widest">
                  Timecoded
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Includes precise timestamps (Start --&gt; End). Essential for
                  video editing or players.
                </p>
                <div className="h-28 bg-white rounded-xl border border-slate-200 p-6 font-mono text-[11px] text-slate-300 overflow-hidden shadow-inner leading-relaxed">
                  1<br />
                  00:00:01,000 --&gt; 00:00:04,000
                  <br />
                  Hello everyone welcome back...
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <Link
                    href="/what-is-an-srt-file"
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-wider transition-all"
                  >
                    Learn about SRT format <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="bulk-faq">
          <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900 mb-12 text-center">
              Technical Q&A
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Is there a limit to how many URLs I can paste?",
                  a: (
                    <>
                      For free users, there is a daily limit. For{" "}
                      <Link
                        href="/pricing"
                        className="text-blue-600 hover:underline font-bold"
                      >
                        Pro members
                      </Link>
                      , there are absolutely no limits on the number of URLs you
                      can process in a single job.
                    </>
                  ),
                },
                {
                  q: "How are files named in the ZIP?",
                  a: (
                    <>
                      We automatically name each file after the{" "}
                      <strong>original YouTube video title</strong>. No more
                      "videoplayback.srt".
                    </>
                  ),
                },
                {
                  q: "Can I download as TXT?",
                  a: (
                    <>
                      Yes! Before downloading, you can select SRT, VTT, or TXT
                      format. The entire batch will be converted to your choice.
                    </>
                  ),
                },
              ].map((faq, i) => (
                /* 卡片容器：完全对齐 FAQ 组件的细节样式 */
                <details
                  key={i}
                  className="group p-6 bg-white rounded-xl border border-slate-200 shadow-sm cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md open:bg-slate-50/50"
                >
                  <summary className="flex justify-between items-center font-semibold text-lg text-slate-800 focus:outline-none list-none select-none">
                    <span>{faq.q}</span>
                    {/* 图标旋转与变色：完全对齐 FAQ 组件 */}
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

                  {/* 回答区域：完全对齐 FAQ 组件的文字排版 */}
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-base">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* === 8. CTA SECTION (对齐首页/定价页底部) === */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight text-white">
              Stop Wasting Engineering Time
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Maintaining custom scrapers is expensive. YTVidHub obsoletes your
              extraction stack for the price of a lunch.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition-all hover:-translate-y-1 text-sm uppercase tracking-wider"
            >
              View Enterprise Plans
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
