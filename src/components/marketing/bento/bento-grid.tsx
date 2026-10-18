import { BarChart3, Bell, CalendarCheck, Check, ShieldCheck, Wallet } from "lucide-react";
import type * as React from "react";
import { BentoSpotlight } from "./bento-spotlight";

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

function BentoCard({ title, description, className = "", children }: BentoCardProps) {
  return (
    <BentoSpotlight className={className}>
      {/* Top Header & Planned Tag */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-text)]">
            {title}
          </h3>
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)] uppercase tracking-wider">
            Planned
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive / Visual Content Graphic */}
      <div className="relative z-10 pt-6 mt-auto">{children}</div>
    </BentoSpotlight>
  );
}

const ROLES_LIST = [
  { id: "role-admin", role: "Admin", initial: "A", bg: "bg-indigo-600 text-white" },
  { id: "role-principal", role: "Principal", initial: "P", bg: "bg-blue-600 text-white" },
  { id: "role-teacher", role: "Teacher", initial: "T", bg: "bg-amber-500 text-white" },
  { id: "role-student", role: "Student", initial: "S", bg: "bg-emerald-600 text-white" },
  { id: "role-parent", role: "Parent", initial: "P", bg: "bg-purple-600 text-white" },
];

const ATTENDANCE_DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: `att-dot-${i + 1}`,
  isAbsent: i === 6 || i === 18,
}));

const EXAM_GRADES_LIST = [
  {
    id: "grade-aplus",
    grade: "A+",
    label: "12 Students",
    badge: "bg-blue-800 dark:bg-blue-700 text-white",
  },
  {
    id: "grade-a",
    grade: "A",
    label: "18 Students",
    badge: "bg-blue-700 dark:bg-blue-800 text-white",
  },
  {
    id: "grade-bplus",
    grade: "B+",
    label: "14 Students",
    badge: "bg-blue-600 dark:bg-blue-900 text-white dark:text-blue-200",
  },
  {
    id: "grade-c",
    grade: "C",
    label: "7 Students",
    badge:
      "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700/50",
  },
];

const SPARKLINE_DATA = [
  { id: "sp-1", val: 40 },
  { id: "sp-2", val: 55 },
  { id: "sp-3", val: 60 },
  { id: "sp-4", val: 48 },
  { id: "sp-5", val: 70 },
  { id: "sp-6", val: 65 },
  { id: "sp-7", val: 80 },
  { id: "sp-8", val: 85 },
  { id: "sp-9", val: 90 },
  { id: "sp-10", val: 88 },
  { id: "sp-11", val: 92 },
  { id: "sp-12", val: 94 },
];

export function BentoGrid() {
  return (
    <section
      id="bento"
      aria-label="Planned feature modules overview"
      className="content-visibility-auto scroll-mt-20 lg:scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-[var(--color-border-muted)] bg-[var(--color-surface-subtle)]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border)]">
            <span>Modular Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" aria-hidden="true" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
              Planned
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
            Everything your school needs. Built into a cohesive whole.
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            Preview of planned features, shown with sample data. Each module is designed to operate
            independently or synchronize across the entire administrative ecosystem.
          </p>
        </div>

        {/* 6-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Student & staff records (col-span-2 on lg) */}
          <BentoCard
            title="Student & staff records"
            description="Planned: unified student directory and staff profiles with role-based access."
            className="lg:col-span-2"
          >
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center -space-x-3">
                {ROLES_LIST.map((item) => (
                  <div
                    key={item.id}
                    className={`w-10 h-10 rounded-full border-2 border-[var(--color-surface)] ${item.bg} flex items-center justify-center font-bold text-xs shadow-xs`}
                    title={item.role}
                  >
                    {item.initial}
                  </div>
                ))}
              </div>
              <div className="text-xs font-semibold text-[var(--color-text-muted)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand)]" />
                <span>Role-based directory and roster management</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Quick daily attendance (col-span-1) */}
          <BentoCard
            title="Quick daily attendance"
            description="Planned: take attendance from phone or desktop and notify guardians of absences."
            className="lg:col-span-1"
          >
            <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text)]">
                <span className="flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-[var(--color-brand)]" /> Class 8-A
                </span>
                <span className="text-blue-800 dark:text-blue-300 font-semibold">
                  28/30 Present
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {ATTENDANCE_DOTS.map((dot) => (
                  <div
                    key={dot.id}
                    className={`h-2.5 rounded-[2px] ${
                      dot.isAbsent ? "bg-amber-400" : "bg-[var(--color-brand)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Fees that collect themselves (col-span-1) */}
          <BentoCard
            title="Fees that collect themselves"
            description="Planned: collect fees online (UPI first) with receipts and due reminders."
            className="lg:col-span-1"
          >
            <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[var(--color-text-muted)] flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-[var(--color-brand)]" /> Term 2
                </span>
                <span className="text-blue-800 dark:text-blue-300 font-bold">87%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
                <div className="w-[87%] h-full bg-[var(--color-brand)] rounded-full" />
              </div>
              <div className="text-xs font-bold text-[var(--color-text)]">
                ₹ 14,82,500{" "}
                <span className="text-[11px] font-normal text-[var(--color-text-muted)]">
                  / 17,00,000
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Exams and report cards (col-span-2 on lg) */}
          <BentoCard
            title="Exams & report cards"
            description="Planned: configurable grading scales, term weightings, and printable report cards."
            className="lg:col-span-2"
          >
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {EXAM_GRADES_LIST.map((item) => (
                  <div
                    key={item.id}
                    className="px-2.5 py-1 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs flex items-center gap-1.5"
                  >
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.badge}`}>
                      {item.grade}
                    </span>
                    <span className="text-[var(--color-text-muted)] text-[11px] font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                53/53 Evaluated
              </span>
            </div>
          </BentoCard>

          {/* Card 5: Communication that lands (col-span-1) */}
          <BentoCard
            title="Communication that lands"
            description="Planned: broadcast notices to parents and staff via SMS and email."
            className="lg:col-span-1"
          >
            <div className="space-y-1.5">
              <div className="p-2 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-[var(--color-text)]">
                  <Bell className="w-3.5 h-3.5 text-[var(--color-brand)]" /> Sports Day Schedule
                </span>
                <span className="text-[10px] text-blue-800 dark:text-blue-300 font-bold">Sent</span>
              </div>
              <div className="p-2 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-[var(--color-text)]">
                  <Check className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" /> Class 8-A
                </span>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold">
                  Delivered
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Card 6: Insights that lead to action (col-span-2 on lg) */}
          <BentoCard
            title="Insights that lead to action"
            description="Planned: visual overview of attendance patterns, fee collection, and academic progress."
            className="lg:col-span-2"
          >
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1">
                  <BarChart3 className="w-3.5 h-3.5 text-[var(--color-brand)]" /> Attendance Trend
                </div>
                <div className="text-xl font-bold text-[var(--color-text)]">+4.2% this month</div>
              </div>
              {/* Mini sparkline bars */}
              <div className="flex items-end gap-1.5 h-10" aria-hidden="true">
                {SPARKLINE_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="w-2.5 rounded-t-[2px] bg-[var(--color-brand)]/80 hover:bg-[var(--color-brand)] transition-colors"
                    style={{ height: `${item.val}%` }}
                  />
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
