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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the main difference between SRT and VTT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SRT uses a comma as the millisecond separator (00:01:12,450) while VTT uses a dot (00:01:12.450). VTT also supports CSS styling and metadata, while SRT is purely text-based with broader compatibility across desktop video players.",
      },
    },
    {
      "@type": "Question",
      name: "Which format is better for AI training data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SRT is generally better for AI training because it has minimal metadata overhead. Strip the timestamps and you get pure conversational text ready for LLM fine-tuning.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert between SRT and VTT formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The main change is the millisecond separator: replace commas with dots (SRT→VTT) or dots with commas (VTT→SRT). VTT styling tags are lost when converting to SRT. YTVidHub exports both formats directly.",
      },
    },
    {
      "@type": "Question",
      name: "Which format does YouTube use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube uses VTT (WebVTT) internally. When you download subtitles from YouTube via YTVidHub, you can export as SRT, VTT, or plain TXT.",
      },
    },
    {
      "@type": "Question",
      name: "Which subtitle format has better browser support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VTT has native browser support through the HTML5 track element. SRT requires conversion or a JavaScript library for web playback. For desktop players like VLC, both are supported.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "SRT vs VTT: Complete Comparison Guide for Developers",
  description: "Comprehensive technical comparison of SRT and WebVTT subtitle formats for AI training, web development, and bulk subtitle extraction.",
  url: "https://ytvidhub.com/guide/srt-vs-vtt/",
  datePublished: "2025-01-01",
  dateModified: "2026-02-01",
  author: { "@type": "Organization", name: "YTVidHub", url: "https://ytvidhub.com" },
  publisher: { "@type": "Organization", name: "YTVidHub", url: "https://ytvidhub.com" },
};

export default function SrtVsVttLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  );
}