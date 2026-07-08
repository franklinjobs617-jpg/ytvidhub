import { Link } from "@/i18n/routing";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";
import RelatedTools from "@/components/shared/RelatedTools";

// ── 확장된 비교 표格（9행→더 구체적）────────────────────────────
const comparisonRows = [
  {
    feature: "Single-video subtitle download",
    downsub: "Supports subtitle downloads from YouTube video URLs.",
    ytvidhub: "SRT, VTT, and TXT export from any YouTube video URL. Results in under 10 seconds.",
  },
  {
    feature: "Bulk playlist download",
    downsub: "Not a primary feature. Mainly single-video focused.",
    ytvidhub: "Paste a playlist URL to download all subtitle files at once, bundled as a ZIP.",
  },
  {
    feature: "YouTube channel download",
    downsub: "Not supported.",
    ytvidhub: "Download subtitles from an entire YouTube channel in one workflow.",
  },
  {
    feature: "Export formats",
    downsub: "SRT and some other formats.",
    ytvidhub: "SRT (video editing), VTT (web players & course platforms), TXT (AI tools & notes).",
  },
  {
    feature: "AI video summary",
    downsub: "Not available.",
    ytvidhub: "AI-powered summaries with key points and chapter breakdown — included.",
  },
  {
    feature: "Study cards",
    downsub: "Not available.",
    ytvidhub: "Generate flashcards from video content for learning and review.",
  },
  {
    feature: "Transcript workspace",
    downsub: "Download only. No in-app transcript tools.",
    ytvidhub: "Full workspace: search, highlight, bilingual view, and AI analysis.",
  },
  {
    feature: "100+ language support",
    downsub: "Supports major languages.",
    ytvidhub: "100+ languages — any language available in YouTube captions.",
  },
  {
    feature: "Free tier",
    downsub: "Free to use for basic downloads.",
    ytvidhub: "5 free credits on signup. Guest tries available without account.",
  },
];

// ── FAQ（와 Schema 일치）──────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is a good free alternative to DownSub?",
    a: "YTVidHub is a free DownSub alternative for downloading YouTube subtitles, captions, and transcripts. It supports SRT, VTT, and TXT formats, bulk playlist and channel downloads, and AI-powered video summaries. Free accounts get 5 credits on signup — no credit card required.",
  },
  {
    q: "How does YTVidHub compare to DownSub?",
    a: (
      <span>
        Both tools support YouTube subtitle downloads. YTVidHub adds{" "}
        <strong>bulk playlist and channel downloads</strong>, clean TXT transcript export,
        AI video summaries, study card generation, and a workspace for managing multiple
        videos. DownSub is primarily a single-video subtitle download utility. You can
        verify DownSub's current features at{" "}
        <a
          href="https://downsub.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:underline"
        >
          downsub.com
        </a>.
      </span>
    ),
  },
  {
    q: "Can I download subtitles from a YouTube playlist without DownSub?",
    a: "Yes. YTVidHub supports bulk subtitle downloads from entire YouTube playlists and channels. Paste a playlist URL and download all subtitle files at once as a ZIP — no video-by-video repetition.",
  },
  {
    q: "Does YTVidHub support SRT and VTT formats like DownSub?",
    a: "Yes. YTVidHub exports YouTube subtitles as SRT (for video editing and broad player compatibility), VTT (for HTML5 web video and course platforms like Coursera and Udemy), and TXT (clean text for notes, research, and AI tools like ChatGPT and Claude).",
  },
  {
    q: "Is YTVidHub free to use?",
    a: "Yes. Guest users get 2 free tries per 24 hours without creating an account. Free accounts get 5 credits on signup. Pro plans start at $19.99/month for 500 credits (500 downloads or 250 AI summaries).",
  },
];

// ── 워크플로우 대안（alternatives grid）──────────────────────────
const alternatives = [
  {
    title: "Single video subtitle download",
    href: "/youtube-subtitle-downloader/",
    body: "SRT, VTT, or TXT from one YouTube video. Results in seconds.",
  },
  {
    title: "Bulk playlist download",
    href: "/bulk-youtube-subtitle-downloader/",
    body: "Download subtitles from entire playlists and channels in one ZIP.",
  },
  {
    title: "YouTube transcript download",
    href: "/youtube-transcript-downloader/",
    body: "Clean text transcripts from YouTube videos, playlists, or channels.",
  },
  {
    title: "AI video summarizer",
    href: "/youtube-video-summarizer/",
    body: "Get an AI-powered summary with key points instead of reading the full transcript.",
  },
  {
    title: "Caption downloader",
    href: "/youtube-caption-downloader/",
    body: "Closed captions and CC tracks for accessibility review.",
  },
  {
    title: "Tactiq alternative",
    href: "/tactiq-alternative/",
    body: "Comparing Tactiq for YouTube transcripts? See how YTVidHub differs.",
  },
];

