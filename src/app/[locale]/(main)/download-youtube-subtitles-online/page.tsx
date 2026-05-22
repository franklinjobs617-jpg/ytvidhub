import { Link } from "@/i18n/routing";
import SubtitleDownloaderSchema from "@/components/seo/SubtitleDownloaderSchema";
import SubtitleDownloaderWidget from "@/components/subtitle/SubtitleDownloaderWidget";
import RelatedTools from "@/components/shared/RelatedTools";
import UnifiedFaqSection from "@/components/shared/UnifiedFaqSection";

const steps = [
  ["Paste a YouTube URL", "Use a single public or unlisted video URL when you need one subtitle file quickly."],
  ["Choose language and format", "Select an available caption language, then choose SRT, VTT, or TXT."],
  ["Download in your browser", "Save the extracted subtitle file without installing desktop software."],
];

const routeChoices = [
  {
    title: "Use this online page",
    desc: "Best when you want the fastest browser-based flow for one video and do not need advanced batch options.",
    href: "/download-youtube-subtitles-online",
    link: "Stay here",
  },
  {
    title: "Use the single-video subtitle tool",
    desc: "Best when you want a fuller explanation of SRT, VTT, TXT, timing, and subtitle use cases.",
    href: "/youtube-subtitle-downloader",
    link: "Open subtitle downloader",
  },
  {
    title: "Use the bulk downloader",
    desc: "Best when you need subtitles from a playlist, channel, or many video URLs in one organized package.",
    href: "/bulk-youtube-subtitle-downloader",
    link: "Open bulk downloader",
  },
];

export default function DownloadYouTubeSubtitlesOnlinePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 article-body">
      <SubtitleDownloaderSchema variant="online" />
      <main>
        <section className="article-hero bg-white">
          <div className="article-shell px-6 py-16 text-center md:py-24">
            <p className="article-kicker">Online Subtitle Tool</p>
            <h1 className="article-h1 mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Download YouTube Subtitles Online
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              Use YTVidHub to download YouTube subtitles online without
              installing software. Export available captions as SRT, VTT, or
              TXT for editing, accessibility checks, notes, translation, and
              transcript review.
            </p>
            <div className="mt-10">
              <SubtitleDownloaderWidget />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 md:p-8">
              <h2 className="article-h2 text-2xl font-bold text-slate-900">
                Quick Answer: How do I download YouTube subtitles online for free?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Copy the YouTube video URL, paste it into the online subtitle
                downloader, choose the caption language, then export SRT, VTT,
                or TXT. SRT keeps subtitle timestamps for players and editors,
                VTT is best for web playback, and TXT is easiest for reading,
                notes, and text review.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-center text-3xl font-bold text-slate-900">
              Three-Step Online Subtitle Download
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map(([title, desc], index) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="article-h2 text-center text-3xl font-bold text-slate-900">
              Which subtitle workflow should you use?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
              This page is the lightweight online route. Choose a more focused
              tool when your task needs deeper format guidance or batch output.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {routeChoices.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-white"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    {item.link}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="article-h2 text-3xl font-bold">
              Need playlists or many videos?
            </h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              This page is focused on online subtitle downloads from individual
              YouTube videos. For playlists, channels, and multi-video
              extraction, use the bulk subtitle downloader.
            </p>
            <Link
              href="/bulk-youtube-subtitle-downloader"
              className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Open Bulk Subtitle Downloader
            </Link>
          </div>
        </section>

        <UnifiedFaqSection
          title="Online YouTube Subtitle Download FAQ"
          items={[
            {
              q: "Can I download YouTube subtitles online without installing software?",
              a: "Yes. Paste a YouTube video URL into the browser-based downloader, choose an available caption language, and export SRT, VTT, or TXT.",
            },
            {
              q: "Is this page for one video or many videos?",
              a: "This page is best for one video at a time. For playlists, channels, or long URL lists, use the bulk subtitle downloader.",
            },
            {
              q: "Which format is best for a quick download?",
              a: "Choose SRT for video players and editors, VTT for web video, and TXT when you want readable transcript text.",
            },
          ]}
          sectionClassName="py-16 bg-white"
        />

        <div className="mx-auto max-w-6xl px-6">
          <RelatedTools currentPath="/download-youtube-subtitles-online" />
        </div>
      </main>
    </div>
  );
}
