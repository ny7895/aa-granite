import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Ensures proper build for Amplify, keeps dependencies bundled
  images: {
    unoptimized: true, // Disables Next.js image optimization (fixes Amplify image issues)
  },
  reactStrictMode: true, // Ensures React Strict Mode is enabled for development
  // Optional: Redirect all paths to /index.html (for SPA handling)
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin',  // Redirect to the /admin page in your app
        permanent: false,       // Set to false to prevent caching the redirect
      },
      {
        source: '/login/:path*',
        destination: '/login',  // Redirect to the /login page in your app
        permanent: false,
      },
      {
        source: '/inquiry/:path*',
        destination: '/inquiry',  // Redirect to the /inquiry page in your app
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
