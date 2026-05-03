import { Link } from "@/i18n/routing";

type ToolLink = {
  href: string;
  title: string;
  desc: string;
};

const allTools: ToolLink[] = [
  {
    href: "/youtube-subtitle-downloader",
    title: "YouTube Subtitle Downloader",
    desc: "Download subtitles from any YouTube video in SRT, VTT, and TXT formats.",
  },
  {
    href: "/bulk-youtube-subtitle-downloader",
    title: "Bulk Subtitle Downloader",
    desc: "Extract subtitles from entire playlists and channels at once.",
  },
  {
    href: "/youtube-subtitle-extractor",
    title: "YouTube Subtitle Extractor",
    desc: "Extract clean subtitle data from 500+ videos with AI-powered cleaning.",
  },
  {
    href: "/youtube-transcript-generator",
    title: "YouTube Transcript Generator",
    desc: "Generate clean text transcripts from YouTube videos for AI training.",
  },
];

type Props = {
  currentPath: string;
  count?: number;
};

export default function RelatedTools({ currentPath, count = 3 }: Props) {
  const related = allTools
    .filter((t) => t.href !== currentPath)
    .slice(0, count);

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 pb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Related Tools
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
              {tool.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
