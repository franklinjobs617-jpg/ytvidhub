import { Link } from "@/i18n/routing";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import RelatedTools from "@/components/shared/RelatedTools";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

const useCases = [
  ["Accessibility reviews", "Export closed captions to verify coverage, timing, and readable caption text."],
  ["Video editing", "Download SRT captions for editors such as Premiere Pro, DaVinci Resolve, and CapCut."],
  ["Web publishing", "Use VTT captions for HTML5 video players and browser-based playback."],
  ["Research and AI", "Export TXT when you need readable caption text for notes, search, or LLM workflows."],
];

export default function YouTubeCaptionDownloaderPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800 article-body">
      <SubtitleDownloaderSchema />
      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 article-hero">
          <div className="article-shell px-6 py-16 text-center md:py-24">
            <p className="article-kicker">Caption & CC Tool</p>
            <h1 className="article-h1 mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              YouTube Caption Downloader
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Download YouTube captions and closed caption tracks as SRT, VTT,
              or clean TXT. Paste a video URL, choose the available caption
              language, and export the format that fits your workflow.
            </p>
            <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-blue-100 bg-white p-5 text-left shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Answer: What is a YouTube caption downloader?
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                A YouTube caption downloader extracts the caption or CC track
                attached to a YouTube video and saves it as a subtitle file.
                Use SRT for editing and video players, VTT for web playback,
                and TXT when you need caption text without timestamps.
              </p>
            </div>
            <div className="mt-10">
              <SubtitleDownloaderWidget />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-center text-3xl font-bold text-slate-900">
              Download Captions for Practical Workflows
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {useCases.map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              Captions vs Subtitles: Which Page Should You Use?
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Search term</th>
                    <th className="px-4 py-3 font-semibold">Best page</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3">youtube caption downloader</td>
                    <td className="px-4 py-3">This page</td>
                    <td className="px-4 py-3">Targets captions, CC tracks, and accessibility workflows.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">youtube subtitle downloader</td>
                    <td className="px-4 py-3">
                      <Link href="/youtube-subtitle-downloader" className="text-blue-600 hover:text-blue-700">
                        Subtitle downloader
                      </Link>
                    </td>
                    <td className="px-4 py-3">Broader subtitle exports for video editing and translation.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">playlist caption downloads</td>
                    <td className="px-4 py-3">
                      <Link href="/bulk-youtube-subtitle-downloader" className="text-blue-600 hover:text-blue-700">
                        Bulk downloader
                      </Link>
                    </td>
                    <td className="px-4 py-3">Better for multiple videos, playlists, and channel exports.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <UnifiedFaqSection
          title="YouTube Caption Downloader FAQ"
          items={[
            {
              q: "Can I download YouTube closed captions as SRT?",
              a: "Yes. If the video has an available caption or CC track, you can export it as SRT for editing, playback, or accessibility review.",
            },
            {
              q: "Does this work with auto-generated captions?",
              a: "Yes. The downloader can extract available auto-generated captions, although accuracy depends on YouTube's speech recognition quality.",
            },
            {
              q: "What format should I choose for web video captions?",
              a: "Choose VTT for web video captions because WebVTT is designed for HTML5 players and browser-based playback.",
            },
          ]}
        />

        <div className="mx-auto max-w-6xl px-6">
          <RelatedTools currentPath="/youtube-caption-downloader" />
        </div>
      </main>
    </div>
  );
}
