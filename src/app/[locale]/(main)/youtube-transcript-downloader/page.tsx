"use client";

import Link from "next/link";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { Download, FileText, List, Zap, Globe, Archive } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "How do I download a YouTube transcript?",
    a: "Paste the YouTube video URL into the input field above, select your format (TXT, SRT, or VTT), and click Extract. Your transcript downloads in under 10 seconds — no software, no account needed for guest tries.",
  },
  {
    q: "Can I download transcripts from an entire YouTube playlist?",
    a: "Yes. Paste a YouTube playlist URL to download transcripts from all videos at once. All files are bundled into a single ZIP. This is the fastest way to do bulk transcript downloading from YouTube.",
  },
  {
    q: "What is the difference between TXT, SRT, and VTT?",
    a: (
      <span>
        <strong>TXT</strong> gives you clean plain text with no timestamps — best for notes, research, and AI prompts.{" "}
        <strong>SRT</strong> includes precise timestamps in the format <code>00:00:01,000 --&gt; 00:00:04,000</code> — best for video editing and caption uploads.{" "}
        <strong>VTT</strong> is the WebVTT format for HTML5 web video players and online course platforms.
      </span>
    ),
  },
  {
    q: "Is this YouTube transcript downloader free?",
    a: "Yes. Free accounts get 8 download credits on signup — no credit card required. Pro plans start at $19.99/month for 500 credits, supporting large-scale playlist and channel downloads.",
  },
  {
    q: "Does it work for YouTube channels?",
    a: "Yes. Paste a YouTube channel URL to download transcripts from all videos in that channel at once. Useful for competitive research, content analysis, and building AI training datasets from a creator's full library.",
  },
  {
    q: "Can I download YouTube transcripts without timestamps?",
    a: "Yes. Choose TXT as the export format to get plain paragraph text with no timestamps or formatting — ready for reading, notes, search, and AI tools like ChatGPT and Claude.",
  },
  {
    q: "How many videos can I download transcripts from at once?",
    a: "Guest users get 3 starter credits. Each subtitle download uses 1 credit, while AI Summary uses 2. Free accounts get 8 credits. Pro accounts (500 credits/month) can process playlists of any size — credits are used one per video.",
  },
  {
    q: "What languages are supported?",
    a: "YTVidHub supports transcript download in 100+ languages — any language track available on the YouTube video, including auto-generated captions.",
  },
];

