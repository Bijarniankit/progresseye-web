import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal/legal-layout";

export const metadata: Metadata = {
  title: "Cookie & Storage Disclosure",
  description:
    "Comprehensive disclosure of client-side browser storage and cookies utilized by ProgressEye.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie & Storage Disclosure"
      subtitle="Transparent accounting of all cookies, local storage, and session storage utilized by ProgressEye."
      effectiveDate="TODO-REAL-DATA"
      activePath="/cookies"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-display text-text">
          1. Summary of Storage Practices
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          ProgressEye prioritizes privacy by design and data minimization. We do not use advertising
          cookies, cross-site trackers, behavioral tracking pixels, or third-party telemetry
          scripts.
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          An empirical audit across all public routes confirms that ProgressEye sets{" "}
          <strong className="text-text">zero HTTP or client cookies</strong> and utilizes only
          functional browser storage strictly required to deliver user interface preferences.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          2. Complete Browser Storage Inventory
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          The following inventory details every item stored in client browser storage across the
          public website:
        </p>

        <section
          tabIndex={0}
          aria-label="Browser storage inventory table"
          className="overflow-x-auto rounded-xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          <table className="min-w-full divide-y divide-border text-left text-xs sm:text-sm">
            <thead className="bg-surface-subtle text-text font-semibold">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Storage Type
                </th>
                <th scope="col" className="px-4 py-3">
                  Key Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Purpose / Content
                </th>
                <th scope="col" className="px-4 py-3">
                  Duration
                </th>
                <th scope="col" className="px-4 py-3">
                  Classification
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-text-muted">
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-text">
                  localStorage
                </td>
                <td className="px-4 py-3 font-mono text-xs text-brand">theme</td>
                <td className="px-4 py-3">
                  Stores user visual theme preference (
                  <code className="text-xs">&quot;light&quot;</code> or{" "}
                  <code className="text-xs">&quot;dark&quot;</code>) to prevent screen flicker upon
                  return visits.
                </td>
                <td className="px-4 py-3">Persistent until cleared by user</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-badge-info-bg px-2.5 py-0.5 text-xs font-medium text-badge-info-text border border-badge-info-border">
                    likely strictly necessary; DRAFT-NEEDS-LEGAL-REVIEW
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-text">
                  HTTP / Document Cookies
                </td>
                <td className="px-4 py-3 font-mono text-xs italic text-text-muted">None</td>
                <td className="px-4 py-3">
                  ProgressEye sets zero cookies on the public marketing website.
                </td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-text">
                  sessionStorage
                </td>
                <td className="px-4 py-3 font-mono text-xs text-brand">pe_hero_played</td>
                <td className="px-4 py-3">
                  Records whether the hero visual completed its 9-transition animation limit or was
                  manually replayed in the current browser tab session, preventing repetitive
                  auto-rotation motion on return visits.
                </td>
                <td className="px-4 py-3">Browser tab session (cleared on tab close)</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-badge-info-bg px-2.5 py-0.5 text-xs font-medium text-badge-info-text border border-badge-info-border">
                    likely strictly necessary; DRAFT-NEEDS-LEGAL-REVIEW
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          3. Third-Party Requests & Telemetry
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Network verification across all public marketing pages confirms that ProgressEye initiates{" "}
          <strong className="text-text">zero third-party network requests</strong>. All fonts,
          stylesheets, images, and application bundles are served directly from our origin domain
          without reliance on external CDNs, trackers, or foreign web services.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">
          4. Consent Banners & Regulatory Classification
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          Under ePrivacy and DPDP guidelines, storage mechanisms that are strictly necessary to
          deliver a user-requested visual preference (such as dark mode display) are classified as{" "}
          <strong className="text-text">likely strictly necessary; DRAFT-NEEDS-LEGAL-REVIEW</strong>
          . Because ProgressEye deploys no marketing, analytics, or behavioral cookies, an intrusive
          consent banner is not currently displayed.
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          Should optional analytics or third-party integrations be evaluated in future product
          updates, explicit opt-in consent mechanisms will be implemented prior to activation.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-xl font-bold font-display text-text">5. Managing Browser Storage</h2>
        <p className="text-sm text-text-muted leading-relaxed">
          You can inspect or delete browser storage at any time through your browser settings:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-text-muted">
          <li>
            <strong>Chrome / Edge:</strong> Settings &gt; Privacy &gt; Site settings &gt; Cookies
            and site data.
          </li>
          <li>
            <strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site
            Data.
          </li>
          <li>
            <strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data.
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
