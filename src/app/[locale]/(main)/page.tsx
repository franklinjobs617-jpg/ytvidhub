import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import ExtensionBanner from "@/components/landing/ExtensionBanner";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";

const ComparisonSlider = dynamic(() => import("@/components/landing/ComparisonSlider"));
const FeaturesGrid = dynamic(() => import("@/components/landing/FeaturesGrid"));
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"));
const CoreCapabilities = dynamic(() => import("@/components/landing/CoreCapabilities"));
const FAQ = dynamic(() => import("@/components/landing/FAQ"));

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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname: '' }),
        'es': buildCanonicalUrl({ locale: 'es', pathname: '' }),
        'de': buildCanonicalUrl({ locale: 'de', pathname: '' }),
        'ko': buildCanonicalUrl({ locale: 'ko', pathname: '' }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname: '' }),
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const heroHeader = (
    <div className="max-w-4xl mx-auto mb-12">
      <h1 className="text-4xl md:text-6xl font-display uppercase tracking-wide text-slate-900 leading-tight mb-4 drop-shadow-sm">
        {t('title')}
      </h1>
      <h2 className="text-base md:text-lg font-medium text-slate-600 max-w-2xl mx-auto italic mb-4">
        {t.rich('subtitle', {
          highlight: (chunks) => <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md font-semibold">{chunks}</span>
        })}
      </h2>
      <div className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
        <span className="font-medium">{t('ticker.subtitles')}</span> • <span className="font-medium">{t('ticker.caption')}</span> • <span className="font-medium">{t('ticker.transcript')}</span> • <span className="font-medium">{t('ticker.bulk')}</span>
      </div>
    </div>
  );

  return (
    <>
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