import { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/url";
import { guideEntries } from "@/lib/content-index";
import EditorialCardList from "@/components/editorial/EditorialCardList";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = buildCanonicalUrl({ locale, pathname: "/guide" });

  return {
    title: "YTVidHub Guides | Tutorials for Subtitle and Transcript Workflows",
    description:
      "Step-by-step guides for downloading, cleaning, structuring, and scaling YouTube subtitle workflows.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "YTVidHub Guides",
      description:
        "A focused tutorial library for subtitle extraction, data cleaning, and bulk processing.",
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function GuideIndexPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="editorial-hub">
      <main className="editorial-hub-inner">
        <section className="editorial-hub-hero">
          <p className="editorial-hub-kicker">Knowledge Base</p>
          <h1 className="editorial-hub-title">Guides</h1>
          <p className="editorial-hub-subtitle">
            Structured tutorials for teams that need clean transcript data,
            repeatable workflows, and predictable output quality.
          </p>
        </section>
        <EditorialCardList
          entries={guideEntries}
          basePath="/guide"
          ctaLabel="Open guide"
          locale={locale}
          filterAriaLabel="Guide categories"
        />
      </main>
    </div>
  );
}
