import path from "node:path";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/get-started",
        permanent: true, // HTTP 308 permanent redirect per Phase 4 spec
      },
    ];
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

let config: NextConfig;

// On Linux / CI / Docker environments, use the official createNextIntlPlugin.
// On Windows (win32), @swc/core 1.16+ throws ERR_SWC_NATIVE_CACHE due to default NTFS drive root DACLs granting replacement rights (0x1301bf) to SID S-1-5-11.
// We configure the equivalent Turbopack and Webpack aliases on win32 to avoid this native binding crash while keeping official plugin on Linux/CI.
if (process.platform === "win32") {
  config = {
    ...baseConfig,
    turbopack: {
      resolveAlias: {
        "next-intl/config": "./src/i18n/request.ts",
      },
    },
    webpack: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        "next-intl/config": path.resolve("./src/i18n/request.ts"),
      };
      return webpackConfig;
    },
  };
} else {
  // Official plugin on Linux / CI / Docker
  // Dynamic require ensures Windows never loads @swc/core via next-intl/plugin during build/eval
  const createNextIntlPlugin = require("next-intl/plugin");
  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
  config = withNextIntl(baseConfig);
}

export default config;
