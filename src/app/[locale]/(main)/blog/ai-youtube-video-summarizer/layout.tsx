import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/ai-youtube-video-summarizer");
  const canonicalUrl = alternates.canonical;

  const title = "AI YouTube Video Summarizer | Fast Bulk Summaries | YTVidHub";
  const description =
    "Transform YouTube videos into actionable insights with YTVidHub AI Summarizer. Get fast bulk summaries, structured transcripts, and interactive analysis instantly.";

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: "/image/blog-ai-summary-interface.webp",
          width: 1200,
          height: 630,
          alt: "YTVidHub AI Summary interface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/blog-ai-summary-interface.webp"],
    },
  };
}

export default function AIYouTubeVideoSummarizerLayout({ children }: Props) {
  return children;
}
