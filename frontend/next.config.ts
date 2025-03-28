import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone', // Ensures proper build for Amplify
  experimental: { appDir: true }, // Enables App Router support
  images: { unoptimized: true }, // Fixes Amplify image issues
};

export default nextConfig;
