import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.arvanstorage.ir",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
};

export default nextConfig;
