import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl/config": path.resolve("./src/i18n/request.ts"),
    };
    return config;
  },
  async rewrites() {
    const apiInternalUrl =
      process.env.API_INTERNAL_URL || process.env.API_BASE_URL || "http://localhost:4000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiInternalUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
