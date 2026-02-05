import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 启用实验性功能来优化国际化性能
  experimental: {
    optimizePackageImports: ['next-intl'],
    // 启用并发功能来提高性能
    serverComponentsExternalPackages: [],
  },
  
  // 启用编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 优化图片和静态资源
  images: {
    formats: ['image/webp', 'image/avif'], // 修改为字符串格式而非数组
  },

  // 启用 gzip 压缩
  compress: true,
  
  async redirects() {
    return [
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
    ];
  },
  
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, 
      };
      
      // 优化JSON导入
      config.module.rules.push({
        test: /\.json$/,
        type: 'json',
      });
    }
    return config;
  },
};

export default withNextIntl(nextConfig);