export default function DownSubAlternativePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main>

        {/* ── Hero（工具 CTA 在第一屏）────────────────────────────── */}
        <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
              DownSub Alternative
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-5 leading-tight">
              DownSub Alternative for{" "}
              <span className="text-blue-600">YouTube Subtitle Downloads</span>
            </h1>

            {/* Quick answer — AI GEO */}
            <p className="text-lg leading-relaxed text-slate-600 mb-3 max-w-2xl">
              <strong>YTVidHub</strong> is a free DownSub alternative for downloading
              YouTube subtitles, captions, and transcripts — with bulk playlist support,
              AI summaries, and SRT / VTT / TXT export.
            </p>
            <p className="text-xs text-slate-400 mb-8">
              Last updated July 8, 2026 · YTVidHub Editorial Team
            </p>

            {/* CTA 첫 화면 가시적 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/youtube-subtitle-downloader/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Download subtitles free →
              </Link>
              <Link
                href="/bulk-youtube-subtitle-downloader/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Bulk playlist download
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500">
              {["✓ SRT · VTT · TXT formats", "✓ Bulk playlist & channel", "✓ 100+ languages", "✓ AI summaries", "✓ Free to start"].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 비교 표格 ───────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-3">
              DownSub vs YTVidHub — Feature comparison
            </h2>
            <p className="text-slate-500 text-center text-sm mb-8">
              Based on publicly available product information as of July 2026
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold text-slate-600 w-[28%]">Feature</th>
                    <th className="px-5 py-3.5 font-semibold text-slate-500 w-[36%]">DownSub</th>
                    <th className="px-5 py-3.5 font-semibold text-blue-700 w-[36%]">YTVidHub ✦</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                      <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-5 py-3.5">{row.downsub}</td>
                      <td className="px-5 py-3.5">{row.ytvidhub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">
              Verify current DownSub features at{" "}
              <a href="https://downsub.com" target="_blank" rel="noopener noreferrer nofollow"
                className="text-blue-500 hover:underline">downsub.com</a>.
            </p>
          </div>
        </section>

        {/* ── 사용 시나리오 ──────────────────────────────────────── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
              When to use DownSub vs YTVidHub
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Choose DownSub when…</p>
                <ul className="space-y-3">
                  {[
                    "You only need a quick single-video subtitle download",
                    "You are comfortable with a no-frills download utility",
                    "You don't need bulk playlist processing",
                    "You don't need AI summaries or workspace features",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                      <span className="text-slate-400 flex-shrink-0 mt-0.5">→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-6">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Choose YTVidHub when…</p>
                <ul className="space-y-3">
                  {[
                    "You need bulk downloads from playlists or channels",
                    "You want TXT export for AI tools like ChatGPT or Claude",
                    "You need AI-powered video summaries and study cards",
                    "You want a workspace to search and analyze transcripts",
                    "You're building an AI training dataset or research corpus",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                      <span className="text-blue-500 flex-shrink-0 mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Alternatives grid ─────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              YTVidHub workflows for YouTube subtitles
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {alternatives.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <span className="text-sm font-semibold text-blue-700">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.body}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <UnifiedFaqSection
          title="DownSub Alternative FAQ"
          subtitle="Common questions about switching from DownSub to YTVidHub."
          items={FAQ_ITEMS}
          sectionClassName="py-16 bg-slate-50"
          containerClassName="max-w-3xl"
        />

        {/* ── Fairness note ─────────────────────────────────────── */}
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-3xl px-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <strong>Methodology note:</strong> This comparison is written for users
              searching for a DownSub alternative, not as a claim that one tool is
              universally better. DownSub remains a recognized subtitle download site.
              YTVidHub is positioned for users who also need playlist extraction, clean
              text exports, workspace actions, and AI-ready workflows. Feature information
              based on publicly available product pages as of July 2026.
            </div>
          </div>
        </section>

        {/* ── Related Tools ─────────────────────────────────────── */}
        <div className="pb-16 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <RelatedTools currentPath="/downsub-alternative" />
          </div>
        </div>

      </main>
    </div>
  );
}
