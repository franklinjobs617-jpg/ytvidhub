import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { buildCanonicalUrl } from "@/lib/url";
import TranscriptGeneratorHero from "@/components/transcript/TranscriptGeneratorHero";
import TranscriptFeatures from "@/components/transcript/TranscriptFeatures";
import TranscriptHowItWorks from "@/components/transcript/TranscriptHowItWorks";
import TranscriptComparison from "@/components/transcript/TranscriptComparison";
import TranscriptFAQ from "@/components/transcript/TranscriptFAQ";

const TranscriptTestimonials = dynamic(() => import("@/components/transcript/TranscriptTestimonials"));

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transcriptPage' });

  const canonicalUrl = buildCanonicalUrl({ locale, pathname: '/youtube-transcript-generator' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      images: [
        {
          url: "/image/og-image.webp",
          width: 1200,
          height: 630,
          alt: "YouTube Transcript Generator - Free Online Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/image/og-image.webp"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-transcript-generator' }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname: '/youtube-transcript-generator' }),
      },
    },
  };
}

export default async function YouTubeTranscriptGeneratorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'transcriptPage' });
  const faqT = await getTranslations({ locale, namespace: 'transcriptFaq' });

  // FAQ JSON-LD for structured data
  const faqKeys = ['what', 'how', 'formats', 'free', 'accuracy', 'languages', 'extract', 'convert', 'best', 'automatic'] as const;
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

  // WebApplication JSON-LD
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YouTube Transcript Generator",
    "description": t('description'),
    "url": buildCanonicalUrl({ locale, pathname: '/youtube-transcript-generator' }),
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate transcripts from YouTube videos",
      "Support for multiple languages",
      "Export in SRT, VTT, TXT formats",
      "Batch processing capability",
      "AI-powered accuracy enhancement"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      <TranscriptGeneratorHero />
      <TranscriptFeatures />
      <TranscriptHowItWorks />
      <TranscriptComparison />
      <TranscriptTestimonials />
      <TranscriptFAQ />
    </>
  );
}