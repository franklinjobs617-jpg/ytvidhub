import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/youtube-transcript-downloader");

  // ⚠️ TDH：
  // Title：核心词 "YouTube Transcript Downloader" 置首，加 Free + Bulk 差异化
  // Description：直接回答用户意图（下载），含 playlist 覆盖 Vol=1900 的变体词
  // 字符数：Title=60, Description=152，均在上限内
  const title = "YouTube Transcript Downloader — Free, Bulk & No Install";
  const description =
    "Download YouTube transcripts as TXT, SRT, or VTT in seconds. Supports single videos, full playlists, and entire channels. Free — no software needed.";

  return {
    title,
    description,
    keywords: [
      "youtube transcript downloader",
      "youtube video playlist transcript downloader",
      "downloading youtube transcripts",
      "free youtube transcript downloader",
      "transcript downloader youtube",
      "download youtube transcript",
      "youtube transcript download",
      "bulk transcript download youtube",
    ],
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// SoftwareApplication Schema — AI GEO + 工具类页面标准
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YTVidHub YouTube Transcript Downloader",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Download YouTube transcripts as TXT, SRT, or VTT. Supports bulk playlist and channel downloads. Free, no install required.",
  url: "https://ytvidhub.com/youtube-transcript-downloader/",
  featureList: [
    "Single video transcript download",
    "Full playlist transcript bulk download",
    "YouTube channel transcript download",
    "TXT, SRT, VTT export formats",
    "100+ language support",
    "No software installation required",
  ],
};

// HowTo Schema — 覆盖 "how to download youtube transcript" 意图
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Download a YouTube Transcript",
  description: "Download a YouTube video transcript as TXT, SRT, or VTT using YTVidHub — free, no install.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste the YouTube URL",
      text: "Copy any YouTube video, playlist, or channel URL and paste it into the YTVidHub input field.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select output format",
      text: "Choose TXT for plain text, SRT for timestamped subtitles, or VTT for web video players.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download the transcript",
      text: "Click Extract. Your transcript file downloads in under 10 seconds. For playlists, all files are bundled into one ZIP.",
    },
  ],
};

// FAQPage Schema — AI GEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download a YouTube transcript?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the YouTube video URL into YTVidHub, select your preferred format (TXT, SRT, or VTT), and click Extract. Your transcript downloads in under 10 seconds. No software installation needed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download transcripts from an entire YouTube playlist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paste a YouTube playlist URL into YTVidHub to download transcripts from all videos at once. All files are packaged into a single ZIP download — bulk transcript downloading with no manual work.",
      },
    },
    {
      "@type": "Question",
      name: "What formats can I download YouTube transcripts in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YTVidHub exports transcripts as TXT (plain text without timestamps, ideal for notes and AI tools), SRT (timestamped subtitle format for video editing), and VTT (WebVTT format for web video players).",
      },
    },
    {
      "@type": "Question",
      name: "Is this YouTube transcript downloader free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub is free to use. Sign up for a free account to get 5 download credits. No credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for YouTube channels too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paste a YouTube channel URL to download transcripts from all videos in that channel at once. This is useful for research, content analysis, and building AI training datasets.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download YouTube transcripts without timestamps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Choose TXT as the export format to get plain paragraph text with no timestamps — ready for notes, search, research, and AI prompts.",
      },
    },
    {
      "@type": "Question",
      name: "What languages are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YTVidHub supports transcript download in 100+ languages, including English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, and Hindi — any language available on the YouTube video.",
      },
    },
  ],
};

export default async function TranscriptDownloaderLayout({ children, params }: Props) {
  const { locale } = await params;
  const breadcrumbItems = toolBreadcrumbs(
    locale,
    "/youtube-transcript-downloader",
    "YouTube Transcript Downloader"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {children}
    </>
  );
}
