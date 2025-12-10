import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Vercel deployment with full Next.js features
  // including API routes for the chatbot

  images: {
    // Vercel supports Next.js Image Optimization
    remotePatterns: [],
  },

  // For Cloudflare static deployment, uncomment:
  // output: 'export',
  // images: { unoptimized: true },
  // trailingSlash: true,
};

export default nextConfig;
