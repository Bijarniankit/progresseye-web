import path from "node:path";
import type { NextConfig } from "next";
import { validateProductionTurnstileConfig } from "./src/config/turnstile-env";

validateProductionTurnstileConfig({
  appEnv: process.env.NEXT_PUBLIC_APP_ENV,
  hasLeadBackend: process.env.NEXT_PUBLIC_HAS_LEAD_BACKEND,
  siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});

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

const nextConfig = async (): Promise<NextConfig> => {
  if (process.platform === "win32") {
    return {
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
  }

  // Official plugin on Linux / CI / Docker
  const { default: createNextIntlPlugin } = await import("next-intl/plugin");
  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
  return withNextIntl(baseConfig);
};

export default nextConfig;
