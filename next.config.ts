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
      // Consolidate bulk page authority to homepage
      {
        source: "/:locale/bulk-youtube-subtitle-downloader/",
        destination: "/:locale/",
        permanent: true,
      },
      {
        source: "/bulk-youtube-subtitle-downloader/",
        destination: "/",
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