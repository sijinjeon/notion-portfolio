import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Vercel (Notion 데이터 동기화 후 활성화)
  // output: 'export',
  
  // Image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        pathname: '/secure.notion-static.com/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
  
  // Strict mode
  reactStrictMode: true,
  
  // TypeScript strict
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Cache Control
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

