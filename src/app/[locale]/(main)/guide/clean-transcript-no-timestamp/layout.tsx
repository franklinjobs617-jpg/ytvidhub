import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { guideBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/guide/clean-transcript-no-timestamp");
  const canonicalUrl = alternates.canonical;

  const title = "Download YouTube Transcript as Text (No Timestamps) | YTVidHub";
  const description =
    "Learn how to download YouTube transcript as text and remove timestamps in seconds. Create clean transcript files for AI, notes, and research workflows.";

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

export default async function CleanTranscriptNoTimestampLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = guideBreadcrumbs(locale, "/guide/clean-transcript-no-timestamp", "Clean Transcript (No Timestamps)");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
