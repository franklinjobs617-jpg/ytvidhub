"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { ContentEntry } from "@/lib/content-index";

type EditorialCardListProps = {
  entries: ContentEntry[];
  basePath: "/blog" | "/guide";
  ctaLabel: string;
  locale: string;
  filterAriaLabel: string;
};

export default function EditorialCardList({
  entries,
  basePath,
  ctaLabel,
  locale,
  filterAriaLabel,
}: EditorialCardListProps) {
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(entries.map((entry) => entry.tag)))],
    [entries],
  );
  const [activeTag, setActiveTag] = useState<string>("All");

  const filteredEntries = useMemo(() => {
    if (activeTag === "All") return entries;
    return entries.filter((entry) => entry.tag === activeTag);
  }, [activeTag, entries]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale],
  );

  return (
    <>
      <section className="editorial-filter-row" aria-label={filterAriaLabel}>
        {tags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveTag(tag)}
              className={`editorial-filter-pill ${isActive ? "is-active" : ""}`}
            >
              {tag}
            </button>
          );
        })}
      </section>

      <section className="editorial-card-grid">
        {filteredEntries.map((entry) => (
          <Link
            key={entry.slug}
            href={`${basePath}/${entry.slug}`}
            className="editorial-card"
          >
            <div className="editorial-card-media-wrap">
              {entry.coverImage ? (
                <Image
                  src={entry.coverImage}
                  alt={entry.coverAlt || entry.title}
                  width={1536}
                  height={1024}
                  className="editorial-card-media-img"
                  sizes="(min-width: 1200px) 560px, (min-width: 840px) 48vw, 100vw"
                />
              ) : (
                <div className="editorial-card-media-fallback" aria-hidden="true">
                  {entry.tag}
                </div>
              )}
            </div>
            <div className="editorial-card-head">
              <span className="editorial-card-tag">{entry.tag}</span>
            </div>
            <h2 className="editorial-card-title">{entry.title}</h2>
            <p className="editorial-card-excerpt">{entry.excerpt}</p>
            <div className="editorial-card-foot">
              <span>{dateFormatter.format(new Date(entry.updatedAt))}</span>
              <span className="editorial-card-meta-right">
                <span>{entry.readTime}</span>
                <span className="editorial-card-cta">{ctaLabel}</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
