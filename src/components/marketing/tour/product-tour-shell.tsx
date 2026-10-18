import { Check, Clock, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  ATTENDANCE_DERIVED_PERCENT,
  ATTENDANCE_PRESENT_COUNT,
  ATTENDANCE_STUDENTS,
  ATTENDANCE_TOTAL_STUDENTS,
} from "./tour-fixtures";

/**
 * Server Component Shell for Product Tour
 *
 * Emits complete static semantic HTML on initial server render with the exact
 * same DOM hierarchy, styles, and dimensions as the active first tab.
 * Contains data-tab-id on tab buttons for early click delegation before client hydration.
 */
export function ProductTourShell() {
  const tabs = [
    { id: "attendance", label: "Attendance", icon: "✓", active: true },
    { id: "fees", label: "Fees", icon: "₹", active: false },
    { id: "exams", label: "Exams", icon: "📊", active: false },
  ];

  return (
    <div
      data-tour-shell="true"
      className="w-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-e2)] overflow-hidden"
    >
      {/* Browser Chrome Header Mockup */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
        {/* Window controls */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80 inline-block" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center justify-center flex-1 max-w-sm sm:max-w-md mx-3">
          <div className="w-full px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono flex items-center justify-center gap-1.5 select-none">
            <span className="text-[var(--color-brand)] font-bold">https://</span>
            <span className="text-[var(--color-text)]">{siteConfig.mockDomain}</span>
            <span className="text-[var(--color-text-muted)]">/attendance</span>
          </div>
        </div>

        {/* Planned Preview Notice */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50">
            Planned
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        role="tablist"
        aria-label="Product tour preview modules"
        className="flex items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 sm:px-6 pt-3 gap-2 overflow-x-auto"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tour-tab-${tab.id}`}
            aria-selected={tab.active}
            aria-controls={`tour-panel-${tab.id}`}
            tabIndex={tab.active ? 0 : -1}
            data-tab-id={tab.id}
            type="button"
            className={`relative px-4 py-2.5 text-sm font-semibold rounded-t-[var(--radius-md)] flex items-center gap-2 transition-colors ${
              tab.active
                ? "text-blue-800 dark:text-blue-300 bg-[var(--color-surface-subtle)] border-t border-x border-[var(--color-border)] -mb-px"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]/50"
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            <span>{tab.label}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Sample data
            </span>
          </button>
        ))}
      </div>

      {/* Initial Tab Panel: Attendance */}
      <div
        role="tabpanel"
        id="tour-panel-attendance"
        aria-labelledby="tour-tab-attendance"
        className="p-4 sm:p-6 lg:p-8 min-h-[460px] flex flex-col justify-between bg-[var(--color-surface)]"
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                Class VIII-A · Daily Roll Call
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                Click any square to simulate marking attendance in real time.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                {ATTENDANCE_PRESENT_COUNT} / {ATTENDANCE_TOTAL_STUDENTS} Present (
                {ATTENDANCE_DERIVED_PERCENT}%)
              </span>
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 9:14 AM
              </span>
            </div>
          </div>

          {/* 30-square grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-2.5">
            {ATTENDANCE_STUDENTS.map((student) => (
              <div
                key={student.id}
                className={`h-11 rounded-[var(--radius-md)] flex flex-col items-center justify-center text-xs font-semibold border ${
                  student.isPresent
                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                    : "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200"
                }`}
              >
                <span className="text-[10px] font-mono font-semibold">{student.id}</span>
                <span className="text-xs flex items-center">
                  {student.isPresent ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <X className="w-3.5 h-3.5" />
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border-muted)]">
            <span>Auto-saved to local state · Simulated preview</span>
            <span className="font-medium text-[var(--color-text)]">
              Absent: {ATTENDANCE_TOTAL_STUDENTS - ATTENDANCE_PRESENT_COUNT} students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
