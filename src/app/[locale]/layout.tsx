import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { getMessages, getTranslations } from "next-intl/server";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import LanguagePreloader from "@/components/LanguagePreloader";
import SourceCapture from "@/components/SourceCapture";
import { buildCanonicalUrl, SITE_ORIGIN } from "@/lib/url";
import { Inter, Space_Grotesk, Noto_Sans_SC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  variable: "--font-heading-cjk",
  display: "swap",
  preload: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 1. 动态生成元数据 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const currentUrl = buildCanonicalUrl({ locale, pathname: "" });

  const getOpenGraphLocale = (locale: string) => {
    switch (locale) {
      case "en":
        return "en_US";
      case "es":
        return "es_ES";
      case "de":
        return "de_DE";
      case "ko":
        return "ko_KR";
      case "ja":
        return "ja_JP";
      case "ru":
        return "ru_RU";
      default:
        return "en_US";
    }
  };

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      siteName: "YTVidHub",
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: [
        {
          url: `/image/yyt.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`/image/yyt.png`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        en: buildCanonicalUrl({ locale: "en", pathname: "" }),
        es: buildCanonicalUrl({ locale: "es", pathname: "" }),
        de: buildCanonicalUrl({ locale: "de", pathname: "" }),
        ko: buildCanonicalUrl({ locale: "ko", pathname: "" }),
        ja: buildCanonicalUrl({ locale: "ja", pathname: "" }),
        ru: buildCanonicalUrl({ locale: "ru", pathname: "" }),
        "x-default": buildCanonicalUrl({ locale: "en", pathname: "" }),
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 2. 布局组件
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "schema" });

  // 结构化数据 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("name"),
    description: t("description"),
    url: "https://ytvidhub.com/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "YouTube subtitle downloader",
      "Bulk YouTube subtitle extraction",
      "SRT format download",
      "VTT format download",
      "TXT format download",
      "Playlist subtitle download",
      "AI training data extraction",
      "Multi-language support",
    ],
  };

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansSC.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="saashub-verification" content="myoi6jk5w99z" />

    
        {/* Google AdSense 广告代码 */}
        <Script
          id="adsbygoogle-init"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KZZ05YN8TX"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <NextTopLoader color="#2563eb" showSpinner={false} />
            <LanguagePreloader />
            <SourceCapture />
            {children}
            <Toaster
              richColors
              closeButton
              position="top-center"
              offset="90px"
            />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
