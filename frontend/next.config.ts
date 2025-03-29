import path from "node:path";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}

export default nextConfig;