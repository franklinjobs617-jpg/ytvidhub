"use client";

import { useTranslations } from "next-intl";
import LandingSectionHeader from "@/components/landing/LandingSectionHeader";

type ReviewItem = {
  name: string;
  role: string;
  content: string;
};

const AVATAR_STYLES = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-blue-600",
  "from-sky-500 to-indigo-500",
];

function getInitials(name: string) {
  const chars = name.trim();
  if (!chars) return "U";
  return chars.slice(0, 1).toUpperCase();
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const reviews = t.raw("reviews") as ReviewItem[];

  return (
    <section className="bg-[var(--surface-page)] py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <LandingSectionHeader className="mb-16" title={t("title")} description={t("description")} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_35px_-30px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_44px_-34px_rgba(37,99,235,0.55)]"
            >
              <div className="mb-4 text-blue-300">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              <blockquote className="flex-grow text-base leading-relaxed text-slate-600">
                &ldquo;{review.content}&rdquo;
              </blockquote>

              <footer className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-sm ${AVATAR_STYLES[index % AVATAR_STYLES.length]}`}
                  aria-hidden="true"
                >
                  {getInitials(review.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{review.name}</p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-600">
                    {review.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
