import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/landing/HeroSection";
import ExtensionBanner from "@/components/landing/ExtensionBanner";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import CoreCapabilities from "@/components/landing/CoreCapabilities";
import FAQ from "@/components/landing/FAQ";
import SeoIntentSections from "@/components/landing/SeoIntentSections";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
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
  const localizedApplicationNames: Record<string, string> = {
    zh: "YouTube字幕下载工具",
    es: "Descargador de Subtitulos de YouTube",
  };
  const localizedApplicationDescriptions: Record<string, string> = {
    zh: "在线下载YouTube字幕，支持SRT、VTT、TXT格式，可从视频、播放列表和频道提取字幕。",
    es: "Herramienta online para descargar subtitulos de YouTube en SRT, VTT y TXT desde videos, playlists y canales.",
  };
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: localizedApplicationNames[locale] ?? "YouTube Subtitle Downloader",
    description:
      localizedApplicationDescriptions[locale] ??
      "Download YouTube subtitles, captions, and transcripts as SRT, VTT, or TXT from videos, playlists, and channels.",
    url: buildCanonicalUrl({ locale, pathname: "" }),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList:
      locale === "zh"
        ? [
            "YouTube字幕下载",
            "YouTube字幕提取",
            "SRT字幕下载",
            "VTT字幕下载",
            "TXT字幕导出",
            "播放列表和频道批量字幕下载",
          ]
        : locale === "es"
        ? [
            "Descargar subtitulos de YouTube",
            "Exportar subtitulos SRT",
            "Exportar captions VTT",
            "Descargar TXT limpio",
            "Descarga masiva desde playlists y canales",
          ]
        : [
            "Download YouTube subtitles",
            "Download YouTube captions",
            "Export SRT subtitles",
            "Export VTT captions",
            "Export clean TXT transcripts",
            "Bulk playlist and channel subtitle downloads",
          ],
  };

  const heroHeader = (
    <div className="mx-auto mb-10 max-w-4xl">
      <h1 className="mb-4 text-[42px] font-semibold leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl">
        {t('title')}
      </h1>
      <h2 className="mx-auto mb-5 max-w-2xl text-base font-normal leading-7 text-[#404040] md:text-lg">
        {t.rich('subtitle', {
          highlight: (chunks) => (
            <span className="font-semibold text-[#0a0a0a] underline decoration-[#3b82f6] decoration-2 underline-offset-4">
              {chunks}
            </span>
          )
        })}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs text-[#404040]">
        <span className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 font-medium">{t('ticker.subtitles')}</span>
        <span className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 font-medium">{t('ticker.caption')}</span>
        <span className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 font-medium">{t('ticker.transcript')}</span>
        <span className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1 font-medium">{t('ticker.bulk')}</span>
      </div>
    </div>
  );

  return (
    <>
      <ScrollDepthTracker page="home" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <HeroSection heroHeader={heroHeader} />
      <SeoIntentSections locale={locale} />
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
