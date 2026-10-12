import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-[var(--color-surface)] text-[var(--color-text)] p-6 md:p-12 font-sans selection:bg-[var(--color-brand)] selection:text-[var(--color-text-inverse)]">
      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header / Brand */}
        <header className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-brand)] flex items-center justify-center shadow-[var(--shadow-e2)]">
              <span className="font-display font-extrabold text-[var(--color-text-inverse)] text-xl">
                P
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-success)] ring-2 ring-[var(--color-surface)] absolute -bottom-1 -right-1" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-[var(--color-text)]">
                ProgressEye
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-brand)]">
                2.0 Foundation
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dev/tokens"
              className="text-xs font-medium px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text)] transition-colors"
            >
              Tokens Showcase →
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-status-success)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                Phase 3 Active
              </span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-brand)]">
            Phase 3 Design Tokens & Web Foundation
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text)] leading-none">
            The school workspace <br />
            <span className="italic font-medium text-[var(--color-brand)]">that runs itself.</span>
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            An advanced, end-to-end multi-tenant school operating system. Built with Next.js 16,
            React 19, Tailwind CSS 4, NestJS 11, PostgreSQL with Row-Level Security, and Biome.
          </p>
        </section>

        {/* Repositories Architecture Status */}
        <section className="grid sm:grid-cols-2 gap-6">
          {/* Web Repo Card */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-e2)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-[var(--color-text)]">
                progresseye-web
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-mint-wash)] text-[var(--color-status-success)]">
                Phase 3 In Progress
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Frontend marketing shell and authenticated application workspace.
            </p>
            <div className="space-y-1.5 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3">
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className="font-medium text-[var(--color-text)]">
                  Next.js 16, React 19, Tailwind 4
                </span>
              </div>
              <div className="flex justify-between">
                <span>Design Tokens:</span>
                <span className="font-medium text-[var(--color-text)]">
                  Two-Layer CSS Variables
                </span>
              </div>
              <div className="flex justify-between">
                <span>Typography:</span>
                <span className="font-medium text-[var(--color-text)]">
                  Poppins & Inter Variable
                </span>
              </div>
              <div className="flex justify-between">
                <span>Contract Sync:</span>
                <span className="font-medium text-[var(--color-text)]">
                  Pinned OpenAPI 3.1 & Orval
                </span>
              </div>
            </div>
          </div>

          {/* API Repo Card */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-e2)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-[var(--color-text)]">
                progresseye-api
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-brand)]">
                Phase 2 Approved
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Backend Fastify API with PostgreSQL RLS tenant isolation and BullMQ worker.
            </p>
            <div className="space-y-1.5 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3">
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className="font-medium text-[var(--color-text)]">
                  NestJS 11, Fastify, Prisma
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tenant Isolation:</span>
                <span className="font-medium text-[var(--color-text)]">
                  Row-Level Security (RLS)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Health Endpoints:</span>
                <span className="font-medium text-[var(--color-text)]">
                  /health/live, /ready, /version
                </span>
              </div>
              <div className="flex justify-between">
                <span>OpenAPI Version:</span>
                <span className="font-medium text-[var(--color-text)]">3.1.0 Contract Pinned</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-6">
          ProgressEye 2.0 · Two-Layer Semantic Design System · Tagged <code>phase-02-approved</code>
        </footer>
      </div>
    </main>
  );
}
