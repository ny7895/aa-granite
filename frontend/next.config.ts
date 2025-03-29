import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Ensures proper build for Amplify
  basePath: "/src/app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
