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
      // Redirect /index to root path
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: "www.:path{/}?",
        destination: "/:path*",
        permanent: true,
      },
      // Redirect HTTP to HTTPS (handled by hosting, but good to have as fallback)
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