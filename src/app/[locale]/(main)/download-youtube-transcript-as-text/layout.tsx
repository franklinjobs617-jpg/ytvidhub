import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Download YouTube Transcript as Text (No Timestamps) | YTVidHub",
    description:
      "Download YouTube transcript as text in seconds. Remove timestamps and export clean TXT for AI workflows, notes, and research.",
    keywords: [
      "download youtube transcript as text",
      "download youtube transcript without timestamp",
      "youtube transcript no timestamps",
      "youtube transcript txt download",
      "clean youtube transcript text",
    ],
    openGraph: {
      title: "Download YouTube Transcript as Text (No Timestamps)",
      description:
        "Export clean YouTube transcript text without timestamps. Ideal for AI training, notes, and content repurposing.",
      type: "article",
    },
    alternates: buildAlternates(locale, "/download-youtube-transcript-as-text"),
  };
}

export default function DownloadYouTubeTranscriptAsTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

