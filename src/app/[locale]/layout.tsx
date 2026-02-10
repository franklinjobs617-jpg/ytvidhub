import { NextIntlClientProvider } from 'next-intl';
import '../globals.css'
import { getMessages, getTranslations } from 'next-intl/server';
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Script from "next/script";
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';
import LanguagePreloader from '@/components/LanguagePreloader';
import { buildCanonicalUrl, SITE_ORIGIN } from '@/lib/url';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 1. 动态生成元数据 (SEO)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const currentUrl = buildCanonicalUrl({ locale, pathname: '' });

  const getOpenGraphLocale = (locale: string) => {
    switch (locale) {
      case 'en': return 'en_US';
      case 'es': return 'es_ES';
      default: return 'en_US';
    }
  };

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),

    openGraph: {
      title: t('title'),
      description: t('description'),
      url: currentUrl,
      siteName: "YTVidHub",
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: [
        {
          url: `/image/og-image.webp`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: [`/image/og-image.webp`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'en': buildCanonicalUrl({ locale: 'en', pathname: '' }),
        'es': buildCanonicalUrl({ locale: 'es', pathname: '' }),
        'x-default': buildCanonicalUrl({ locale: 'en', pathname: '' }),
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 2. 布局组件
export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'schema' });

  // 结构化数据 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('name'),
    "description": t('description'),
    "url": "https://ytvidhub.com/",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "YouTube subtitle downloader",
      "Bulk YouTube subtitle extraction",
      "SRT format download",
      "VTT format download",
      "TXT format download",
      "Playlist subtitle download",
      "AI training data extraction",
      "Multi-language support"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": t('faq.q1'), "acceptedAnswer": { "@type": "Answer", "text": t('faq.a1') } },
      { "@type": "Question", "name": t('faq.q2'), "acceptedAnswer": { "@type": "Answer", "text": t('faq.a2') } },
      { "@type": "Question", "name": t('faq.q3'), "acceptedAnswer": { "@type": "Answer", "text": t('faq.a3') } },
      { "@type": "Question", "name": t('faq.q4'), "acceptedAnswer": { "@type": "Answer", "text": t('faq.a4') } },
      { "@type": "Question", "name": t('faq.q5'), "acceptedAnswer": { "@type": "Answer", "text": t('faq.a5') } }
    ]
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Google AdSense 广告代码 */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KZZ05YN8TX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KZZ05YN8TX'); 
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uszhcgfose");
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <NextTopLoader color="#7c3aed" showSpinner={false} />
            <LanguagePreloader />
            {children}
            <Toaster richColors closeButton position="top-center" offset="90px" />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}