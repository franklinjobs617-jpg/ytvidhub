import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['next-intl'],
  },
  serverExternalPackages: [],

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  trailingSlash: true,

  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'media.theresanaiforthat.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },

  compress: true,

  async redirects() {
    return [
      // Redirect HTML extensions to clean URLs
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
        destination: "/:locale/guide/how-to-download-youtube-subtitles-complete-guide/",
        permanent: true,
      },
      // Redirect non-English versions of English-only pages to English
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/youtube-subtitle-extractor/:path*",
        destination: "/youtube-subtitle-extractor/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/bulk-youtube-subtitle-downloader/:path*",
        destination: "/bulk-youtube-subtitle-downloader/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/playlist-subtitles-bulk/:path*",
        destination: "/guide/playlist-subtitles-bulk/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/tools/playlist-subtitles-bulk/:path*",
        destination: "/tools/playlist-subtitles-bulk/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/how-to-download-youtube-studio-subtitles/:path*",
        destination: "/guide/how-to-download-youtube-studio-subtitles/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/data-prep-guide/:path*",
        destination: "/data-prep-guide/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/clean-transcript-no-timestamp/:path*",
        destination: "/guide/clean-transcript-no-timestamp/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/data-prep-toolkit/:path*",
        destination: "/guide/data-prep-toolkit/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/mastering-vtt-data-analysis/:path*",
        destination: "/guide/mastering-vtt-data-analysis/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/youtube-subtitles-api-free/:path*",
        destination: "/guide/youtube-subtitles-api-free/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/guide/youtube-subtitles-for-llm-data/:path*",
        destination: "/guide/youtube-subtitles-for-llm-data/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/blog/creator-tutorials/:path*",
        destination: "/blog/creator-tutorials/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/blog/subtitle-accuracy-problem/:path*",
        destination: "/blog/subtitle-accuracy-problem/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/blog/engineering-decisions-ytvidhub/:path*",
        destination: "/blog/engineering-decisions-ytvidhub/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/blog/spanish-yt-channels-subtitles/:path*",
        destination: "/blog/spanish-yt-channels-subtitles/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/blog/ai-youtube-video-summarizer/:path*",
        destination: "/blog/ai-youtube-video-summarizer/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/add-on/:path*",
        destination: "/add-on/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/faq/subtitle-settings-guide/:path*",
        destination: "/faq/subtitle-settings-guide/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/privacy-policy/:path*",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/:locale(es|de|ko|ja|ru|tr|zh)/terms-of-service/:path*",
        destination: "/terms-of-service/",
        permanent: true,
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
        type: 'json',
      });
    }
    return config;
  },
};

export default withNextIntl(nextConfig);