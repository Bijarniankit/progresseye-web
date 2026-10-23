import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";

export const metadata: Metadata = {
  title: "GDPR & DPDP Compliance (Draft)",
  description:
    "ProgressEye data protection architecture aligning with India's DPDP Act and GDPR standards.",
};

export default function GdprPage() {
  return (
    <LegalLayout
      title="GDPR & DPDP Compliance"
      subtitle="Architectural alignment with India's Digital Personal Data Protection Act and international data privacy standards."
      lastUpdated="October 2026"
      activePath="/gdpr"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-text">
          1. Regulatory Context &amp; Purpose
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          ProgressEye is engineered from the ground up to respect student, guardian, and educator
          privacy. Our operational and architectural model is designed primarily around India&apos;s{" "}
          <strong className="text-text">
            Digital Personal Data Protection Act, 2023 (DPDP Act)
          </strong>
          , while incorporating international privacy principles embodied in the{" "}
          <strong className="text-text">EU General Data Protection Regulation (GDPR)</strong> for
          international campuses and cross-border student communities.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Fiduciary &amp; Processor Roles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">
              The School: Data Fiduciary / Controller
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              The educational institution determines the purpose and lawful basis for collecting
              student, staff, and guardian records. The school maintains direct ownership of student
              data and grants appropriate system permissions to educators and administrators.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-card p-5 space-y-2">
            <h3 className="text-base font-bold text-text">ProgressEye: Data Processor</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              ProgressEye processes educational records solely on behalf of and under the documented
              instructions of the school. We never sell student data, use pupil records for
              advertising, or train public AI models on private institution data.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Core Architectural Safeguards (Planned Design)
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-text-muted">
          <li>
            <strong className="text-text">Strict Multi-Tenant Isolation:</strong> PostgreSQL
            Row-Level Security (RLS) guarantees cryptographic and logical separation between
            distinct school entities.
          </li>
          <li>
            <strong className="text-text">Verifiable Consent for Minors:</strong> In accordance with
            DPDP mandates, processing personal data of minors requires verifiable parental or
            guardian consent before accounts or communication workflows are activated.
          </li>
          <li>
            <strong className="text-text">Data Minimization:</strong> Only data strictly necessary
            for classroom instruction, attendance verification, exam reporting, and fee
            reconciliation is collected.
          </li>
          <li>
            <strong className="text-text">Audit Logging &amp; Traceability:</strong> Immutable audit
            logs track all administrative access, grade modifications, and record exports.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">4. Data Principal Rights</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Parents, students of majority age, and educators enjoy statutory rights regarding their
          personal data:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-left text-xs sm:text-sm">
            <thead className="bg-surface-subtle text-text font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Right
                </th>
                <th scope="col" className="px-4 py-3">
                  Statutory Basis
                </th>
                <th scope="col" className="px-4 py-3">
                  Implementation Mechanism
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-text-muted">
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Access</td>
                <td className="px-4 py-3">DPDP §11 / GDPR Art. 15</td>
                <td className="px-4 py-3">
                  Guardian portal self-service view and structured report export.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Correction</td>
                <td className="px-4 py-3">DPDP §12 / GDPR Art. 16</td>
                <td className="px-4 py-3">
                  Administrative request workflow through school office.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Right of Erasure</td>
                <td className="px-4 py-3">DPDP §12 / GDPR Art. 17</td>
                <td className="px-4 py-3">
                  Coordinated deletion honoring mandatory academic record retention laws.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-text">Grievance Redressal</td>
                <td className="px-4 py-3">DPDP §13 / GDPR Art. 77</td>
                <td className="px-4 py-3">
                  Direct contact with designated school grievance officer and platform DPO.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">5. Cross-Border Data Transfers</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          For educational institutions in India, all primary databases and backups are designed to
          reside within India. For international schools operating under GDPR jurisdiction, standard
          contractual clauses (SCCs) and adequacy assessments will be executed prior to tenancy
          provisioning.
        </p>
      </section>
    </LegalLayout>
  );
}
