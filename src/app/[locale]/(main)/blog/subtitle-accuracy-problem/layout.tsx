import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/subtitle-accuracy-problem");
  const canonicalUrl = alternates.canonical;

  const title =
    "The Hidden Problem in Your Data Pipeline: Why Multilingual Subtitles are Rarely 'Ready-to-Use'";
  const description =
    "YTVidHub supports all languages, but we analyze why auto-generated multilingual subtitles have low accuracy. A must-read for researchers and data analysts before data prep.";

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
          url: "/image/og-image.webp",
          width: 1200,
          height: 630,
          alt: "YTVidHub Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/og-image.webp"],
    },
  };
}

export default function SubtitleAccuracyLayout({ children }: Props) {
  return children;
}