export default function YouTubeTranscriptDownloaderPage() {
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700">
      <main>

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[25rem] h-[25rem] bg-blue-400/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[20rem] h-[20rem] bg-blue-400/10 rounded-full blur-[80px]" />
          <div className="relative pt-16 pb-20 text-center px-6 z-10 max-w-5xl mx-auto">

            {/* Quick answer — AI GEO: 首句直接回答用户意图 */}
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Free · No Install · Works in Browser
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              YouTube Transcript{" "}
              <span className="text-blue-600">Downloader</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-3 leading-relaxed">
              Download YouTube transcripts as <strong>TXT, SRT, or VTT</strong> in
              seconds. Paste any video, playlist, or channel URL — get all
              transcripts at once.
            </p>
            <p className="text-sm text-slate-500 mb-10">
              Need AI summaries or study cards?{" "}
              <Link href="/youtube-transcript-generator/" className="text-blue-600 hover:underline">
                Try the transcript generator →
              </Link>
            </p>

            {/* Tool widget — 首屏工具交互，差异化关键 */}
            <div className="max-w-3xl mx-auto">
              <SubtitleDownloaderWidget />
            </div>

            {/* Stats bar */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              {[
                { icon: <Globe size={14} />, text: "100+ languages" },
                { icon: <FileText size={14} />, text: "TXT · SRT · VTT" },
                { icon: <List size={14} />, text: "Playlist & channel bulk" },
                { icon: <Zap size={14} />, text: "Under 10 seconds" },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-blue-500">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
              How to download a YouTube transcript
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Paste the YouTube URL",
                  desc: "Copy any YouTube video, playlist, or channel URL and paste it into the input field above. Works with all public YouTube content.",
                  icon: <Download size={20} className="text-blue-600" />,
                },
                {
                  step: "2",
                  title: "Choose your format",
                  desc: "Select TXT for plain text, SRT for timestamped subtitles, or VTT for web players. Switch formats before downloading at no extra cost.",
                  icon: <FileText size={20} className="text-blue-600" />,
                },
                {
                  step: "3",
                  title: "Download instantly",
                  desc: "Click Extract. Single videos download in seconds. Playlists bundle all transcripts into one ZIP file automatically.",
                  icon: <Archive size={20} className="text-blue-600" />,
                },
              ].map((item, i) => (
                <div key={i} className="relative rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
                      {item.step}
                    </span>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Playlist bulk section ──
            覆盖 "youtube video playlist transcript downloader"（Vol=1900, KD=50） */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                  Bulk download
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Download transcripts from entire YouTube playlists
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Paste a YouTube playlist URL and download transcripts from
                  every video at once. All transcript files are bundled into a
                  single ZIP — no repetitive copy-paste, no video-by-video
                  workflow.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  This is the fastest way to collect transcripts for research,
                  content repurposing, language learning playlists, or AI
                  training datasets from a curated video set.
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "Paste one playlist URL — download all transcripts",
                    "Supports playlists with 100+ videos",
                    "All files packed into one ZIP automatically",
                    "Choose format per batch: TXT, SRT, or VTT",
                    "Credits used per video (1 credit = 1 transcript)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/bulk-youtube-subtitle-downloader/"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  Try bulk playlist download →
                </Link>
              </div>

              {/* 视觉示例 */}
              <div className="flex-shrink-0 w-full md:w-80">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-slate-400 ml-2 font-mono">playlist_transcripts.zip</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { name: "video_01_transcript.txt", size: "12 KB" },
                      { name: "video_02_transcript.txt", size: "18 KB" },
                      { name: "video_03_transcript.txt", size: "9 KB" },
                      { name: "video_04_transcript.srt", size: "22 KB" },
                      { name: "video_05_transcript.srt", size: "15 KB" },
                    ].map((file, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-1">
                        <FileText size={14} className="text-blue-500 flex-shrink-0" />
                        <span className="text-xs text-slate-700 flex-1 truncate font-mono">{file.name}</span>
                        <span className="text-xs text-slate-400">{file.size}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">5 files · 76 KB total</span>
                      <span className="text-xs font-semibold text-emerald-600">✓ Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Format comparison ── */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Choose the right transcript format
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  format: "TXT",
                  color: "blue",
                  title: "Plain text transcript",
                  bestFor: "Notes, research, AI tools",
                  desc: "Clean readable text with no timestamps or formatting. Paste directly into ChatGPT, Claude, or your note-taking app.",
                  examples: ["AI prompts & ChatGPT", "Study notes", "Content repurposing", "Search & archive"],
                },
                {
                  format: "SRT",
                  color: "indigo",
                  title: "Timestamped subtitles",
                  bestFor: "Video editing, caption uploads",
                  desc: "Industry-standard subtitle format with sequence numbers and HH:MM:SS,ms timestamps. Works with all video editors.",
                  examples: ["Adobe Premiere", "DaVinci Resolve", "YouTube captions", "Translation workflows"],
                },
                {
                  format: "VTT",
                  color: "violet",
                  title: "WebVTT format",
                  bestFor: "Web players, course platforms",
                  desc: "Native HTML5 subtitle format for web video. Required by Coursera, Udemy, and most LMS platforms.",
                  examples: ["HTML5 video", "Coursera / Udemy", "Web players", "Accessibility"],
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-black text-blue-700">
                      .{item.format.toLowerCase()}
                    </span>
                    <span className="text-xs text-slate-500">{item.bestFor}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.desc}</p>
                  <ul className="space-y-1">
                    {item.examples.map((ex) => (
                      <li key={ex} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              What people use YouTube transcript downloads for
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🤖",
                  title: "AI & ChatGPT workflows",
                  desc: "Feed YouTube transcripts into ChatGPT, Claude, or Perplexity for summaries, Q&A, and research.",
                },
                {
                  icon: "📚",
                  title: "Language learning",
                  desc: "Download transcripts from YouTube playlists to study vocabulary, grammar, and pronunciation in context.",
                },
                {
                  icon: "✍️",
                  title: "Content repurposing",
                  desc: "Turn video transcripts into blog posts, newsletters, Twitter threads, and social media content.",
                },
                {
                  icon: "🔬",
                  title: "Research & analysis",
                  desc: "Download transcripts from channels or playlists to analyze topics, trends, and speaker patterns at scale.",
                },
                {
                  icon: "🎬",
                  title: "Video editing & captions",
                  desc: "Download SRT transcripts for subtitle editing, translation, and caption upload to YouTube or social platforms.",
                },
                {
                  icon: "🧠",
                  title: "AI training datasets",
                  desc: "Build clean text corpora from YouTube playlists for LLM fine-tuning, speech recognition, and NLP research.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-white border border-slate-200 p-5">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <UnifiedFaqSection
          title="YouTube Transcript Downloader FAQ"
          subtitle="Common questions about downloading YouTube transcripts."
          items={FAQ_ITEMS}
          sectionClassName="py-16 bg-white"
          containerClassName="max-w-3xl"
        />

        {/* ── Related tools ── */}
        <section className="py-6 pb-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Related tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  href: "/youtube-transcript-generator/",
                  title: "Transcript Generator",
                  desc: "Convert YouTube video to clean text with AI summaries and study cards.",
                },
                {
                  href: "/bulk-youtube-subtitle-downloader/",
                  title: "Bulk Subtitle Downloader",
                  desc: "Download subtitles from playlists and channels in one click.",
                },
                {
                  href: "/youtube-subtitle-downloader/",
                  title: "Subtitle Downloader",
                  desc: "Download SRT, VTT, TXT subtitles from any single YouTube video.",
                },
                {
                  href: "/what-is-vtt-file/",
                  title: "What Is a VTT File?",
                  desc: "Complete guide to the WebVTT subtitle format.",
                },
                {
                  href: "/guide/playlist-subtitles-bulk/",
                  title: "Playlist Bulk Download Guide",
                  desc: "Step-by-step guide to downloading full playlist transcripts.",
                },
                {
                  href: "/guide/srt-vs-vtt/",
                  title: "SRT vs VTT Guide",
                  desc: "Which transcript format should you download?",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-blue-700">{link.title}</span>
                  <span className="text-xs text-slate-500">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
