import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { blogBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(
    locale,
    "/blog/how-to-get-youtube-video-transcript"
  );
  const canonicalUrl = alternates.canonical;

  const title = "How to Get Transcript of YouTube Video (2026 Guide) | YTVidHub";
  const description =
    "Learn how to get transcript of YouTube video using Show Transcript, manual copy, or instant download tools. Includes TXT, SRT, and fast workflow tips.";

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

export default async function HowToGetYouTubeTranscriptLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = blogBreadcrumbs(locale, "/blog/how-to-get-youtube-video-transcript", "How to Get YouTube Video Transcript");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}

