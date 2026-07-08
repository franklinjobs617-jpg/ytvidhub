import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import BreadcrumbSchema, { resourceBreadcrumbs } from "@/components/seo/BreadcrumbSchema";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/tactiq-alternative";
  const alternates = buildAlternates(locale, pathname);

  // ⚠️ TDH 決策依据：
  // 核心词：tactiq youtube transcript generator (KD=15, Vol=1.9K)
  //         tactiq youtube transcript (KD=22, Vol=2.4K)
  // Title：品牌词置首，明确是 alternative 对比页，≤60字符
  // Description：直接回答"为什么选 YTVidHub 而不是 Tactiq"，≤155字符
  const title = "Tactiq Alternative for YouTube Transcripts | YTVidHub";
  const description =
    "Compare YTVidHub vs Tactiq for YouTube transcript generation. Free bulk playlist downloads, AI summaries, and no Chrome extension required.";

  return {
    title,
    description,
    keywords: [
      "tactiq alternative",
      "tactiq youtube transcript generator",
      "tactiq youtube transcript",
      "tactiq.io alternative",
      "tactiq io youtube transcript",
      "youtube transcript generator alternative to tactiq",
      "free tactiq alternative",
    ],
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "article",
      publishedTime: "2026-07-08",
      modifiedTime: "2026-07-08",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Article Schema — alternative 比较页
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tactiq Alternative for YouTube Transcript Generation — YTVidHub",
  description:
    "A detailed comparison of YTVidHub vs Tactiq for YouTube transcript generation, including features, pricing, and use cases.",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  author: { "@type": "Organization", name: "YTVidHub Editorial Team", url: "https://ytvidhub.com" },
  publisher: { "@type": "Organization", name: "YTVidHub", url: "https://ytvidhub.com" },
};

// FAQPage Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is there a free alternative to Tactiq for YouTube transcripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub is a free Tactiq alternative for YouTube transcript generation. It works directly in the browser without a Chrome extension, supports bulk playlist downloads, and includes AI-powered summaries. Free accounts get 5 credits on signup.",
      },
    },
    {
      "@type": "Question",
      name: "What is Tactiq used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tactiq is a Chrome extension primarily designed for generating transcripts of online meetings (Google Meet, Zoom, Teams) and YouTube videos. It integrates with AI tools to produce meeting summaries and action items.",
      },
    },
    {
      "@type": "Question",
      name: "How does YTVidHub compare to Tactiq for YouTube transcripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YTVidHub focuses specifically on YouTube content and supports bulk downloads from playlists and channels — something Tactiq does not offer for YouTube. YTVidHub also works without installing a Chrome extension and exports transcripts as TXT, SRT, or VTT files.",
      },
    },
    {
      "@type": "Question",
      name: "Does YTVidHub require a Chrome extension like Tactiq?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. YTVidHub is entirely web-based and works in any browser without installing an extension. An optional Chrome extension is available for convenience, but it is not required.",
      },
    },
    {
      "@type": "Question",
      name: "Can YTVidHub download transcripts from entire YouTube playlists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. YTVidHub supports bulk transcript downloads from YouTube playlists and channels. Paste a playlist URL and download all transcripts in one ZIP file. Tactiq does not offer this bulk playlist workflow for YouTube.",
      },
    },
  ],
};

export default async function TactiqAlternativeLayout({ children, params }: Props) {
  const { locale } = await params;
  const breadcrumbItems = resourceBreadcrumbs(locale, "/tactiq-alternative", "Tactiq Alternative");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
