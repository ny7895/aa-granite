import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Ensures proper build for Amplify
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

};

export default nextConfig;
