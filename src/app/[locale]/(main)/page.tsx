import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import ExtensionBanner from "@/components/landing/ExtensionBanner";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import { buildAlternates } from "@/lib/seo";

const ComparisonSlider = dynamic(() => import("@/components/landing/ComparisonSlider"));
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"));

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const canonicalUrl = buildCanonicalUrl({ locale, pathname: '' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      images: [
        {
          url: "/image/og-home.webp",
          width: 1200,
          height: 630,
          alt: "YTVidHub YouTube Subtitle Downloader Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/image/og-home.webp"],
    },
    alternates: buildAlternates(locale, '', true),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const faqT = await getTranslations({ locale, namespace: 'faq' });

  const faqKeys = ['legal', 'transcript', 'formats', 'bulk', 'languages', 'limits'] as const;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqKeys.map(key => ({
      "@type": "Question",
      "name": faqT(`questions.${key}.question`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faqT(`questions.${key}.answer`)
      }
    }))
  };

  const heroHeader = (
    <div className="mx-auto mb-12 max-w-4xl">
      <h1 className="mb-4 text-4xl font-display leading-[1.05] tracking-[-0.025em] text-slate-900 md:text-6xl">
        {t('title')}
      </h1>
      <h2 className="mx-auto mb-5 max-w-2xl text-base font-medium text-slate-600 md:text-lg">
        {t.rich('subtitle', {
          highlight: (chunks) => (
            <span className="rounded-md bg-[var(--brand-50)] px-1.5 py-0.5 font-semibold text-[var(--brand-700)]">
              {chunks}
            </span>
          )
        })}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">{t('ticker.subtitles')}</span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">{t('ticker.caption')}</span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">{t('ticker.transcript')}</span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium">{t('ticker.bulk')}</span>
      </div>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection heroHeader={heroHeader} />
      <ExtensionBanner />
      <ComparisonSlider />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CoreCapabilities />
      <FAQ />
    </>
  );
}
