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
  title: "Bulk YouTube Subtitle Downloader for LLM & Research Data Prep",
  description:
    "Stop 100 clicks for data preparation. YTVidHub offers unique bulk download for playlists/channels and converts to optimized, clean TXT for LLM training. 5 free daily credits.",
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

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        ></script>
        {/* SEO JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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