import { Link } from "@/i18n/routing";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import RelatedTools from "@/components/shared/RelatedTools";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

const useCases = [
  ["Accessibility reviews", "Check whether speech, speaker context, and available caption timing are usable before publishing."],
  ["Closed caption export", "Save available CC tracks as SRT, VTT, or TXT so reviewers can inspect them outside YouTube."],
  ["Auto-generated captions", "Download YouTube's automatic captions when no manual caption track exists, then review accuracy before reuse."],
  ["Web publishing", "Use VTT captions for HTML5 video players, course platforms, and browser-based playback."],
];

const captionTypes = [
  ["Manual captions", "Usually uploaded or edited by the creator.", "Best source when accuracy matters for accessibility, localization, or publishing."],
  ["Auto-generated captions", "Created by YouTube speech recognition.", "Useful for fast drafts, but names, technical terms, and punctuation should be checked."],
  ["Translated captions", "Derived from an original caption track.", "Helpful for multilingual review, but should not be treated as final translation without checking."],
];

export default function YouTubeCaptionDownloaderPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800 article-body">
      <SubtitleDownloaderSchema variant="caption" />
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
              language, and export the file you need for review, editing,
              accessibility, or web playback.
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

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              Captions, Subtitles, and Transcripts: What is the difference?
            </h2>
            <div className="mt-6 space-y-5 text-slate-600">
              <p>
                Captions are usually built for accessibility. They can include
                spoken dialogue, speaker context, and sound cues when the source
                track provides them. Subtitles are often used for dialogue
                translation or time-aligned text. Transcripts are easier to read
                as plain text because they remove subtitle timing markup.
              </p>
              <p>
                Use this caption downloader when your main task is reviewing or
                exporting CC tracks. If you mainly need subtitle files for a
                single video, use the{" "}
                <Link href="/youtube-subtitle-downloader" className="font-semibold text-blue-600 hover:text-blue-700">
                  YouTube Subtitle Downloader
                </Link>
                . If you need text without timestamps, use the{" "}
                <Link href="/youtube-transcript-generator" className="font-semibold text-blue-600 hover:text-blue-700">
                  YouTube Transcript Generator
                </Link>
                .
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Track type</th>
                    <th className="px-4 py-3 font-semibold">How it is created</th>
                    <th className="px-4 py-3 font-semibold">Best use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {captionTypes.map(([type, source, use]) => (
                    <tr key={type}>
                      <td className="px-4 py-3 font-semibold text-slate-900">{type}</td>
                      <td className="px-4 py-3">{source}</td>
                      <td className="px-4 py-3">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <th className="px-4 py-3 font-semibold">What you need</th>
                    <th className="px-4 py-3 font-semibold">Best tool</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3">Caption and CC track export</td>
                    <td className="px-4 py-3">This page</td>
                    <td className="px-4 py-3">Focused on captions, CC tracks, and accessibility workflows.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">General subtitle downloads</td>
                    <td className="px-4 py-3">
                      <Link href="/youtube-subtitle-downloader" className="text-blue-600 hover:text-blue-700">
                        Subtitle downloader
                      </Link>
                    </td>
                    <td className="px-4 py-3">Broader subtitle exports for video editing and translation.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Playlist or multi-video exports</td>
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
            {
              q: "What is the difference between captions and subtitles?",
              a: "Captions are usually accessibility-oriented and may include speech plus sound or speaker cues when available. Subtitles are often used for translated or time-aligned dialogue.",
            },
            {
              q: "Should I trust auto-generated captions?",
              a: "Use auto-generated captions as a starting point. Review names, technical terms, punctuation, and speaker changes before using them for accessibility, publication, or research.",
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
