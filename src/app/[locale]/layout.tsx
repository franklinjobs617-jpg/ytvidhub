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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // 构建当前页面的完整 URL
  const baseUrl = "https://ytvidhub.com";
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  // 动态生成 locale 映射
  const getOpenGraphLocale = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'en_US';
      case 'es':
        return 'es_ES';
      default:
        return 'en_US';
    }
  };

  return {
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
          url: `${baseUrl}/image/og-image.webp`,
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
      images: [`${baseUrl}/image/og-image.webp`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/`,
        'es': `${baseUrl}/es/`,
        'x-default': `${baseUrl}/`, // 添加默认语言标记
      },
    },

    // 添加其他 SEO 相关的元数据
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

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'schema' });

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
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ytvidhub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t('faq.q1'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a1'),
        },
      },
      {
        "@type": "Question",
        name: t('faq.q2'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a2'),
        },
      },
      {
        "@type": "Question",
        name: t('faq.q3'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a3'),
        },
      },
      {
        "@type": "Question",
        name: t('faq.q4'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a4'),
        },
      },
      {
        "@type": "Question",
        name: t('faq.q5'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a5'),
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* 添加 hreflang 链接 */}
        <link rel="alternate" hrefLang="en" href="https://ytvidhub.com/" />
        <link rel="alternate" hrefLang="es" href="https://ytvidhub.com/es/" />
        <link rel="alternate" hrefLang="x-default" href="https://ytvidhub.com/" />
      </head>
      <body>
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

        <Script id="microsoft-clarity" strategy="afterInteractive">
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