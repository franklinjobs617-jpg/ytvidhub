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
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-wide text-slate-900">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-100 mb-5 aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-500 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {t('cta.text')}
          </p>

          <Link
            href="/data-prep-guide"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 font-bold py-3.5 px-8 rounded-xl text-lg shadow-sm transition-all hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
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
