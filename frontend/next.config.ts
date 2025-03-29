import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Ensures proper build for Amplify
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
