import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-[#FAF6EC] text-[#0F172A] p-6 md:p-12 font-sans selection:bg-blue-600 selection:text-white">
      {/* Container */}
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header / Brand */}
        <header className="flex items-center justify-between border-b border-stone-200/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center shadow-e2">
              <span className="font-display font-extrabold text-white text-xl">P</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-[#FAF6EC] absolute -bottom-1 -right-1" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-[#1E1B4B]">
                ProgressEye
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                2.0 Setup
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-stone-600">
              Phase 1 Verified · Biome Active
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
            Phase 1 Foundation · Public Site & API Setup
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E1B4B] leading-none">
            The school workspace <br />
            <span className="italic font-medium text-[#3730A3]">that runs itself.</span>
          </h1>
          <p className="text-lg text-stone-700 max-w-2xl leading-relaxed">
            An advanced, end-to-end multi-tenant school operating system for Indian schools. Built
            with Next.js 16, React 19, Tailwind CSS 4, NestJS 11, PostgreSQL with Row-Level
            Security, and Biome.
          </p>
        </section>

        {/* Repositories Architecture Status */}
        <section className="grid sm:grid-cols-2 gap-6">
          {/* Web Repo Card */}
          <div className="rounded-2xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-e2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-[#1E1B4B]">progresseye-web</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Phase 1 Approved
              </span>
            </div>
            <p className="text-sm text-stone-600">
              Frontend marketing shell and authenticated application workspace.
            </p>
            <div className="space-y-1.5 text-xs text-stone-500 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className="font-medium text-stone-800">Next.js 16, React 19, Tailwind 4</span>
              </div>
              <div className="flex justify-between">
                <span>Linter & Formatter:</span>
                <span className="font-medium text-stone-800">Biome (1.9.4)</span>
              </div>
              <div className="flex justify-between">
                <span>Design System:</span>
                <span className="font-medium text-stone-800">9 pe-* skills installed</span>
              </div>
              <div className="flex justify-between">
                <span>Contract Sync:</span>
                <span className="font-medium text-stone-800">Orval configured</span>
              </div>
            </div>
          </div>

          {/* API Repo Card */}
          <div className="rounded-2xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-e2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg text-[#1E1B4B]">progresseye-api</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                Ready for Phase 2
              </span>
            </div>
            <p className="text-sm text-stone-600">
              Backend Fastify API with PostgreSQL RLS tenant isolation and BullMQ worker.
            </p>
            <div className="space-y-1.5 text-xs text-stone-500 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Stack:</span>
                <span className="font-medium text-stone-800">NestJS 11, Fastify, Prisma</span>
              </div>
              <div className="flex justify-between">
                <span>Tenant Isolation:</span>
                <span className="font-medium text-stone-800">Row-Level Security (RLS)</span>
              </div>
              <div className="flex justify-between">
                <span>Domain Modules:</span>
                <span className="font-medium text-stone-800">16 modules scaffolded</span>
              </div>
              <div className="flex justify-between">
                <span>Contract Source:</span>
                <span className="font-medium text-stone-800">Zod DTOs to OpenAPI 3.1</span>
              </div>
            </div>
          </div>
        </section>

        {/* Design Tokens Verification Strip */}
        <section className="rounded-2xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-6 shadow-e2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-[#1E1B4B]">
              Design System Palette Verification
            </h2>
            <span className="text-xs text-stone-500 font-mono">tokens.css</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#1E1B4B] shadow-e1" />
              <div className="text-xs font-semibold">Indigo 950</div>
              <div className="text-[10px] text-stone-500 font-mono">#1E1B4B</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#3730A3] shadow-e1" />
              <div className="text-xs font-semibold">Indigo 700</div>
              <div className="text-[10px] text-stone-500 font-mono">#3730A3</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#2563EB] shadow-e1" />
              <div className="text-xs font-semibold">Blue 600</div>
              <div className="text-[10px] text-stone-500 font-mono">#2563EB</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#F59E0B] shadow-e1" />
              <div className="text-xs font-semibold">Amber Accent</div>
              <div className="text-[10px] text-stone-500 font-mono">#F59E0B</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#C2410C] shadow-e1" />
              <div className="text-xs font-semibold">Terracotta</div>
              <div className="text-[10px] text-stone-500 font-mono">#C2410C</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-14 rounded-xl bg-[#FAF6EC] border border-stone-300 shadow-e1" />
              <div className="text-xs font-semibold">Cream Hero</div>
              <div className="text-[10px] text-stone-500 font-mono">#FAF6EC</div>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="text-center text-xs text-stone-500 border-t border-stone-200/80 pt-6">
          ProgressEye 2.0 · Both repos clean on main branch · Tagged <code>phase-01-approved</code>
        </footer>
      </div>
    </main>
  );
}
