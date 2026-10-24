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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "font-src 'self' https://fonts.gstatic.com data:",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "img-src 'self' data: https:",
              "object-src 'none'",
              "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
              "frame-src https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "connect-src 'self' https://challenges.cloudflare.com",
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=86400",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
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
