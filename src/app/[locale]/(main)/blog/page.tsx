import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import { blogEntries } from "@/lib/content-index";
import EditorialCardList from "@/components/editorial/EditorialCardList";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const alternates = buildAlternates(locale, "/blog");
  const canonicalUrl = alternates.canonical;

  return {
    title: "YTVidHub Blog | Product Notes, Workflows, and Engineering",
    description:
      "Read practical articles about subtitle workflows, transcript quality, and engineering decisions behind YTVidHub.",
    alternates,
    openGraph: {
      title: "YTVidHub Blog",
      description:
        "Workflow notes and engineering write-ups for subtitle extraction and transcript operations.",
      url: canonicalUrl,
      type: "website",
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
      title: "YTVidHub Blog",
      description:
        "Workflow notes and engineering write-ups for subtitle extraction and transcript operations.",
      images: ["/image/og-image.webp"],
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="editorial-hub">
      <main className="editorial-hub-inner">
        <section className="editorial-hub-hero">
          <p className="editorial-hub-kicker">Editorial</p>
          <h1 className="editorial-hub-title">Blog</h1>
          <p className="editorial-hub-subtitle">
            Practical write-ups on product workflow, transcript quality, and
            system design decisions from the YTVidHub team.
          </p>
        </section>
        <EditorialCardList
          entries={blogEntries}
          basePath="/blog"
          ctaLabel="Read article"
          locale={locale}
          filterAriaLabel="Blog categories"
        />
      </main>
    </div>
  );
}
