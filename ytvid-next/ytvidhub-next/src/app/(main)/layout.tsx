import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import FeedbackWidget from "@/components/FeedbackWidget";
import Totop from "@/components/ToTop";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// 3. 配置展示字体 (Anton - 类似 Lovart 的风格)
const fontDisplay = Anton({
  weight: "400", // Anton 只有 400 字重，因为它本身就很粗
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
          <Toaster
            richColors
            closeButton
            position="top-center"
            offset="90px"
            style={{ zIndex: 9999 }}
          />
          <FeedbackWidget />
          <Totop />
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
