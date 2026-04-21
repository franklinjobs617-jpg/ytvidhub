import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is an SRT File? Free Download & Edit Guide (2026)",
  description:
    "SRT (SubRip Text) is the #1 subtitle format. Download YouTube SRT files free, edit timestamps in seconds, and convert to VTT/TXT. Works with VLC, Premiere Pro & all players.",
  keywords: [
    "what is an srt file",
    "srt file format",
    "how to open srt file",
    "how to create srt file",
    "srt vs vtt",
    "youtube subtitle downloader",
  ],
  alternates: {
    canonical: "https://ytvidhub.com/what-is-an-srt-file/",
  },
  openGraph: {
    title: "What Is an SRT File? Free Download & Edit Guide (2026)",
    description:
      "SRT (SubRip Text) is the #1 subtitle format. Download YouTube SRT files free, edit timestamps in seconds, and convert to VTT/TXT. Works with VLC, Premiere Pro & all players.",
    type: "article",
    publishedTime: "2026-01-01",
    modifiedTime: "2026-04-21",
    authors: ["YTVidHub"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is an SRT File? Free Download & Edit Guide (2026)",
    description:
      "SRT (SubRip Text) is the #1 subtitle format. Download YouTube SRT files free, edit timestamps in seconds, and convert to VTT/TXT. Works with VLC, Premiere Pro & all players.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the SRT timestamp format?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SRT timestamp format is HH:MM:SS,ms (hours:minutes:seconds,milliseconds). The separator between seconds and milliseconds is a comma, not a dot. Example: 00:01:23,456 --> 00:01:26,789",
      },
    },
    {
      "@type": "Question",
      name: "What does SRT stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SRT stands for SubRip Text. It is a plain-text subtitle format originally created by the SubRip software, now the most widely supported subtitle format across all video players and platforms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between SRT and VTT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SRT uses a comma as the millisecond separator (00:00:01,000) while VTT uses a dot (00:00:01.000). VTT (WebVTT) is designed for web browsers and supports additional styling features. SRT has broader compatibility with desktop video players like VLC.",
      },
    },
    {
      "@type": "Question",
      name: "How do I download YouTube subtitles as an SRT file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can download YouTube subtitles as SRT files using YTVidHub. Paste the YouTube video URL, select SRT as the output format, and click download. No software installation required - works directly in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use SRT files for AI training data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SRT files are commonly used for AI training data, especially for speech recognition and LLM fine-tuning. You can strip the timestamps to get clean plain text, or keep them for time-aligned training datasets.",
      },
    },
    {
      "@type": "Question",
      name: "What is the correct SRT file structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each SRT subtitle block has three parts: (1) a sequence number starting from 1, (2) a timestamp line in the format HH:MM:SS,ms --> HH:MM:SS,ms, and (3) the subtitle text. Blocks are separated by a blank line.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open an SRT file on Windows or macOS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can open an SRT file in Notepad, TextEdit, or VS Code for manual edits. For playback, use players like VLC and load the subtitle file from the subtitle menu.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create an SRT file manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Create a plain text file with repeating subtitle blocks: sequence number, timestamp line (HH:MM:SS,ms --> HH:MM:SS,ms), subtitle text, and one blank line. Save as UTF-8 with .srt extension.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "What Is an SRT File? How to Open, Edit & Download SRT Subtitles",
  description:
    "An SRT (SubRip Text) file is the most popular subtitle format for videos. Learn what SRT files are, how to open and edit them, and download SRT subtitles from any YouTube video for free.",
  url: "https://ytvidhub.com/what-is-an-srt-file/",
  inLanguage: "en",
  mainEntityOfPage: "https://ytvidhub.com/what-is-an-srt-file/",
  datePublished: "2026-01-01",
  dateModified: "2026-04-21",
  isAccessibleForFree: true,
  author: {
    "@type": "Organization",
    name: "YTVidHub Editorial Team",
    url: "https://ytvidhub.com",
  },
  reviewedBy: {
    "@type": "Organization",
    name: "YTVidHub Localization Workflow Team",
    url: "https://ytvidhub.com",
  },
  publisher: {
    "@type": "Organization",
    name: "YTVidHub",
    url: "https://ytvidhub.com",
  },
  citation: [
    "https://www.rev.com/resources/what-is-an-srt-file-format-create-use-srt-files",
    "https://www.ai-media.tv/knowledge-hub/insights/what-is-srt-file/",
    "https://lokalise.com/blog/what-is-an-srt-file-subtitle-format-explained/",
    "https://mailchimp.com/resources/what-is-an-srt-file/",
  ],
};

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
      name: "What Is an SRT File",
      item: "https://ytvidhub.com/what-is-an-srt-file/",
    },
  ],
};

export default function SRTFileLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
