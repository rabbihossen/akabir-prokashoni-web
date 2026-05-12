/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'web-production-bd153.up.railway.app',
        pathname: '/**',
      },
    ],
    // Disable private IP blocking for local dev
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
