import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  description:
    "ProgressEye terms of service and acceptable usage guidelines for educational institutions.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Operational principles and terms governing public previews and upcoming institutional access."
      effectiveDate="TODO-REAL-DATA"
      activePath="/terms"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-text">
          1. Nature of This Public Preview
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Welcome to ProgressEye. The ProgressEye platform is currently in active pre-launch
          development by ProgressEye (legal entity to be provided) (Corporate name placeholder:{" "}
          <code className="text-xs">TODO-REAL-DATA</code>).
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          All public web pages, interactive demos, and feature walkthroughs are made available
          strictly as <strong className="text-text">educational previews and prototypes</strong>. No
          commercial contracts are executed through this website today, and preview access does not
          establish a paid service relationship.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Commercial Use Terms (Planned)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Terms for commercial use will be published before launch (
          <code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Intellectual Property &amp; Acceptable Use
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          All interface designs, branding, documentation, interactive tour components, and vector
          illustrations are the intellectual property of ProgressEye (legal entity to be provided).
        </p>
        <div className="space-y-2 rounded-xl border border-border bg-surface-card p-4 text-sm text-text-muted">
          <h3 className="font-semibold text-text">Users agree not to:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Reverse engineer, decompile, or extract proprietary application bundles or schemas.
            </li>
            <li>
              Conduct automated vulnerability scanning or penetration testing without explicit
              written authorization.
            </li>
            <li>
              Use automated scrapers, crawlers, or bots to harvest content or stress public server
              infrastructure.
            </li>
            <li>Misrepresent affiliation with ProgressEye or partner institutions.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          4. Disclaimers &amp; Limitation of Liability
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          The public marketing website and preview tools are provided &quot;as is&quot; without
          warranties of any kind, either express or implied. ProgressEye does not warrant that
          preview pages will be uninterrupted or error-free.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          5. Governing Law &amp; Jurisdiction
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          These preview terms shall be governed by and construed in accordance with the laws of
          India. Any disputes arising out of or relating to these terms shall be subject to the
          exclusive jurisdiction to be provided (<code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>
    </LegalLayout>
  );
}
