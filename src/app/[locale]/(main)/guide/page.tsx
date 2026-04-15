import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { buildCanonicalUrl } from "@/lib/url";
import { guideEntries } from "@/lib/content-index";

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
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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

        <section className="editorial-card-grid">
          {guideEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/guide/${entry.slug}`}
              className="editorial-card"
            >
              <div className="editorial-card-head">
                <span className="editorial-card-tag">{entry.tag}</span>
                <span className="editorial-card-time">{entry.readTime}</span>
              </div>
              <h2 className="editorial-card-title">{entry.title}</h2>
              <p className="editorial-card-excerpt">{entry.excerpt}</p>
              <div className="editorial-card-foot">
                <span>{dateFormatter.format(new Date(entry.updatedAt))}</span>
                <span className="editorial-card-cta">Open guide</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
