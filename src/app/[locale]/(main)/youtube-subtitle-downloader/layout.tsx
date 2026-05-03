import { Metadata } from "next";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Free YouTube Subtitle Downloader | SRT, VTT, TXT (2026)",
  description: "Download YouTube subtitles in SRT, VTT, and TXT formats for free. Extract captions from any video with timestamps or clean text for AI training and accessibility.",

  keywords: [
    "youtube subtitle downloader",
    "download youtube captions",
    "youtube srt download",
    "youtube vtt download",
    "youtube transcript downloader",
    "extract youtube subtitles",
    "youtube caption extractor",
    "free subtitle downloader",
    "youtube closed captions download",
    "youtube cc download"
  ],

  openGraph: {
    title: "Free YouTube Subtitle Downloader | SRT, VTT, TXT (2026)",
    description: "Download YouTube subtitles in multiple formats instantly. Perfect for accessibility, video editing, AI training, and content creation.",
    url: "https://ytvidhub.com/youtube-subtitle-downloader",
    type: "website",
    images: [
      {
        url: "/image/og-subtitle-downloader.webp",
        width: 1200,
        height: 630,
        alt: "YouTube Subtitle Downloader Tool Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Subtitle Downloader | SRT, VTT, TXT (2026)",
    description: "Extract YouTube captions in any format. Free, fast, and reliable subtitle downloads.",
    images: ["/image/og-subtitle-downloader.webp"],
  },

  alternates: {
    canonical: "https://ytvidhub.com/youtube-subtitle-downloader/",
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

  other: {
    "article:author": "YTVidHub Team",
    "article:section": "Tools",
    "article:tag": "YouTube, Subtitles, Captions, SRT, VTT, Accessibility",
  },
};

export default async function YouTubeSubtitleDownloaderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = toolBreadcrumbs(locale, "/youtube-subtitle-downloader", "YouTube Subtitle Downloader");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}