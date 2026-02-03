import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ytvidhub.com"),
  title: "YouTube Subtitle Downloader | Bulk Extract SRT, VTT & TXT Captions",
  description:
    "Professional YouTube subtitle downloader for single videos and bulk playlist extraction. Download SRT, VTT, TXT captions for AI training, accessibility, and content creation. Free with 5 daily credits.",
  
  keywords: [
    "youtube subtitle downloader",
    "bulk youtube subtitle downloader", 
    "youtube caption downloader",
    "download youtube subtitles",
    "youtube transcript downloader",
    "youtube srt downloader",
    "youtube vtt downloader",
    "bulk subtitle extractor",
    "youtube playlist subtitle download",
    "ai training data extraction"
  ],
  
  openGraph: {
    title: "YouTube Subtitle Downloader | Bulk Extract Captions from Videos & Playlists",
    description:
      "Download YouTube subtitles from single videos or entire playlists. Professional tool for AI training, content creation, and accessibility projects.",
    url: "https://ytvidhub.com/",
    siteName: "YTVidHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "YTVidHub - YouTube Subtitle Downloader Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "YouTube Subtitle Downloader | Extract Captions & Transcripts",
    description:
      "Download subtitles from YouTube videos and playlists. Perfect for AI training and content creation.",
    images: ["/image/og-image.webp"],
  },

  alternates: {
    canonical: "https://ytvidhub.com/",
  },
  icons: {
    icon: "/image/yyt.png",
    shortcut: "/image/yyt.png",
  },
  other: {
    "google-adsense-account": "ca-pub-3383070348689557",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YTVidHub - YouTube Subtitle Downloader",
    "description": "Professional YouTube subtitle downloader for single videos and bulk playlist extraction. Download SRT, VTT, TXT captions for AI training and content creation.",
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
        name: "How do I download YouTube subtitles for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YTVidHub is a free YouTube subtitle downloader that allows you to extract captions from individual videos or bulk download from playlists. Simply paste the YouTube URL and choose your preferred format (SRT, VTT, or TXT).",
        },
      },
      {
        "@type": "Question",
        name: "Can I download subtitles from YouTube playlists in bulk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our bulk YouTube subtitle downloader can extract captions from entire playlists and channels. Professional plans support unlimited bulk downloads for large-scale projects.",
        },
      },
      {
        "@type": "Question",
        name: "What subtitle formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our YouTube subtitle downloader supports SRT (SubRip), VTT (WebVTT), and clean TXT formats. Choose the format that best fits your needs - SRT for video players, VTT for web, or TXT for AI training.",
        },
      },
      {
        "@type": "Question",
        name: "Does this work with auto-generated YouTube captions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our YouTube transcript downloader can extract both manually uploaded subtitles and YouTube's auto-generated closed captions in all available languages.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a limit to how many YouTube subtitles I can download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Free users get 5 daily credits for subtitle downloads. Pro members enjoy unlimited bulk YouTube subtitle extraction for large-scale AI training and content creation projects.",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        ></script>
        {/* Google Analytics - Global Site Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KZZ05YN8TX" //
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
      </head>
      <body
        className={`${fontBody.variable} ${fontDisplay.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        <AuthProvider>
          <NextTopLoader color="#7c3aed" showSpinner={false} />
          {children}
          <Toaster richColors closeButton position="top-center" offset="90px" />
        </AuthProvider>
      </body>
    </html>
  );
}
