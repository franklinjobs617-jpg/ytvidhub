import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
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
  title: "Bulk YouTube Subtitle Downloader for LLM & Research Data Prep",
  description:
    "Stop 100 clicks for data preparation. YTVidHub offers unique bulk download for playlists/channels and converts to optimized, clean TXT for LLM training. 5 free daily credits.",
  openGraph: {
    title: "Bulk YouTube Subtitle Downloader for LLM & Research Data Prep",
    description: "Stop 100 clicks for data preparation. Bulk download YouTube subtitles for LLM training and research.",
    url: "https://ytvidhub.com/",
    siteName: "YTVidHub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/image/og-image.webp", 
        width: 1200,
        height: 630,
        alt: "YTVidHub - Bulk YouTube Subtitle Downloader",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bulk YouTube Subtitle Downloader for LLM & Research Data Prep",
    description: "Stop 100 clicks for data preparation. Bulk download YouTube subtitles for LLM training.",
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
    "@type": "WebSite",
    name: "YTVidHub - Ultimate YouTube Subtitle Downloader",
    url: "https://ytvidhub.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ytvidhub.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube subtitle downloader completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YTVidHub is free for single downloads and includes 5 daily credits for bulk operations. Professional plans are available for high-volume data needs.",
        },
      },
      {
        "@type": "Question",
        name: "What URL formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support standard YouTube video URLs, playlist URLs, and channel page URLs. For bulk processing via file upload, ensure each URL is on a new line in a simple .txt or .csv file. The system automatically filters out invalid or duplicate links.",
        },
      },
      {
        "@type": "Question",
        name: "What language are subtitles in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YTVidHub supports ALL languages available on YouTube. This includes manually uploaded captions by the creator (highest quality) and auto-generated subtitles for languages like Chinese (Mandarin), Spanish, German, and more.",
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
