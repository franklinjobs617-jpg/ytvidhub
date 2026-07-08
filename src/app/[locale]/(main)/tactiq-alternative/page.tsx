import { Link } from "@/i18n/routing";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";

// ── 对比表格数据 ──────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "YouTube transcript generation",
    tactiq: "Supported via Chrome extension only.",
    ytvidhub: "Fully supported. Works in any browser — no extension required.",
  },
  {
    feature: "Bulk playlist download",
    tactiq: "Not available for YouTube playlists.",
    ytvidhub: "Paste a playlist URL to download transcripts from all videos at once, bundled as a ZIP.",
  },
  {
    feature: "YouTube channel download",
    tactiq: "Not available.",
    ytvidhub: "Supports channel-level bulk transcript and subtitle download.",
  },
  {
    feature: "Export formats",
    tactiq: "Text export. Primarily meeting-focused formats.",
    ytvidhub: "TXT (clean text), SRT (timestamped), VTT (web video) — all standard formats.",
  },
  {
    feature: "AI summary",
    tactiq: "AI summaries available, primarily for meetings.",
    ytvidhub: "AI-powered YouTube video summaries with key points and chapter breakdown.",
  },
  {
    feature: "Meeting transcription",
    tactiq: "Core use case. Supports Google Meet, Zoom, and Teams.",
    ytvidhub: "Not supported. YTVidHub is YouTube-focused only.",
  },
  {
    feature: "Chrome extension required",
    tactiq: "Yes — Tactiq requires the Chrome extension to function.",
    ytvidhub: "No. Fully web-based. Optional extension available for convenience.",
  },
  {
    feature: "Free tier",
    tactiq: "Limited free plan. Paid plans start ~$12/month.",
    ytvidhub: "5 free credits on signup. Pro from $19.99/month (500 credits).",
  },
  {
    feature: "100+ language support",
    tactiq: "Supports major languages.",
    ytvidhub: "Supports 100+ languages — any language available in YouTube captions.",
  },
];

// ── FAQ 数据（与 Schema 保持一致）────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Is there a free alternative to Tactiq for YouTube transcripts?",
    a: "Yes. YTVidHub is a free Tactiq alternative for YouTube transcript generation. It works in any browser without a Chrome extension, supports bulk playlist downloads, and includes AI-powered summaries. Free accounts get 5 credits on signup — no credit card required.",
  },
  {
    q: "What is Tactiq used for?",
    a: (
      <span>
        Tactiq is a Chrome extension primarily designed for transcribing online meetings
        (Google Meet, Zoom, Microsoft Teams) and YouTube videos. It integrates with AI
        tools to produce meeting summaries and action items. Learn more on{" "}
        <a
          href="https://tactiq.io"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:underline"
        >
          tactiq.io
        </a>.
      </span>
    ),
  },
  {
    q: "How does YTVidHub compare to Tactiq for YouTube transcripts?",
    a: "YTVidHub focuses specifically on YouTube content and supports bulk downloads from playlists and channels — something Tactiq does not offer for YouTube. YTVidHub also works without installing a Chrome extension and exports in TXT, SRT, and VTT formats.",
  },
  {
    q: "Does YTVidHub require a Chrome extension like Tactiq?",
    a: "No. YTVidHub is entirely web-based and works in any browser — Chrome, Firefox, Safari, or Edge — without installing anything. An optional Chrome extension is available for convenience, but is not required.",
  },
  {
    q: "Can YTVidHub download transcripts from entire YouTube playlists?",
    a: "Yes. Paste any YouTube playlist URL and download transcripts from all videos at once, bundled into a single ZIP file. Tactiq does not offer this bulk YouTube playlist workflow.",
  },
];

// ── Related alternatives data ─────────────────────────────────────
const alternatives = [
  {
    title: "Best for single YouTube videos",
    href: "/youtube-transcript-generator/",
    body: "Generate and download a transcript from any YouTube video in TXT, SRT, or VTT format.",
  },
  {
    title: "Best for playlists and channels",
    href: "/bulk-youtube-subtitle-downloader/",
    body: "Download subtitles and transcripts from entire YouTube playlists and channels in bulk.",
  },
  {
    title: "Best for AI summaries",
    href: "/youtube-video-summarizer/",
    body: "Get an AI-powered summary of any YouTube video with key points and chapter breakdown.",
  },
];

