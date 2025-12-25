import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import Script from "next/script";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    // 1. 添加 suppressHydrationWarning 解决因插件或脚本引起的微小不一致报错
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* 3. 处理 AdSense 脚本：移至 head 并调整加载策略 */}
        {/* 如果依然有 data-nscript 警告，可以尝试改用原生的 <script> */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive" 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383070348689557"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${fontBody.variable} ${fontDisplay.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        <AuthProvider>
          <NextTopLoader
            color="#7c3aed"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #7c3aed,0 0 5px #7c3aed"
          />
          {/* 4. 确保 main 只是一个包裹，不要在 layout 和 page 之间产生多余的 div 嵌套 */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}