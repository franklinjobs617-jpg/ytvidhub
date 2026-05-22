import { Link } from "@/i18n/routing";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import RelatedTools from "@/components/shared/RelatedTools";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

export default function YouTubeVttDownloaderPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 article-body">
      <SubtitleDownloaderSchema />
      <main>
        <section className="article-hero bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="article-shell px-6 py-16 text-center md:py-24">
            <p className="article-kicker">WebVTT Caption Export</p>
            <h1 className="article-h1 mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              YouTube VTT Downloader
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Download YouTube subtitles as VTT files for HTML5 video, web
              players, browser captions, and online course platforms. Paste a
              video URL and export available captions as WebVTT.
            </p>
            <div className="mt-10">
              <SubtitleDownloaderWidget />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
              <h2 className="article-h2 text-2xl font-bold text-slate-900">
                Quick Answer: What is a VTT subtitle file?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-700">
                VTT, or WebVTT, is a subtitle format designed for web video.
                It uses timestamp cues such as <code>00:00:01.000 --&gt; 00:00:04.000</code>
                and is commonly used with HTML5 players. Download VTT when your
                subtitles need to work on websites, course platforms, or
                browser-based video players.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold text-slate-900">
              VTT vs SRT for YouTube Subtitles
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Format</th>
                    <th className="px-4 py-3 font-semibold">Timestamp style</th>
                    <th className="px-4 py-3 font-semibold">Best use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">VTT</td>
                    <td className="px-4 py-3"><code>00:00:01.000 --&gt; 00:00:04.000</code></td>
                    <td className="px-4 py-3">Web players, HTML5 video, online learning platforms.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">SRT</td>
                    <td className="px-4 py-3"><code>00:00:01,000 --&gt; 00:00:04,000</code></td>
                    <td className="px-4 py-3">Desktop players, video editors, broad compatibility.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Need deeper format rules? Read the{" "}
              <Link href="/guide/srt-vs-vtt" className="text-blue-600 hover:text-blue-700">
                SRT vs VTT comparison guide
              </Link>
              .
            </p>
          </div>
        </section>

        <UnifiedFaqSection
          title="YouTube VTT Downloader FAQ"
          items={[
            {
              q: "Can I download YouTube captions as VTT?",
              a: "Yes. If captions are available for the YouTube video, you can export them as a VTT file for web video workflows.",
            },
            {
              q: "Should I use VTT or SRT?",
              a: "Use VTT for web players and HTML5 video. Use SRT when you need maximum compatibility with desktop players and video editing tools.",
            },
            {
              q: "Can I convert VTT captions to TXT?",
              a: "Yes. Choose TXT when you want readable transcript text without WebVTT cue markup or timestamps.",
            },
          ]}
        />

        <div className="mx-auto max-w-6xl px-6">
          <RelatedTools currentPath="/youtube-vtt-downloader" />
        </div>
      </main>
    </div>
  );
}
