export function validateProductionTurnstileConfig(env: {
  appEnv?: string;
  hasLeadBackend?: string | boolean;
  siteKey?: string;
}): void {
  const isProd = env.appEnv === "production";
  const flagOn = env.hasLeadBackend === true || env.hasLeadBackend === "true";
  const siteKey = (env.siteKey || "").trim();

  if (isProd && flagOn) {
    if (!siteKey) {
      throw new Error(
        "Production build failure: NEXT_PUBLIC_TURNSTILE_SITE_KEY is required when NEXT_PUBLIC_HAS_LEAD_BACKEND is true and NEXT_PUBLIC_APP_ENV is production.",
      );
    }
    const testKeyPrefixes = ["1x", "2x", "3x"];
    if (testKeyPrefixes.some((prefix) => siteKey.startsWith(prefix))) {
      throw new Error(
        `Production build failure: NEXT_PUBLIC_TURNSTILE_SITE_KEY cannot be a Cloudflare test key ("${siteKey}") when NEXT_PUBLIC_APP_ENV is production and NEXT_PUBLIC_HAS_LEAD_BACKEND is true. Configure a production site key from Cloudflare Turnstile dashboard.`,
      );
    }
  }
}
