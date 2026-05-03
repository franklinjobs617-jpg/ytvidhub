import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["next-intl"],
  },
  serverExternalPackages: [],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  trailingSlash: true,

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "media.theresanaiforthat.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.openhunts.com" },
    ],
  },

  compress: true,

  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
   
      {
        source: "/index.html/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*.html",
        destination: "/:path*/",
        permanent: true,
      },
      {
        source: "/:path*.html/",
        destination: "/:path*/",
        permanent: true,
      },
      // Legacy SEO URLs from old structure
      {
        source: "/ai-summarizer",
        destination: "/blog/ai-youtube-video-summarizer/",
        permanent: true,
      },
      {
        source: "/ai-summarizer/",
        destination: "/blog/ai-youtube-video-summarizer/",
        permanent: true,
      },
      {
        source: "/guide/bulk-youtube-subtitle-downloader",
        destination: "/bulk-youtube-subtitle-downloader/",
        permanent: true,
      },
      {
        source: "/guide/bulk-youtube-subtitle-downloader/",
        destination: "/bulk-youtube-subtitle-downloader/",
        permanent: true,
      },
      {
        source: "/guide/faq",
        destination: "/faq/",
        permanent: true,
      },
      {
        source: "/guide/faq/",
        destination: "/faq/",
        permanent: true,
      },
      {
        source: "/faq.html",
        destination: "/faq/",
        permanent: true,
      },
      {
        source: "/faq.html/",
        destination: "/faq/",
        permanent: true,
      },
      {
        source: "/faq.html/:path*.html",
        destination: "/:path*/",
        permanent: true,
      },
      {
        source: "/faq.html/:path*.html/",
        destination: "/:path*/",
        permanent: true,
      },
      {
        source: "/faq.html/:path*",
        destination: "/:path*/",
        permanent: true,
      },
      {
        source: "/faq.html/:path*/",
        destination: "/:path*/",
        permanent: true,
      },

      // Redirect HTML extensions to clean URLs
    
      // NOTE: Do not globally redirect *.html, it breaks verification files in /public.
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-download-youtube-subtitles-complete-guide/",
        destination: "/guide/how-to-download-youtube-subtitles-complete-guide/",
        permanent: true,
      },
      {
        source: "/:locale/how-to-download-youtube-subtitles-complete-guide/",
        destination:
          "/:locale/guide/how-to-download-youtube-subtitles-complete-guide/",
        permanent: true,
      },

      // Removed pages — redirect to homepage
      {
        source: "/youtube-transcript-for-chatgpt",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/youtube-transcript-for-chatgpt/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/youtube-transcript-for-chatgpt",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/youtube-transcript-for-chatgpt/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/tools/subtitle-extractor-online",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/tools/subtitle-extractor-online/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/tools/subtitle-extractor-online",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/tools/subtitle-extractor-online/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/extract-youtube-subtitles-online-tool",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/extract-youtube-subtitles-online-tool/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/extract-youtube-subtitles-online-tool",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/extract-youtube-subtitles-online-tool/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/download-youtube-transcript-as-text",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/download-youtube-transcript-as-text/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/download-youtube-transcript-as-text",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/download-youtube-transcript-as-text/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/download-subs-from-youtube",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/download-subs-from-youtube/",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/download-subs-from-youtube",
        destination: "/",
        statusCode: 308,
      },
      {
        source: "/:locale/download-subs-from-youtube/",
        destination: "/",
        statusCode: 308,
      },
    ];
  },

  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };

      config.module.rules.push({
        test: /\.json$/,
        type: "json",
      });
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
