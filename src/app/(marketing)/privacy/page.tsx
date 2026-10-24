import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";
import { siteConfig } from "@/config/site";

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
          ProgressEye (legal entity to be provided) (Corporate name placeholder:{" "}
          <code className="text-xs">TODO-REAL-DATA</code>) is currently developing a modern school
          operations management platform. This Privacy Policy outlines the privacy practices of our
          public marketing website today, as well as the planned data architecture governing
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
          {siteConfig.hasLeadBackend ? (
            <li>
              <strong className="text-text">Inquiry &amp; Demonstration Intake:</strong> When you
              submit a contact, demonstration, or newsletter inquiry, we process the provided
              information (such as your name, institutional email address, school name, and message)
              solely to communicate with your institution regarding ProgressEye. Inquiries are
              protected by privacy-preserving anti-abuse tooling (Cloudflare Turnstile token
              validation without transmitting client IP addresses) and rate limiting.
            </li>
          ) : (
            <li>
              <strong className="text-text">Inquiry Forms Disconnected:</strong> Contact and demo
              request forms on this website currently function as client-side interactive previews.
              Submitting these forms does not transmit data over the network or persist records in a
              database.
            </li>
          )}
          <li>
            <strong className="text-text">Browser Storage:</strong> Functional preferences (
            <code className="text-xs">localStorage.theme</code> and{" "}
            <code className="text-xs">sessionStorage.pe_hero_played</code>) are utilized to maintain
            user interface state.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Planned Product Architecture (School Data Handling)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          For educational institutions evaluating ProgressEye for future deployment, data handling
          is intended to be designed around India&apos;s Digital Personal Data Protection Act (DPDP
          Act 2023) and multi-tenant separation:
        </p>
        <div className="space-y-3 rounded-xl border border-border bg-surface-card p-4 text-sm text-text-muted">
          <h3 className="font-semibold text-text">
            Planned Product Design (Architecture Concepts):
          </h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-text">PostgreSQL Row-Level Security (RLS):</strong> Every
              tenant school&apos;s records (students, guardians, staff, grades, fees) are planned to
              be separated at the database engine level via tenant identification keys (
              <code className="text-xs">TODO-REAL-DATA</code>).
            </li>
            <li>
              <strong className="text-text">Child &amp; Student Data Safeguards:</strong> Under DPDP
              guidelines, student records are categorized as sensitive educational data. Guardian
              consent and restricted role-based access controls are planned in core workflows (
              <code className="text-xs">TODO-REAL-DATA</code>).
            </li>
            <li>
              <strong className="text-text">Data Residency:</strong> School database instances and
              backups are planned to reside within data center regions in India (
              <code className="text-xs">TODO-REAL-DATA</code>).
            </li>
            <li>
              <strong className="text-text">Data Lifecycle (Planned Design):</strong> Policies
              regarding data lifecycle and disposal schedules will be established with institutional
              partners before production deployment (<code className="text-xs">TODO-REAL-DATA</code>
              ).
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          4. Infrastructure &amp; Third-Party Services (Planned Design)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          External cloud infrastructure providers and third-party service integrations will be
          evaluated and published before launch (<code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          5. Grievance Officer &amp; Inquiries
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          A designated Grievance Officer contact will be published prior to launch (
          <code className="text-xs">TODO-REAL-DATA</code>):
        </p>
        <div className="rounded-xl border border-border bg-surface-subtle p-4 text-xs sm:text-sm font-mono text-text space-y-1">
          <p>
            <strong>Designation:</strong> Grievance Officer (
            <code className="text-xs">TODO-REAL-DATA</code>)
          </p>
          <p>
            <strong>Email:</strong> To be provided (<code className="text-xs">TODO-REAL-DATA</code>)
          </p>
          <p>
            <strong>Address:</strong> To be provided (
            <code className="text-xs">TODO-REAL-DATA</code>)
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
