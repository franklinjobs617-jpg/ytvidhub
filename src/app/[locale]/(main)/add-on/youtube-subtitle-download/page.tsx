import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  CheckCircle2,
  Chrome,
  Languages,
  ListVideo,
  Lock,
  MousePointerClick,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export const metadata: Metadata = {
  title: "YouTube Subtitle Downloader Chrome Extension - YTVidHub",
  description:
    "Download YouTube subtitles directly from the video page with the YTVidHub Chrome Extension. Supports SRT, VTT, and clean TXT formats with one click.",
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/ytvidhub-youtube-subtitle/jdkjibjlihlmpcjppdgiejgoiamogdoj";

const STEPS = [
  {
    index: "01",
    title: "Install Extension",
    desc: "Add YTVidHub from the Chrome Web Store once, then keep it enabled in your browser.",
    img: "/image/chorme/ytvidhub-extension-step-install.png",
    alt: "Install YTVidHub extension from Chrome Web Store",
    icon: Chrome,
  },
  {
    index: "02",
    title: "Open Any Video",
    desc: "When a YouTube page loads, YTVidHub detects subtitle tracks automatically.",
    img: "/image/chorme/ytvidhub-extension-step-video.png",
    alt: "YTVidHub extension detects subtitles on YouTube video page",
    icon: ScanSearch,
  },
  {
    index: "03",
    title: "Export in One Click",
    desc: "Download SRT, VTT, or clean TXT instantly without switching tabs.",
    img: "/image/chorme/ytvidhub-extension-step-download.png",
    alt: "YTVidHub extension subtitle export formats SRT VTT TXT",
    icon: MousePointerClick,
  },
];

const FEATURES = [
  {
    title: "One-Click Interface",
    desc: "A clean download entry is placed directly where subtitle actions happen.",
    icon: MousePointerClick,
  },
  {
    title: "Smart Export",
    desc: "Use SRT, VTT, and clean TXT for publishing, analysis, or LLM workflows.",
    icon: Sparkles,
  },
  {
    title: "Language Support",
    desc: "Supports manual, auto-generated, and translated subtitle tracks.",
    icon: Languages,
  },
  {
    title: "Playlist Friendly",
    desc: "Works with playlist workflows and keeps bulk subtitle collection simple.",
    icon: ListVideo,
  },
  {
    title: "Privacy Focused",
    desc: "Runs on YouTube pages only and does not track browsing across websites.",
    icon: Lock,
  },
  {
    title: "Chromium Compatible",
    desc: "Use the same extension on Chrome, Edge, Brave, Arc, and similar browsers.",
    icon: CheckCircle2,
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the YouTube Subtitle Downloader Chrome extension?",
    a: "It is a browser extension that lets you download YouTube subtitles directly on the video page in SRT, VTT, or clean TXT formats.",
  },
  {
    q: "Do I need to sign in?",
    a: "No. You can start subtitle extraction without sign in and export files in one click.",
  },
  {
    q: "Does it support multiple languages?",
    a: "Yes. It supports available subtitle tracks across multiple languages, including translated tracks when provided by YouTube.",
  },
  {
    q: "Can I download subtitles from playlists?",
    a: "Yes. The extension is playlist-friendly and supports bulk subtitle collection workflows.",
  },
  {
    q: "Which formats are supported?",
    a: "You can export subtitles in SRT, VTT, and clean TXT for editing, analysis, and AI/LLM data preparation.",
  },
  {
    q: "Can I use it for AI/LLM training data?",
    a: "Yes. Clean TXT output is useful for transcript corpora, retrieval pipelines, and model training data preparation.",
  },
];

export default function AddOnPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-slate-700">
      <main>
        <header className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),rgba(37,99,235,0)_72%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 py-16 md:py-24 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                <Chrome className="h-3.5 w-3.5" />
                Official Browser Extension
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Download YouTube subtitles
                <span className="block text-[var(--brand-600)]">directly inside YouTube</span>
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600">
                Download YouTube subtitles in one click as SRT, VTT, or clean TXT. No login
                required, with playlist-ready bulk subtitle download for faster learning, research,
                and AI workflows.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_20px_30px_-20px_rgba(37,99,235,1)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
                >
                  <Chrome className="h-4 w-4" />
                  Install from Chrome Web Store
                </a>
                <Link
                  href="/add-on"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[var(--brand-700)]"
                >
                  Browse all add-ons
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>

            <div className="w-full max-w-xl flex-1">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_50px_-34px_rgba(15,23,42,0.65)]">
                <Image
                  src="/image/chorme/ytvidhub-chrome-store-listing.png"
                  alt="YTVidHub Chrome extension listing preview"
                  width={800}
                  height={500}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="border-b border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Why / What / How
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Why</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Subtitle downloads help with study notes, content analysis, multilingual research,
                  and AI/LLM training data preparation.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">What</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  The extension downloads SRT, VTT, and clean TXT on YouTube pages, with fast
                  one-click export and playlist-friendly bulk workflows.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">How</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  1) Install the extension. 2) Open a YouTube video and click{" "}
                  <strong>Download Subtitle</strong> to export the format you need.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                How it works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Three steps, no extra dashboard. Install once and keep your subtitle flow inside
                the YouTube player experience.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.index}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.55)]"
                  >
                    <div className="mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        width={480}
                        height={360}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-blue-700">
                        {item.index}
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Why users install it
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Built for speed and clarity: practical controls, stable export formats, and minimal
                setup friction.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Use Cases
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Learning & Notes</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Convert long videos into searchable text for revision notes and quick study
                  summaries.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Research & Analysis</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Extract subtitle datasets from video libraries for topic clustering and qualitative
                  analysis.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">AI / LLM Training Data</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Export clean TXT files for transcript corpora, retrieval pipelines, and model
                  training data preparation.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">
                  Multilingual Subtitle Collection
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Collect multilingual subtitle tracks for translation, localization, and global
                  content operations.
                </p>
              </article>
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">
              Explore more extensions on{" "}
              <Link href="/add-on" className="font-semibold text-[var(--brand-700)] hover:underline">
                /add-on/
              </Link>{" "}
              or visit the{" "}
              <Link href="/" className="font-semibold text-[var(--brand-700)] hover:underline">
                YTVidHub homepage
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-900 px-8 py-14 text-center text-white md:px-12 md:py-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to simplify subtitle capture?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Install the extension and keep your existing YTVidHub workflow while reducing click
              steps on every video.
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-slate-100"
            >
              <Chrome className="h-4 w-4" />
              Install Now
            </a>
          </div>
        </section>

        <UnifiedFaqSection
          title="FAQ"
          items={FAQ_ITEMS}
          sectionClassName="border-t border-slate-200 bg-white py-24"
          containerClassName="max-w-4xl px-6 lg:px-6"
        />
      </main>
    </div>
  );
}
