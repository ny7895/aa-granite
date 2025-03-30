
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}

export default nextConfig;