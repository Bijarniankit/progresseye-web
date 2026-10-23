import { AlertCircle, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  activePath: "/privacy" | "/terms" | "/cookies" | "/gdpr";
  children: ReactNode;
}

const legalNavLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie & Storage Disclosure" },
  { href: "/gdpr", label: "GDPR & DPDP Overview" },
] as const;

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  activePath,
  children,
}: LegalLayoutProps) {
  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl pb-8 md:pb-12 border-b border-border">
          <div className="inline-flex items-center gap-2 rounded-full border border-badge-warning-border bg-badge-warning-bg px-3.5 py-1 text-xs font-semibold text-badge-warning-text mb-4">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>DRAFT-NEEDS-LEGAL-REVIEW</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">{subtitle}</p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-text-muted">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div
          role="note"
          aria-label="Legal draft status notice"
          className="mt-8 rounded-2xl border border-badge-warning-border bg-badge-warning-bg/40 p-4 sm:p-5 text-sm text-text-muted leading-relaxed"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className="h-5 w-5 text-badge-warning-text shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="font-semibold text-text">Pre-Launch Editorial Draft</p>
              <p>
                This document describes current technical facts and planned product data handling
                for ProgressEye. It is explicitly marked as{" "}
                <strong className="text-text">DRAFT-NEEDS-LEGAL-REVIEW</strong> and does not
                constitute final executed legal terms. Real corporate registration details,
                registered addresses, and statutory officer designations are pending commercial
                sign-off.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <nav
              aria-label="Legal documents navigation"
              className="rounded-2xl border border-border bg-surface-card p-4 space-y-1"
            >
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Legal Documents</span>
              </div>
              <ul className="space-y-1">
                {legalNavLinks.map((link) => {
                  const isActive = activePath === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand text-brand-foreground font-semibold"
                            : "text-text-muted hover:bg-surface-subtle hover:text-text"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Legal Article Body */}
          <article className="lg:col-span-9 prose prose-slate dark:prose-invert max-w-none space-y-8 text-text leading-relaxed">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
