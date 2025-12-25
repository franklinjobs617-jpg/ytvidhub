import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontBody.variable} ${fontDisplay.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AuthProvider>
          <NextTopLoader
            color="#7c3aed" // 换成你的主色调，比如 violet-600
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false} // 关闭右上角的转圈圈，只留条，更高级
            easing="ease"
            speed={200}
            shadow="0 0 10px #7c3aed,0 0 5px #7c3aed" // 发光效果
          />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
