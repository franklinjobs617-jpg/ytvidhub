import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { blogBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/creator-tutorials");
  const canonicalUrl = alternates.canonical;

  const title =
    "How to Repurpose YouTube Transcripts into Blog Posts & Social Media | YTVidHub";
  const description =
    "Step-by-step creator workflow for turning YouTube transcripts into blog posts, social media content, and reusable publishing assets. Save hours of manual work.";

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

export default async function CreatorTutorialsLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = blogBreadcrumbs(locale, "/blog/creator-tutorials", "Creator Tutorials");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
