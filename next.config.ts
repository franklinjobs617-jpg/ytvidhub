import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['next-intl'],
    serverComponentsExternalPackages: [],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  trailingSlash: true,

  images: {
    formats: ['image/webp', 'image/avif'],
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
        source: "/:path*.html",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      }
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