// ── 主页面 ──────────────────────────────────────────────────────────
export default function TactiqAlternativePage() {
  return (
    <div className="bg-white min-h-screen antialiased text-slate-700">
      <main>

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
              Tactiq Alternative
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5 leading-tight">
              Looking for a Tactiq alternative{" "}
              <span className="text-blue-600">for YouTube transcripts?</span>
            </h1>

            {/* Quick answer — AI GEO 首段直接回答 */}
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-3 leading-relaxed">
              <strong>YTVidHub</strong> is a free Tactiq alternative built specifically
              for YouTube. Download transcripts from any video, playlist, or channel
              — no Chrome extension required.
            </p>
            <p className="text-xs text-slate-400 mb-10">
              Last updated July 8, 2026 · YTVidHub Editorial Team
            </p>

            {/* CTA — 工具在第一屏 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/youtube-transcript-generator/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Try free — no extension needed →
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Bulk playlist download
              </Link>
            </div>

            {/* 信任信号 */}
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs text-slate-500">
              {[
                "✓ No Chrome extension required",
                "✓ Bulk playlist & channel download",
                "✓ TXT · SRT · VTT formats",
                "✓ 100+ languages",
                "✓ Free to start",
              ].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 对比表格 ── */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
              YTVidHub vs Tactiq — Feature comparison
            </h2>
            <p className="text-slate-500 text-center text-sm mb-10">
              Focused on YouTube transcript use cases
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold text-slate-600 w-[30%]">Feature</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-500 w-[35%]">
                      Tactiq
                    </th>
                    <th className="px-5 py-3.5 font-semibold text-blue-700 w-[35%]">
                      YTVidHub ✦
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                      <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3.5 text-slate-500">{row.tactiq}</td>
                      <td className="px-5 py-3.5 text-slate-700">{row.ytvidhub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 text-center mt-3">
              Tactiq information based on publicly available product pages as of July 2026.
              Verify current Tactiq features at{" "}
              <a
                href="https://tactiq.io"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-blue-500 hover:underline"
              >
                tactiq.io
              </a>.
            </p>
          </div>
        </section>

        {/* ── 使用场景对比 ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              When to use Tactiq vs YTVidHub
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Choose Tactiq when…
                </p>
                <ul className="space-y-3">
                  {[
                    "You primarily need meeting transcription (Google Meet, Zoom, Teams)",
                    "You want AI summaries and action items from meetings",
                    "You already use Chrome and prefer an extension-based workflow",
                    "Your main use case is not YouTube-specific",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="text-slate-400 flex-shrink-0 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-6">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                  Choose YTVidHub when…
                </p>
                <ul className="space-y-3">
                  {[
                    "You need transcripts from YouTube videos, playlists, or channels",
                    "You want bulk downloads without video-by-video repetition",
                    "You don't want to install a Chrome extension",
                    "You need TXT, SRT, or VTT file export for editing or AI tools",
                    "You want AI-powered YouTube video summaries",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <span className="text-blue-500 flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA 中部 ── */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Try the free Tactiq alternative for YouTube
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Paste any YouTube video or playlist URL and get a downloadable transcript
              in seconds. No Chrome extension, no signup needed to try.
            </p>
            <Link
              href="/youtube-transcript-generator/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Generate transcript free →
            </Link>
            <p className="text-xs text-slate-400 mt-3">
              5 free credits on signup · No credit card required
            </p>
          </div>
        </section>

        {/* ── YTVidHub alternatives grid ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              YTVidHub workflows for YouTube transcripts
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {alternatives.map((alt) => (
                <Link
                  key={alt.href}
                  href={alt.href}
                  className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-blue-700">{alt.title}</span>
                  <span className="text-xs text-slate-500">{alt.body}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <UnifiedFaqSection
          title="Tactiq Alternative FAQ"
          subtitle="Common questions about switching from Tactiq to YTVidHub for YouTube transcripts."
          items={FAQ_ITEMS}
          sectionClassName="py-16 bg-white"
          containerClassName="max-w-3xl"
        />

        {/* ── Related Tools ── */}
        <div className="pb-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <RelatedTools currentPath="/tactiq-alternative" count={3} />
          </div>
        </div>

      </main>
    </div>
  );
}
