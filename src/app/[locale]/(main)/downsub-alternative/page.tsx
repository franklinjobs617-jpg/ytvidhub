import { Link } from "@/i18n/routing";
import RelatedTools from "@/components/shared/RelatedTools";

const comparisonRows = [
  {
    feature: "Single-video subtitle download",
    downsub: "Supports subtitle downloads from video URLs.",
    ytvidhub: "Supports SRT, VTT, and TXT exports from YouTube video URLs.",
  },
  {
    feature: "Playlist and channel workflows",
    downsub: "Known mainly as a subtitle download utility.",
    ytvidhub: "Built around video, playlist, channel, and multi-link subtitle workflows.",
  },
  {
    feature: "AI-ready transcript workflows",
    downsub: "Useful for subtitle file download.",
    ytvidhub: "Adds clean TXT, workspace, AI summary, and data preparation workflows.",
  },
  {
    feature: "Focused caption pages",
    downsub: "Broad subtitle downloading utility.",
    ytvidhub: "Separate paths for subtitles, captions, VTT, bulk downloads, and transcripts.",
  },
  {
    feature: "Chrome extension workflow",
    downsub: "Users should verify current browser support on DownSub directly.",
    ytvidhub: "Includes a YTVidHub extension workflow for faster transcript and subtitle access.",
  },
];

const alternatives = [
  {
    title: "Best for one YouTube video",
    href: "/youtube-subtitle-downloader",
    body: "Use the subtitle downloader when you only need SRT, VTT, or TXT from one video.",
  },
  {
    title: "Best for captions and CC",
    href: "/youtube-caption-downloader",
    body: "Use the caption downloader when your task is closed captions or accessibility review.",
  },
  {
    title: "Best for playlists",
    href: "/bulk-youtube-subtitle-downloader",
    body: "Use the bulk downloader when you need captions from playlists, channels, or many URLs.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DownSub Alternatives for YouTube Subtitle Downloads",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: 3,
  itemListElement: alternatives.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    url: `https://ytvidhub.com${item.href}/`.replace(/\/+$/, "/"),
  })),
};

export default function DownSubAlternativePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 article-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main>
        <section className="article-hero border-b border-slate-200 bg-slate-50">
          <div className="article-shell px-6 py-16 md:py-24">
            <p className="article-kicker">Comparison Guide</p>
            <h1 className="article-h1 max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              DownSub Alternative for YouTube Subtitle Downloads
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              If you are comparing sites like DownSub, YTVidHub is a practical
              alternative for downloading YouTube subtitles, captions, SRT, VTT,
              TXT, playlist subtitles, and AI-ready transcript text.
            </p>
            <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">
                Quick verdict
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                DownSub is a well-known subtitle downloader. Choose YTVidHub
                when you want a broader subtitle workspace: single video
                downloads, playlist and channel extraction, clean TXT exports,
                VTT captions for web players, and AI-oriented transcript
                workflows.
              </p>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Last updated: May 22, 2026. Comparison based on publicly visible
              product positioning and YTVidHub product capabilities.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              DownSub vs YTVidHub: feature comparison
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">DownSub</th>
                    <th className="px-4 py-3 font-semibold">YTVidHub</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3">{row.downsub}</td>
                      <td className="px-4 py-3">{row.ytvidhub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              Which YTVidHub alternative path should you use?
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {alternatives.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              Methodology and fairness note
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              This comparison is written for users searching for a DownSub
              alternative, not as a claim that one tool is universally better.
              DownSub remains a recognized subtitle download site. YTVidHub is
              positioned for users who also need playlist extraction, clean text
              exports, workspace actions, and AI data preparation.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try YTVidHub
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6">
          <RelatedTools currentPath="/downsub-alternative" />
        </div>
      </main>
    </div>
  );
}
