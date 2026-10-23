import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description:
    "ProgressEye privacy notice describing current public website data handling and planned school data protection architecture.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Factual transparency regarding public website operations and planned student data governance."
      effectiveDate="TODO-REAL-DATA"
      activePath="/privacy"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-text">1. Scope &amp; Legal Status</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          ProgressEye Technologies Pvt. Ltd. (Corporate name placeholder:{" "}
          <code className="text-xs">TODO-REAL-DATA</code>) is currently developing a modern school
          operations management platform. This Privacy Policy outlines the privacy practices of our
          public marketing website today, as well as the planned security architecture governing
          upcoming school operational modules.
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          This document is marked as <strong className="text-text">DRAFT-NEEDS-LEGAL-REVIEW</strong>{" "}
          and will be finalized and executed by legal counsel prior to commercial school onboarding.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Public Website Operations (Current Facts)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          On our public marketing website (<code className="text-xs">/</code>,{" "}
          <code className="text-xs">/features</code>, <code className="text-xs">/about</code>,
          etc.), we operate under a strict zero-telemetry policy:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted">
          <li>
            <strong className="text-text">Zero Third-Party Telemetry:</strong> We do not embed
            Google Analytics, Meta Pixel, advertising trackers, or external behavioral tracking
            scripts.
          </li>
          <li>
            <strong className="text-text">Self-Hosted Assets:</strong> All fonts, icons, scripts,
            and stylesheets are delivered directly from our origin server.
          </li>
          <li>
            <strong className="text-text">Inquiry Forms Disconnected:</strong> Contact and demo
            request forms on this website currently function as client-side interactive previews.
            Submitting these forms does not transmit data over the network or persist records in a
            database.
          </li>
          <li>
            <strong className="text-text">Browser Storage:</strong> Only a single functional
            preference (<code className="text-xs">localStorage.theme</code>) is stored to preserve
            light/dark mode preferences.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Planned Product Architecture (School Data Protection)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          For educational institutions adopting ProgressEye in upcoming phases, data protection is
          grounded in India&apos;s Digital Personal Data Protection Act (DPDP Act 2023) and
          multi-tenant isolation:
        </p>
        <div className="space-y-3 rounded-xl border border-border bg-surface-card p-4 text-sm text-text-muted">
          <h3 className="font-semibold text-text">Architectural Guarantees (Planned Design):</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-text">PostgreSQL Row-Level Security (RLS):</strong> Every
              tenant school&apos;s records (students, guardians, staff, grades, fees) are isolated
              at the database engine level via tenant identification keys, preventing cross-tenant
              data exposure.
            </li>
            <li>
              <strong className="text-text">Child &amp; Student Data Safeguards:</strong> Under DPDP
              guidelines, student records are categorized as sensitive educational data. Guardian
              consent, access logging, and restricted role-based access controls (RBAC) are designed
              into core workflows.
            </li>
            <li>
              <strong className="text-text">Data Residency:</strong> All school database instances,
              backups, and operational logs are planned to be hosted exclusively within secure data
              center regions in India.
            </li>
            <li>
              <strong className="text-text">Defined Retention Limits:</strong> Roster and financial
              records will adhere to statutory retention schedules defined with partner schools,
              with automated purge mechanisms for graduated cohorts.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          4. Planned Sub-Processors &amp; Infrastructure
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Production infrastructure will leverage SOC 2 / ISO 27001 certified cloud providers. A
          complete list of third-party sub-processors (such as transactional SMS/WhatsApp gateways
          and UPI payment aggregators) will be published alongside Data Processing Agreements (DPAs)
          before commercial launch.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          5. Grievance Officer &amp; Inquiries
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          In compliance with DPDP requirements, a designated Data Protection / Grievance Officer
          will be appointed prior to commercial operations:
        </p>
        <div className="rounded-xl border border-border bg-surface-subtle p-4 text-xs sm:text-sm font-mono text-text space-y-1">
          <p>
            <strong>Designation:</strong> Data Protection Officer (
            <code className="text-xs">TODO-REAL-DATA</code>)
          </p>
          <p>
            <strong>Email:</strong> privacy@progresseye.com (
            <code className="text-xs">TODO-REAL-DATA</code>)
          </p>
          <p>
            <strong>Address:</strong> Registered Office, Bengaluru, Karnataka, India (
            <code className="text-xs">TODO-REAL-DATA</code>)
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
