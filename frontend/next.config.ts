import path from "node:path";
import { MdOutput } from "react-icons/md";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}

export default nextConfig;