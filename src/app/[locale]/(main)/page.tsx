import { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ComparisonSlider from "@/components/landing/ComparisonSlider";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Testimonials from "@/components/landing/Testimonials";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = "https://ytvidhub.com";
  const localePath = locale === 'en' ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}`;

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
        'en': 'https://ytvidhub.com/',
        'es': 'https://ytvidhub.com/es/',
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ComparisonSlider />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CoreCapabilities />
      <FAQ />
    </>
  );
}