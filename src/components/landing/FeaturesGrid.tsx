"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function FeaturesGrid() {
  const t = useTranslations('featuresGrid');

  const features = [
    {
      title: t('items.clean.title'),
      description: t('items.clean.description'),
      image: "/image/ytvidhub-clean-txt-research-data.webp",
      alt: t('items.clean.alt'),
    },
    {
      title: t('items.llm.title'),
      description: t('items.llm.description'),
      image: "/image/ytvidhub-llm-data-prep-application.webp",
      alt: t('items.llm.alt'),
    },
    {
      title: t('items.credits.title'),
      description: t('items.credits.description'),
      image: "/image/ytvidhub-5-daily-credits-freemium-show.webp",
      alt: t('items.credits.alt'),
    },
  ];

  return (
    <section className="bg-[var(--surface-page)] py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_32px_48px_-34px_rgba(37,99,235,0.55)]"
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
            {t('cta.text')}
          </p>

          <Link
            href="/data-prep-guide"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-8 py-3.5 text-lg font-bold text-white shadow-[0_22px_30px_-20px_rgba(37,99,235,0.92)] transition-all hover:-translate-y-0.5 hover:from-[var(--brand-700)] hover:to-[var(--brand-700)]"
          >
            {t('cta.button')}
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
