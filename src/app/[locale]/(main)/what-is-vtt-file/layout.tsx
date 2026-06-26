import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/what-is-vtt-file");

  // ⚠️ TDH：核心词 "what is a vtt file"（KD=30 Vol=1000）放在 Title 首位
  // Description 直接回答用户问题，含 VTT/WebVTT/SRT 等相关词
  const title = "What Is a VTT File? WebVTT Format, Examples & Free Download";
  const description =
    "A VTT (WebVTT) file is the HTML5 subtitle format for web video. Learn the syntax, how VTT differs from SRT, and download YouTube subtitles as VTT free.";

  return {
    title,
    description,
    keywords: [
      "what is a vtt file",
      "what is vtt file",
      "vtt file format",
      "webvtt format",
      "vtt vs srt",
      "how to open vtt file",
      "download youtube subtitles vtt",
      "vtt subtitle format",
    ],
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "article",
      publishedTime: "2026-06-26",
      modifiedTime: "2026-06-26",
      authors: ["YTVidHub"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// FAQPage Schema — AI GEO 关键，Perplexity/ChatGPT 优先引用结构化问答
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a VTT file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VTT file (WebVTT — Web Video Text Tracks) is a subtitle and caption format designed for HTML5 video. It stores timed text cues with timestamps in the format HH:MM:SS.mmm --> HH:MM:SS.mmm. Unlike SRT, VTT uses a dot as the millisecond separator and supports additional styling features like positioning and color.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between VTT and SRT files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VTT (WebVTT) and SRT (SubRip) are both subtitle formats but differ in three key ways: (1) Timestamp separator: VTT uses a dot (00:00:01.000) while SRT uses a comma (00:00:01,000). (2) Use case: VTT is designed for web browsers and HTML5 video; SRT has broader compatibility with desktop video players. (3) Features: VTT supports cue settings for text positioning and styling; SRT is plain text only.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a VTT file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can open a VTT file in any text editor (Notepad, TextEdit, VS Code) to view or edit the content. For playback, modern web browsers support VTT natively via the HTML5 <track> element. VLC media player also supports VTT subtitle files.",
      },
    },
    {
      "@type": "Question",
      name: "How do I download YouTube subtitles as a VTT file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use YTVidHub to download YouTube subtitles as VTT files. Paste the YouTube video URL on ytvidhub.com, select VTT as the output format, and click Extract. You can also download entire playlists as VTT files in bulk. No software installation required.",
      },
    },
    {
      "@type": "Question",
      name: "What is a VTT file used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VTT files are primarily used for: (1) Web video players — the native subtitle format for HTML5 <video> elements. (2) Online course platforms — Coursera, Udemy, and similar platforms use VTT. (3) Accessibility — providing closed captions for web-based video content. (4) Video editing software — Adobe Premiere and DaVinci Resolve support VTT import.",
      },
    },
    {
      "@type": "Question",
      name: "What does a VTT file look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A VTT file starts with the required 'WEBVTT' header on the first line, followed by optional metadata, then individual cue blocks. Each cue has an optional cue identifier, a timestamp line (00:00:01.000 --> 00:00:04.000), and the subtitle text. Cues are separated by blank lines.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert a VTT file to SRT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. To convert VTT to SRT: (1) Remove the WEBVTT header line. (2) Replace dot millisecond separators with commas (00:00:01.000 → 00:00:01,000). (3) Add sequence numbers to each cue block. Alternatively, download subtitles directly as SRT from YTVidHub instead of converting.",
      },
    },
    {
      "@type": "Question",
      name: "What is the correct VTT timestamp format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The correct VTT timestamp format is HH:MM:SS.mmm --> HH:MM:SS.mmm. Hours are optional for timestamps under one hour (MM:SS.mmm is valid). The separator between start and end time is ' --> ' (space-arrow-space). Milliseconds use a dot, not a comma.",
      },
    },
  ],
};

// HowTo Schema — 覆盖 "how to download youtube subtitles vtt" 类意图
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Download YouTube Subtitles as a VTT File",
  description:
    "Download YouTube video subtitles as VTT (WebVTT) format files using YTVidHub — free, no installation required.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Copy the YouTube video URL",
      text: "Open the YouTube video you want subtitles from and copy the URL from the browser address bar.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Paste the URL into YTVidHub",
      text: "Go to ytvidhub.com and paste the YouTube URL into the input field.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select VTT as the output format",
      text: "Click the format dropdown and select VTT (WebVTT) as the subtitle format.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Extract and download",
      text: "Click 'Extract Subtitles'. The VTT file will be ready to download in under 10 seconds.",
    },
  ],
};

// TechArticle Schema — E-E-A-T 信号
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What Is a VTT File? WebVTT Format, Syntax, and How to Download",
  description:
    "A complete guide to VTT (WebVTT) subtitle files — format rules, timestamp syntax, differences from SRT, and how to download YouTube subtitles as VTT for free.",
  url: "https://ytvidhub.com/what-is-vtt-file/",
  inLanguage: "en",
  datePublished: "2026-06-26",
  dateModified: "2026-06-26",
  isAccessibleForFree: true,
  author: {
    "@type": "Organization",
    name: "YTVidHub Editorial Team",
    url: "https://ytvidhub.com",
  },
  publisher: {
    "@type": "Organization",
    name: "YTVidHub",
    url: "https://ytvidhub.com",
  },
};

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ytvidhub.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "What Is a VTT File",
      item: "https://ytvidhub.com/what-is-vtt-file/",
    },
  ],
};

export default function VttFileLayout({ children }: Props) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
