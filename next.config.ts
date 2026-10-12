import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
