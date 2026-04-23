import { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/url";

const pathname = "/add-on/youtube-subtitle-download";

export const metadata: Metadata = {
  title: "YouTube Subtitle Downloader Chrome Extension - YTVidHub",
  description:
    "Download YouTube subtitles directly from the video page with the YTVidHub Chrome Extension. Supports SRT, VTT, and clean TXT formats with one click.",
  keywords: [
    "youtube subtitle downloader chrome extension",
    "youtube subtitle download",
    "youtube caption downloader extension",
    "download youtube subtitles srt vtt txt",
    "youtube subtitles for ai llm",
  ],
  alternates: {
    canonical: "https://ytvidhub.com/add-on/youtube-subtitle-download/",
    languages: {
      en: buildCanonicalUrl({ locale: "en", pathname }),
      "x-default": buildCanonicalUrl({ locale: "en", pathname }),
    },
  },
  openGraph: {
    title: "YouTube Subtitle Downloader Chrome Extension - YTVidHub",
    description:
      "Install YTVidHub's Chrome extension to download YouTube subtitles in SRT, VTT, and clean TXT directly from video pages.",
    url: "https://ytvidhub.com/add-on/youtube-subtitle-download/",
    type: "website",
    siteName: "YTVidHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Subtitle Downloader Chrome Extension - YTVidHub",
    description:
      "One-click YouTube subtitle download in SRT, VTT, and clean TXT formats.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function YouTubeSubtitleDownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
