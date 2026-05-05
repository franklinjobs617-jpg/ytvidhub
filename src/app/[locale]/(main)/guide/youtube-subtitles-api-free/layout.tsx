import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/youtube-subtitles-api-free");
  const canonicalUrl = alternates.canonical;

  const title = "YouTube Subtitles API Alternatives: Free Export to JSON/TXT";
  const description =
    "Discover free alternatives to the YouTube Subtitles API. Export clean subtitles directly to JSON or TXT format for development or research.";

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: "/image/og-image.webp", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/og-image.webp"],
    },
  };
}

export default async function YouTubeSubtitlesAPIFreeLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/youtube-subtitles-api-free", "YouTube Subtitles API Alternatives");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}