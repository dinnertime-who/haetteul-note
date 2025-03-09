import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import { NextConfig } from "next";

setupDevPlatform().catch(console.error);

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
