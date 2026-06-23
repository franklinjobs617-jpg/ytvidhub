"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModel";
import BulkDownloaderSchema from "@/components/seo/BulkDownloaderSchema";
import BulkDownloaderInput from "@/components/subtitle/BulkDownloaderInput";
import RelatedTools from "@/components/shared/RelatedTools";
import {
  ArrowRight,
  CheckCheck,
  AlertCircle,
  Download,
  FileText,
  FolderArchive,
  History as HistoryIcon,
  Layers,
  LifeBuoy,
  Youtube,
  Zap,
} from "lucide-react";

const featureCards = [
  {
    icon: <Youtube className="text-blue-600" size={20} />,
    title: "Playlist & Channel Ingestion",
    desc: "Paste a playlist, channel, or multiple video URLs. The batch engine automatically expands and prepares all links.",
  },
  {
    icon: <Zap className="text-blue-600" size={20} />,
    title: "High-Speed Batch Processing",
    desc: "Process large sets of videos in one workflow, so you avoid manual one-by-one subtitle downloads.",
  },
  {
    icon: <FileText className="text-blue-600" size={20} />,
    title: "SRT, VTT, and Clean TXT",
    desc: "Export subtitle files for players, editors, translation review, archives, and readable transcript libraries.",
  },
];

const bulkAudiences = [
  ["Course teams", "Download captions from a full lesson playlist and keep files named by video title."],
  ["Localization teams", "Collect available language tracks before translation review or subtitle QA."],
  ["Researchers", "Build a searchable transcript library from many public videos without opening each one manually."],
  ["Content teams", "Turn channel or playlist captions into reusable notes, outlines, and editorial source material."],
];

const packageDetails = [
  ["One ZIP package", "Keep a full batch together instead of managing many separate browser downloads."],
  ["Clear file names", "Map exported subtitle files back to source video titles so review work stays organized."],
  ["Consistent format", "Apply SRT, VTT, or TXT across the whole batch instead of switching formats video by video."],
];

const processSteps = [
  {
    step: "01",
    title: "Paste Sources",
    desc: "Add playlist, channel, or video links in one input area.",
    img: "/image/Generated Image October 14, 2025 - 12_19PM.webp",
    icon: <Layers size={18} className="text-blue-600" />,
  },
  {
    step: "02",
    title: "Choose Output Format",
    desc: "Select SRT, VTT, or Clean TXT based on your scenario.",
    img: "/image/bulk-guide-step2-paste-list.webp",
    icon: <FileText size={18} className="text-blue-600" />,
  },
  {
    step: "03",
    title: "Download Organized ZIP",
    desc: "Get one archive with clear file names mapped to video titles.",
    img: "/image/Generated Image October 14, 2025 - 12_24PM.webp",
    icon: <Download size={18} className="text-blue-600" />,
  },
];

