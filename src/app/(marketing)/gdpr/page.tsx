import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";

export const metadata: Metadata = {
  title: "GDPR & DPDP Overview (Planned)",
  description:
    "ProgressEye intended data protection architecture and planned privacy practices under the DPDP Act and GDPR standards.",
};

export default function GdprPage() {
  return (
    <LegalLayout
      title="GDPR & DPDP Overview (Planned)"
      subtitle="What we intend and what is planned for student data protection under India's DPDP Act and international privacy principles."
      effectiveDate="TODO-REAL-DATA"
      activePath="/gdpr"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-text">
          1. Regulatory Intent &amp; Scope
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          ProgressEye is being engineered with student, guardian, and educator privacy as a core
          priority. Our intention is to design data protection workflows primarily around
          India&apos;s{" "}
          <strong className="text-text">
            Digital Personal Data Protection Act, 2023 (DPDP Act)
          </strong>
          , while planning for foundational privacy principles embodied in the{" "}
          <strong className="text-text">EU General Data Protection Regulation (GDPR)</strong> for
          campuses serving international student communities.
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          This document outlines architecture intentions and planned designs. It does not constitute
          a binding legal agreement (<code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Intended Roles: Institutional Governance (Planned Design)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">The School: Planned Data Fiduciary</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              In our planned product model, the educational institution determines the purpose and
              lawful basis for collecting student, staff, and guardian records (
              <code className="text-xs">TODO-REAL-DATA</code>). The school maintains direct
              ownership of student data and defines access permissions for staff.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">ProgressEye: Planned Service Provider</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              ProgressEye intends to operate educational software solely on behalf of and under the
              documented instructions of the school (<code className="text-xs">TODO-REAL-DATA</code>
              ).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Planned Technical Architecture Concepts
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted">
          <li>
            <strong className="text-text">Planned Multi-Tenant Separation (Planned Design):</strong>{" "}
            PostgreSQL Row-Level Security (RLS) is intended to separate distinct school entities (
            <code className="text-xs">TODO-REAL-DATA</code>).
          </li>
          <li>
            <strong className="text-text">Planned Consent for Minors (Planned Design):</strong>{" "}
            Aiming to support DPDP requirements for minors, processing personal data of minors is
            intended to require verifiable parental or guardian consent before communication
            workflows are activated (<code className="text-xs">TODO-REAL-DATA</code>).
          </li>
          <li>
            <strong className="text-text">Planned Data Minimization (Planned Design):</strong>{" "}
            Workflows are designed with the intention of collecting only data needed for attendance,
            grading, roll calls, and fee records (<code className="text-xs">TODO-REAL-DATA</code>).
          </li>
          <li>
            <strong className="text-text">Planned Administrative Logging (Planned Design):</strong>{" "}
            Activity logs are planned to record administrative access and record updates (
            <code className="text-xs">TODO-REAL-DATA</code>).
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          4. Planned Data Principal Rights
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          We are designing the platform to facilitate statutory data principal requests:
        </p>
        <section
          tabIndex={0}
          aria-label="Planned data principal rights table"
          className="overflow-x-auto rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <table className="min-w-full divide-y divide-border text-left text-xs sm:text-sm">
            <thead className="bg-surface-subtle text-text font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Right
                </th>
                <th scope="col" className="px-4 py-3">
                  Planned Implementation Mechanism
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-text-muted">
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Access</td>
                <td className="px-4 py-3">
                  Planned guardian portal self-service view and structured report export.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Correction</td>
                <td className="px-4 py-3">
                  Planned administrative request workflow through the school office.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Erasure</td>
                <td className="px-4 py-3">
                  Planned deletion workflows honoring applicable academic record requirements (
                  <code className="text-xs">TODO-REAL-DATA</code>).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Grievance Redressal</td>
                <td className="px-4 py-3">
                  Planned contact pathways with designated school grievance officers and platform
                  contacts.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          5. Planned Data Location (Planned Design)
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          For educational institutions in India, database instances and backups are planned to
          reside within data centers in India (<code className="text-xs">TODO-REAL-DATA</code>).
          International institutional requirements will be evaluated before commercial deployment (
          <code className="text-xs">TODO-REAL-DATA</code>).
        </p>
      </section>
    </LegalLayout>
  );
}
