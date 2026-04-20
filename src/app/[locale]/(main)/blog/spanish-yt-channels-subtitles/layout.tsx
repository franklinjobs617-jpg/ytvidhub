import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/spanish-yt-channels-subtitles");
  const canonicalUrl = alternates.canonical;

  const title = "Top Spanish YouTube Channels for Language Learning Subtitles";
  const description =
    "Find the best Spanish YouTube channels with quality subtitles for language learning. Download transcripts easily for study materials.";

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
          url: "/image/language-learning-anki-youtube-workflow.webp",
          width: 1200,
          height: 630,
          alt: "Learn Spanish with subtitles",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/language-learning-anki-youtube-workflow.webp"],
    },
  };
}

export default function SpanishYTChannelsLayout({ children }: Props) {
  return children;
}
