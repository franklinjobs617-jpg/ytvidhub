import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { toolBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/youtube-video-summarizer");

  // ⚠️ TDH 说明：
  // 核心词：youtube video summarizer（KD≈42, Vol=63.7K）
  //         youtube summarizer（Vol=49.5K）
  //         summarize youtube video（Vol=28.3K）
  // Title：核心词置首，55字符，加 Free + AI 差异化
  // Description：148字符，含三个核心词变体，直接回答"我能得到什么"
  const title = "YouTube Video Summarizer — Free AI Summary in Seconds";
  const description =
    "Summarize any YouTube video with AI in seconds. Paste a URL and get key points, timestamps, and insights — free. Supports playlists and 100+ languages.";

  return {
    title,
    description,
    keywords: [
      "youtube video summarizer",
      "youtube summarizer",
      "summarize youtube video",
      "youtube summary",
      "youtube ai summarizer",
      "ai youtube video summarizer",
      "youtube video summary",
      "free youtube summarizer",
      "youtube summary generator",
      "video summarizer",
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

// SoftwareApplication Schema — AI GEO 关键
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "YTVidHub YouTube Video Summarizer",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free AI-powered YouTube video summarizer. Paste any YouTube URL to get key points, structured summaries, and timestamped insights in seconds. Supports playlists and 100+ languages.",
  url: "https://ytvidhub.com/youtube-video-summarizer/",
  featureList: [
    "AI-generated video summary",
    "Key points extraction",
    "Timestamped chapter breakdown",
    "Playlist batch summarization",
    "100+ language support",
    "Export summary as text",
    "Study cards and flashcards generation",
  ],
};

// HowTo Schema — 覆盖 "how to summarize youtube video" 意图
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Summarize a YouTube Video with AI",
  description:
    "Use YTVidHub to generate an AI summary of any YouTube video in seconds — free, no install required.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste the YouTube URL",
      text: "Copy any YouTube video or playlist URL and paste it into the input field on YTVidHub.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Click AI Summary",
      text: "Click the 'AI Summary' button. YTVidHub extracts the transcript and sends it to the AI model.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your summary",
      text: "In about 30–60 seconds, you get a structured summary with key points and timestamped highlights. Copy, download, or generate study cards.",
    },
  ],
};

// FAQPage Schema — 与页面 FAQ 内容一致
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I summarize a YouTube video?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the YouTube video URL into YTVidHub and click 'AI Summary'. The tool extracts the video transcript and uses AI to generate a structured summary with key points in about 30–60 seconds. No account required for guest tries.",
      },
    },
    {
      "@type": "Question",
      name: "Is this YouTube summarizer free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub offers free AI summary tries without signing up. Create a free account to get 8 credits — each AI summary uses 2 credits. Pro plans start at $19.99/month for 500 credits (250 AI summaries).",
      },
    },
    {
      "@type": "Question",
      name: "Can I summarize a YouTube playlist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Paste a YouTube playlist URL to summarize all videos in bulk. Each video generates its own AI summary. This is useful for research, course review, and content analysis across many videos.",
      },
    },
    {
      "@type": "Question",
      name: "What languages does the YouTube summarizer support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YTVidHub supports AI summarization for videos in 100+ languages — any language with a subtitle or caption track on YouTube, including English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, and Hindi.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the AI summary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The summary quality depends on the quality of the video's subtitle track. Videos with creator-uploaded captions produce the most accurate summaries. Auto-generated captions work well for most videos in major languages.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to summarize YouTube videos for studying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After generating an AI summary, you can also create study cards (flashcards) from the video content. This makes it easy to review lectures, tutorials, and educational videos efficiently.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work without installing anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub is a web-based YouTube summarizer — no browser extension or software installation required. It works on desktop and mobile browsers.",
      },
    },
  ],
};

export default async function YouTubeVideoSummarizerLayout({ children, params }: Props) {
  const { locale } = await params;
  const breadcrumbItems = toolBreadcrumbs(
    locale,
    "/youtube-video-summarizer",
    "YouTube Video Summarizer"
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
