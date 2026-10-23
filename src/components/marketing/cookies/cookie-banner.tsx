import Link from "next/link";
import { siteConfig } from "@/config/site";

export function CookieBanner() {
  // Gated off by default (Decision D-035): ProgressEye deploys zero non-essential cookies
  // or third-party telemetry. Renders null (0 B DOM) in production until tracking exists.
  if (!siteConfig.hasConsentBanner) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent banner"
      data-testid="cookie-banner"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto rounded-2xl border border-border bg-surface-card p-4 sm:p-5 shadow-lg"
    >
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          We use strictly functional browser storage for user preferences. Read our{" "}
          <Link
            href="/cookies"
            className="font-semibold text-brand underline hover:text-brand-hover"
          >
            Cookie Disclosure
          </Link>{" "}
          for details.
        </p>
      </div>
    </aside>
  );
}
