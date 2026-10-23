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
          development by ProgressEye Technologies Pvt. Ltd. (Corporate name placeholder:{" "}
          <code className="text-xs">TODO-REAL-DATA</code>).
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          All public web pages, interactive demos, calculators, and feature walkthroughs are made
          available strictly as{" "}
          <strong className="text-text">educational previews and prototypes</strong>. No commercial
          contracts are executed through this website today, and preview access does not establish a
          paid service relationship.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Institutional Service Agreements (Planned)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Prior to onboarding student rosters or school financial operations, schools will enter
          into formal, binding institutional contracts comprising:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted">
          <li>
            <strong className="text-text">Master Services Agreement (MSA):</strong> Defining billing
            schedules, per-student licensing, and subscription terms.
          </li>
          <li>
            <strong className="text-text">Service Level Agreement (SLA):</strong> Documenting
            availability targets, scheduled maintenance windows, and support escalation tiers
            (uptime claims such as 99.9% SLA remain placeholders pending final infrastructure
            audit).
          </li>
          <li>
            <strong className="text-text">Data Processing Addendum (DPA):</strong> Specifying
            statutory obligations under the Digital Personal Data Protection Act 2023.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Intellectual Property &amp; Acceptable Use
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          All interface designs, branding, documentation, interactive tour components, and vector
          illustrations are the intellectual property of ProgressEye Technologies Pvt. Ltd.
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
          exclusive jurisdiction of the courts of Bengaluru, Karnataka, India (
          <code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>
    </LegalLayout>
  );
}
