import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Vercel deployment with full Next.js features
  // including API routes for the chatbot

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  reactStrictMode: true,

  // Compression
  compress: true,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // For Cloudflare static deployment, uncomment:
  // output: 'export',
  // images: { unoptimized: true },
  // trailingSlash: true,
};

export default nextConfig;
