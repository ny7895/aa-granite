import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Ensures proper build for Amplify
  images: { unoptimized: true }, // Fixes Amplify image issues
  reactStrictMode: true,
};

export default nextConfig;