export default function BulkDownloaderClient({ locale }: { locale: string }) {
  void locale;
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-page)] font-sans text-slate-800 antialiased selection:bg-blue-100">
      <BulkDownloaderSchema />

      <main className="relative">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_72%)]" />
          <div className="container mx-auto max-w-6xl px-6 pt-16 pb-20">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
                <CheckCheck size={12} className="text-blue-600" />
                Bulk Subtitle Pipeline
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Bulk YouTube Subtitle Downloader
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
                Extract subtitles from playlists, channels, and multiple videos in one flow.
                Export clean <strong>SRT, VTT, and TXT</strong> files for editing,
                translation, accessibility review, transcript libraries, and archive work.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">
                Use it when one-by-one downloads are too slow: paste a playlist,
                channel, or list of videos and keep every subtitle file in one
                organized package.
              </p>

              <div className="mt-10">
                <BulkDownloaderInput />
              </div>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input Types
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">Video · Playlist · Channel</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">SRT · VTT · Clean TXT</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Delivery
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">One Organized ZIP Package</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-12 rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(37,99,235,0.35)] md:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Quick Answer: Can you download subtitles from an entire YouTube playlist?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Yes. A playlist subtitle downloader extracts captions from every video in a
                YouTube playlist and packages the results as SRT, VTT, or clean TXT files. This is
                faster than opening each video manually, especially when you need captions for
                research, translation, accessibility checks, content repurposing, or long-term
                archives.
              </p>
            </div>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Bulk YouTube Subtitle Downloader for Playlists &amp; Channels
              </h2>
              <p className="mt-4 text-slate-600">
                A practical bulk YouTube subtitle downloader for anyone who needs repeatable
                subtitle exports without opening each video one by one.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featureCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.65)] transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_24px_36px_-30px_rgba(37,99,235,0.45)]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Why Use a Bulk Subtitle Downloader?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Replace repetitive copy-paste operations with a single batch pipeline.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
                    <AlertCircle size={18} className="text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Manual Method</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Open many tabs and process videos one by one.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Manually click subtitle download repeatedly.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300" />
                    Spend time renaming and organizing files.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-[var(--surface-page)] p-8 shadow-[0_16px_28px_-24px_rgba(37,99,235,0.45)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    <FolderArchive size={18} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">YTVidHub Batch Pipeline</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Paste playlist/channel URL once and run bulk extraction.
                  </li>
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Export SRT/VTT/TXT in one consistent package.
                  </li>
                  <li className="flex gap-3">
                    <CheckCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    Receive clean file names mapped to original titles.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Task</th>
                    <th className="px-4 py-3 font-semibold">Manual workflow</th>
                    <th className="px-4 py-3 font-semibold">Bulk downloader workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Playlist captions</td>
                    <td className="px-4 py-3">Open videos one by one and repeat the same download steps.</td>
                    <td className="px-4 py-3">Paste the playlist URL once and export all available subtitles.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">File organization</td>
                    <td className="px-4 py-3">Rename downloaded files manually after each export.</td>
                    <td className="px-4 py-3">Receive an organized ZIP with files mapped to video titles.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">Output formats</td>
                    <td className="px-4 py-3">Format support depends on the source interface.</td>
                    <td className="px-4 py-3">Choose SRT, VTT, or TXT for the whole batch.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Who Should Use Bulk Subtitle Extraction?
            </h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              Bulk extraction is useful when the work is bigger than one video:
              playlists, channels, recurring research, course libraries, and
              repeated caption review.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {bulkAudiences.map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                How to Download Subtitles from a YouTube Playlist
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                A clear flow from URL ingestion to final ZIP delivery.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {processSteps.map((item) => (
                <article
                  key={item.step}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_30px_-26px_rgba(15,23,42,0.55)]"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {item.icon}
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What You Get After a Bulk Download</h2>
              <p className="mt-4 text-slate-300">
                The goal is not just extraction. The goal is a clean package that
                is easy to review, share, and reuse.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {packageDetails.map(([title, desc], index) => {
                const icons = [
                  <FolderArchive key="zip" size={18} className="text-blue-300" />,
                  <FileText key="file" size={18} className="text-blue-300" />,
                  <Layers key="layers" size={18} className="text-blue-300" />,
                ];
                return (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_34px_-30px_rgba(15,23,42,0.9)]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                      {icons[index]}
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Supported Formats: SRT, VTT, TXT for Batch Download
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Choose the right format for playback, editing, or dataset use.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.52)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">For reading & review</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Clean TXT</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Timestamp-free transcript text for reading, search, translation review, and
                  notes.
                </p>
                <pre className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-[11px] text-slate-500">
Welcome to our deep dive into the future of media...
              </pre>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_30px_-26px_rgba(15,23,42,0.52)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">For Players & Editing</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">SRT / VTT</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Timecoded subtitle files for upload, synchronization, and video production tools.
                </p>
                <pre className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-[11px] text-slate-500">
1
00:00:01,000 --&gt; 00:00:04,000
Welcome to our deep dive...
              </pre>
              </div>
            </div>
          </div>
        </section>

        <section id="bulk-faq" className="border-y border-slate-200 bg-white py-20">
          <div className="container mx-auto max-w-4xl px-6 lg:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">FAQ About Bulk YouTube Subtitle Downloads</h2>
            <p className="mt-3 text-slate-600">
              Everything important about bulk subtitle extraction.
            </p>
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  What is a bulk YouTube subtitle downloader?
                </h3>
                <p className="mt-2 text-slate-600">
                  It is a YouTube subtitle extractor that downloads subtitles from multiple videos,
                  playlists, and channels in one batch workflow instead of manual one-by-one
                  processing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Do I need to log in or register?
                </h3>
                <p className="mt-2 text-slate-600">
                  No sign-up is required to get started with bulk subtitle extraction. You can run
                  your first batch directly and export subtitle files quickly.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Can I download subtitles from playlists and channels?
                </h3>
                <p className="mt-2 text-slate-600">
                  Yes. The tool supports playlist and channel ingestion so you can extract
                  subtitles at scale from grouped video sources.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Which formats are supported for export?
                </h3>
                <p className="mt-2 text-slate-600">
                  You can export SRT, VTT, and clean TXT formats. This makes it easy to integrate
                  subtitles into playback, editing, translation, review, and archive workflows.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Does it support multilingual subtitle collection?
                </h3>
                <p className="mt-2 text-slate-600">
                  Yes. You can collect multilingual subtitles from international channels and
                  playlists for translation, localization, and cross-language research projects.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Is subtitle data handled securely?
                </h3>
                <p className="mt-2 text-slate-600">
                  The extraction workflow is designed for practical operations, and outputs are
                  delivered in organized packages so teams can manage subtitle data with standard
                  internal security processes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-page)] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Related tools
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Explore adjacent workflows across subtitle extraction and preparation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <Zap size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Single Video Downloader</h3>
                <p className="mt-2 text-sm text-slate-600">
                  For one-off extractions when you do not need a batch workflow.
                </p>
                <Link href="/youtube-subtitle-downloader" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Explore Tool <ArrowRight size={14} />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <LifeBuoy size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Data Preparation Guide</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Learn practical rules for converting transcripts into high-quality training data.
                </p>
                <Link href="/data-prep-guide" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Explore Guide <ArrowRight size={14} />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <FileText size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">SRT vs VTT Guide</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Compare subtitle formats and select the correct output standard for your workflow.
                </p>
                <Link href="/guide/srt-vs-vtt" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Read Comparison <ArrowRight size={14} />
                </Link>
              </div>

              {/* 内链：playlist-subtitles-bulk guide — 排名6.7冲前5的目标页面 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.55)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                  <Layers size={18} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Playlist Download Guide</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Step-by-step guide to downloading every subtitle from a playlist in one click.
                </p>
                <Link href="/guide/playlist-subtitles-bulk" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Read Guide <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-6">
          <div className="mx-auto max-w-6xl rounded-3xl bg-slate-900 px-8 py-14 text-center text-white md:px-14">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Start Bulk YouTube Subtitle Extraction Now
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Move from manual downloads to a structured bulk pipeline built for repeatable output.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                onClick={handleAction}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Start Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RelatedTools currentPath="/bulk-youtube-subtitle-downloader" />
        </div>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
