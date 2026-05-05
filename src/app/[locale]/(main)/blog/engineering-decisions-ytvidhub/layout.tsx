import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { blogBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog/engineering-decisions-ytvidhub");
  const canonicalUrl = alternates.canonical;

  const title = "Building a YouTube Subtitle Pipeline: Architecture Decisions & Lessons | YTVidHub";
  const description =
    "How we built YTVidHub's bulk YouTube subtitle downloader — queue design, clean TXT export for LLM pipelines, and scaling decisions for high-concurrency subtitle extraction.";

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
          url: "/image/ytvidhub-bulk-downloader-architecture-flow.png",
          width: 1200,
          height: 630,
          alt: "YTVidHub architecture flow",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/ytvidhub-bulk-downloader-architecture-flow.png"],
    },
  };
}

export default async function EngineeringDecisionsLayout({ children, params }: Props) {
  const { locale } = await params;
  const items = blogBreadcrumbs(locale, "/blog/engineering-decisions-ytvidhub", "Engineering Decisions");
  return (
    <>
      <BreadcrumbSchema items={items} />
      {children}
    </>
  );
}
