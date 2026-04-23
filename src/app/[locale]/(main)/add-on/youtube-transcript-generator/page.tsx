import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Bot,
  CheckCircle2,
  Chrome,
  Languages,
  MousePointerClick,
  NotebookPen,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export const metadata: Metadata = {
  title: "YouTube Transcript Generator Chrome Extension - YTVidHub",
  description:
    "Generate AI-powered YouTube transcripts directly on video pages with the YTVidHub Chrome Extension. Supports multilingual transcript generation and text/Markdown export.",
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/free-youtube-transcript-g/oejbpimopbgfokfgehfidmgmodkicego?authuser=0&hl=en";

const STEPS = [
  {
    index: "01",
    title: "Open Transcript Panel",
    desc: "Open a YouTube video and launch the transcript panel from the extension area.",
    img: "/image/transcript/ytvidhub-transcript-extension-step-open-panel.webp",
    alt: "YouTube Transcript Generator panel opened on a YouTube video page",
    icon: Chrome,
  },
  {
    index: "02",
    title: "Choose Language",
    desc: "Select the transcript language you need for multilingual transcript generation.",
    img: "/image/transcript/ytvidhub-transcript-extension-step-choose-language.webp",
    alt: "Transcript language selection dropdown in YouTube Transcript Generator extension",
    icon: ScanSearch,
  },
  {
    index: "03",
    title: "Generate and Export",
    desc: "Generate transcript content and export to text or Markdown for your workflow.",
    img: "/image/transcript/ytvidhub-transcript-extension-step-export-transcript.webp",
    alt: "Transcript generated and exported from YouTube Transcript Generator extension",
    icon: MousePointerClick,
  },
];

const FEATURES = [
  {
    title: "AI-Powered Transcript Generation",
    desc: "Generate clean, readable transcripts quickly from YouTube videos with AI assistance.",
    icon: Bot,
  },
  {
    title: "Multi-Language Support",
    desc: "Handle multilingual transcript workflows for international learning and research.",
    icon: Languages,
  },
  {
    title: "Export as Text or Markdown",
    desc: "Save output in plain text or Markdown for notes, docs, and content systems.",
    icon: NotebookPen,
  },
  {
    title: "One-Click YouTube Workflow",
    desc: "Generate transcripts directly on YouTube pages without switching tools.",
    icon: MousePointerClick,
  },
  {
    title: "Research Friendly",
    desc: "Useful for transcript-based analysis, insight extraction, and evidence review.",
    icon: Sparkles,
  },
  {
    title: "Chromium Compatible",
    desc: "Works across Chrome, Edge, Brave, Arc, and other Chromium browsers.",
    icon: CheckCircle2,
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the YouTube Transcript Generator Chrome extension?",
    a: "It is a Chrome extension that generates AI-powered YouTube transcripts directly on video pages for faster reading and analysis.",
  },
  {
    q: "Does it support multiple languages?",
    a: "Yes. It supports multilingual transcript generation workflows based on available YouTube language tracks.",
  },
  {
    q: "Can I export transcripts to text or Markdown?",
    a: "Yes. You can export generated transcripts as plain text or Markdown for notes, content, and data workflows.",
  },
  {
    q: "Do I need to log in before generating transcripts?",
    a: "No heavy setup is required to get started quickly, and advanced workflow features can be used when needed.",
  },
  {
    q: "Can I use transcripts for AI/LLM training data?",
    a: "Yes. Transcript outputs can be used for corpus building, retrieval preparation, and AI/LLM experimentation.",
  },
  {
    q: "Where can I find other YTVidHub browser extensions?",
    a: "Visit /add-on/ to explore all official YTVidHub extension pages and workflows.",
  },
];

export default function TranscriptExtensionPage() {
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
                YouTube Transcript Generator
                <span className="block text-[var(--brand-600)]">Chrome Extension</span>
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600">
                Generate AI-powered transcripts in one click, support multilingual output, and
                export as text or Markdown directly from YouTube pages.
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
                  src="/image/transcript/ytvidhub-transcript-extension-hero.webp"
                  alt="YouTube Transcript Generator Chrome extension interface on YouTube"
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
                  Transcript generation helps with note-taking, AI/LLM dataset preparation, and
                  content analysis from long-form YouTube videos.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">What</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  The extension generates AI-powered transcripts, supports multiple languages, and
                  exports output as text or Markdown.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">How</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  1) Install the extension. 2) Open a YouTube video and click{" "}
                  <strong>Generate Transcript</strong> to create and export results.
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
                Three practical steps from installation to transcript output inside YouTube.
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
                Built for transcript quality, workflow speed, and easy export into your preferred
                documentation format.
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
                <h3 className="text-base font-semibold text-slate-900">Learning & Study Notes</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Turn long lectures into readable transcript notes for fast review and revision.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Research & Analysis</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Extract transcripts to analyze themes, arguments, and evidence across multiple
                  YouTube sources.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">Content Creation</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Repurpose transcripts into scripts, outlines, newsletters, and social content
                  drafts.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[var(--surface-page)] p-6 shadow-[0_14px_26px_-24px_rgba(15,23,42,0.45)]">
                <h3 className="text-base font-semibold text-slate-900">AI Model Workflows</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Use transcript output for LLM training data, retrieval indexing, and evaluation
                  tasks.
                </p>
              </article>
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">
              Browse all extensions on{" "}
              <Link href="/add-on" className="font-semibold text-[var(--brand-700)] hover:underline">
                /add-on/
              </Link>{" "}
              and pair it with the{" "}
              <Link
                href="/add-on/youtube-subtitle-download"
                className="font-semibold text-[var(--brand-700)] hover:underline"
              >
                YouTube Subtitle Downloader extension
              </Link>
              , or visit the{" "}
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
              Ready to generate transcripts faster?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Install the extension and generate AI-powered transcripts inside YouTube in seconds.
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
