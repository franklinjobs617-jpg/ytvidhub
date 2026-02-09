import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SRT vs VTT: Complete Comparison Guide for Developers | YTVidHub",
  description: "Comprehensive technical comparison of SRT and WebVTT subtitle formats. Learn which format is best for AI training, web development, and bulk subtitle extraction.",

  keywords: [
    "SRT vs VTT",
    "subtitle format comparison",
    "WebVTT vs SubRip",
    "subtitle file formats",
    "SRT format guide",
    "VTT format guide",
    "subtitle extraction formats",
    "AI training subtitle data",
    "bulk subtitle processing",
    "subtitle converter comparison"
  ],

  authors: [{ name: "YTVidHub Technical Team" }],

  openGraph: {
    title: "SRT vs VTT: Technical Comparison Guide for Developers",
    description: "Deep dive into SRT and WebVTT formats. Discover which subtitle format is best for your AI training, web development, or bulk extraction needs.",
    url: "https://ytvidhub.com/guide/srt-vs-vtt",
    type: "article",
    publishedTime: "2025-01-01T00:00:00.000Z",
    modifiedTime: "2025-01-30T00:00:00.000Z",
    authors: ["YTVidHub Technical Team"],
    section: "Technical Guides",
    tags: ["SRT", "VTT", "WebVTT", "Subtitles", "AI Training", "Web Development"],
    images: [
      {
        url: "/image/srt-vs-vtt-comparison-og.webp",
        width: 1200,
        height: 630,
        alt: "SRT vs VTT Subtitle Format Comparison Guide",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SRT vs VTT: Complete Technical Comparison",
    description: "Which subtitle format should you choose? Comprehensive guide comparing SRT and WebVTT for developers and AI researchers.",
    images: ["/image/srt-vs-vtt-comparison-og.webp"],
    creator: "@ytvidhub",
  },

  alternates: {
    canonical: "https://ytvidhub.com/guide/srt-vs-vtt/",
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
    "article:author": "YTVidHub Technical Team",
    "article:section": "Technical Guides",
    "article:published_time": "2025-01-01T00:00:00.000Z",
    "article:modified_time": "2025-01-30T00:00:00.000Z",
    "article:tag": "SRT, VTT, WebVTT, Subtitles, AI Training, Web Development",
  },
};

export default function SrtVsVttLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}