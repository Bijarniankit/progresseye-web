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
          This document outlines what we intend to build and what technical controls are planned. It
          does not constitute a formal certification or warranty of compliance prior to commercial
          launch.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Intended Roles: Fiduciary &amp; Processor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">The School: Planned Data Fiduciary</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              In our planned product model, the educational institution determines the purpose and
              lawful basis for collecting student, staff, and guardian records. The school maintains
              direct ownership of student data and defines access permissions for staff.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">ProgressEye: Planned Data Processor</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              ProgressEye intends to process educational records solely on behalf of and under the
              documented instructions of the school. We plan never to sell student data, use pupil
              records for advertising, or train public AI models on private institution records.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Planned Technical Safeguards
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted">
          <li>
            <strong className="text-text">Planned Multi-Tenant Isolation:</strong> PostgreSQL
            Row-Level Security (RLS) is planned to enforce cryptographic and logical separation
            between distinct school entities.
          </li>
          <li>
            <strong className="text-text">Planned Consent for Minors:</strong> In accordance with
            statutory DPDP goals, processing personal data of minors is intended to require
            verifiable parental or guardian consent before communication workflows are activated.
          </li>
          <li>
            <strong className="text-text">Planned Data Minimization:</strong> Workflows are designed
            to collect only data strictly necessary for attendance, grading, roll calls, and fee
            records.
          </li>
          <li>
            <strong className="text-text">Planned Audit Logging:</strong> Immutable audit logs are
            planned to track administrative access, grade modifications, and record exports.
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
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-left text-xs sm:text-sm">
            <thead className="bg-surface-subtle text-text font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Right
                </th>
                <th scope="col" className="px-4 py-3">
                  Statutory Focus
                </th>
                <th scope="col" className="px-4 py-3">
                  Planned Implementation Mechanism
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-text-muted">
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Access</td>
                <td className="px-4 py-3">DPDP §11 / GDPR Art. 15</td>
                <td className="px-4 py-3">
                  Planned guardian portal self-service view and structured report export.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Correction</td>
                <td className="px-4 py-3">DPDP §12 / GDPR Art. 16</td>
                <td className="px-4 py-3">
                  Planned administrative request workflow through the school office.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Erasure</td>
                <td className="px-4 py-3">DPDP §12 / GDPR Art. 17</td>
                <td className="px-4 py-3">
                  Planned coordinated deletion workflows honoring academic record retention laws.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Grievance Redressal</td>
                <td className="px-4 py-3">DPDP §13 / GDPR Art. 77</td>
                <td className="px-4 py-3">
                  Planned contact pathways with designated school grievance officers and platform
                  DPO.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          5. Planned Cross-Border Transfers
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          For educational institutions in India, all primary database instances and backups are
          planned to reside within data centers in India. For institutions operating under GDPR
          jurisdiction, standard contractual clauses (SCCs) and adequacy assessments will be
          evaluated prior to commercial tenancy.
        </p>
      </section>
    </LegalLayout>
  );
}
