import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/add-on/youtube-subtitle-download");

  const title = "YouTube Subtitle Downloader Chrome Extension - YTVidHub";
  const description = "Download YouTube subtitles directly from the video page with the YTVidHub Chrome Extension. Supports SRT, VTT, and clean TXT formats with one click.";

  return {
    title,
    description,
    keywords: [
      "youtube subtitle downloader chrome extension",
      "youtube subtitle download",
      "youtube caption downloader extension",
      "download youtube subtitles srt vtt txt",
      "youtube subtitles for ai llm",
    ],
    alternates,
    openGraph: { title, description, url: alternates.canonical, type: "website", siteName: "YTVidHub" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default function YouTubeSubtitleDownloadLayout({ children }: Props) {
  return <>{children}</>;
}
