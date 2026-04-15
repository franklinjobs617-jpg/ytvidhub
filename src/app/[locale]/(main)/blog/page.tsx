import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { buildCanonicalUrl } from "@/lib/url";
import { blogEntries } from "@/lib/content-index";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = buildCanonicalUrl({ locale, pathname: "/blog" });

  return {
    title: "YTVidHub Blog | Product Notes, Workflows, and Engineering",
    description:
      "Read practical articles about subtitle workflows, transcript quality, and engineering decisions behind YTVidHub.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "YTVidHub Blog",
      description:
        "Workflow notes and engineering write-ups for subtitle extraction and transcript operations.",
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
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
          <p className="editorial-hub-kicker">Editorial</p>
          <h1 className="editorial-hub-title">Blog</h1>
          <p className="editorial-hub-subtitle">
            Practical write-ups on product workflow, transcript quality, and
            system design decisions from the YTVidHub team.
          </p>
        </section>

        <section className="editorial-card-grid">
          {blogEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/blog/${entry.slug}`}
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
                <span className="editorial-card-cta">Read article</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
