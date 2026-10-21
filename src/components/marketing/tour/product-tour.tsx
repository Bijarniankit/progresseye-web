"use client";

import { Check, Clock, IndianRupee, X } from "lucide-react";
import * as React from "react";
import { siteConfig } from "@/config/site";
import {
  ATTENDANCE_DERIVED_PERCENT,
  ATTENDANCE_PRESENT_COUNT,
  ATTENDANCE_STUDENTS,
  ATTENDANCE_TOTAL_STUDENTS,
  EXAM_DERIVED_PERCENT,
  EXAM_GRADE_DISTRIBUTION,
  EXAM_GRADED_COUNT,
  EXAM_TOTAL_STUDENTS,
  FEE_DERIVED_PERCENT,
  RECENT_FEE_TRANSACTIONS,
  SAMPLE_EXAM_MARKS,
} from "./tour-fixtures";

export type TourTabId = "attendance" | "fees" | "exams";

interface ProductTourProps {
  initialTab?: TourTabId;
}

export function ProductTour({ initialTab = "attendance" }: ProductTourProps) {
  const [activeTab, setActiveTab] = React.useState<TourTabId>(initialTab);
  const attendanceList = ATTENDANCE_STUDENTS;
  const presentCount = ATTENDANCE_PRESENT_COUNT;
  const derivedAttendancePercent = ATTENDANCE_DERIVED_PERCENT;

  const tabs: Array<{ id: TourTabId; label: string; icon: string }> = [
    { id: "attendance", label: "Attendance", icon: "✓" },
    { id: "fees", label: "Fees", icon: "₹" },
    { id: "exams", label: "Exams", icon: "📊" },
  ];

  // Roving tabindex keyboard navigation for WAI-ARIA tabs pattern
  const tabListRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;
    if (e.key === "ArrowRight") {
      targetIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex >= 0) {
      e.preventDefault();
      const nextTab = tabs[targetIndex];
      setActiveTab(nextTab.id);
      const tabButtons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabButtons?.[targetIndex]?.focus();
    }
  };

  return (
    <div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-e2)] overflow-hidden">
      {/* Browser Chrome Header Mockup */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[var(--color-danger)] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-warning)] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)] inline-block" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center justify-center flex-1 max-w-sm sm:max-w-md mx-3">
          <div className="w-full px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono flex items-center justify-center gap-1.5 select-none">
            <span className="text-[var(--color-brand)] font-bold">https://</span>
            <span className="text-[var(--color-text)]">{siteConfig.mockDomain}</span>
            <span className="text-[var(--color-text-muted)]">/{activeTab}</span>
          </div>
        </div>

        {/* Planned Preview Notice */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)] border border-[var(--color-badge-info-border)]">
            Planned
          </span>
        </div>
      </div>

      {/* Tab Navigation (ARIA Tablist) */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Product tour preview modules"
        className="flex items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 sm:px-6 pt-3 gap-2 overflow-x-auto"
      >
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tour-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`tour-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative px-4 py-2.5 text-sm font-semibold rounded-t-[var(--radius-md)] flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] ${
                isSelected
                  ? "text-[var(--color-brand)] bg-[var(--color-surface-subtle)] border-t border-x border-[var(--color-border)] -mb-px"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]/50"
              }`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                Sample data
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Container */}
      <div className="p-4 sm:p-6 lg:p-8 min-h-[460px] flex flex-col justify-between bg-[var(--color-surface)]">
        {/* PANEL 1: Attendance */}
        {activeTab === "attendance" && (
          <div
            role="tabpanel"
            id="tour-panel-attendance"
            aria-labelledby="tour-tab-attendance"
            className="space-y-6 focus:outline-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                  Class VIII-A · Daily Roll Call
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                  Planned: take attendance from a phone or desktop and notify guardians of absences.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)]">
                  {presentCount} / {ATTENDANCE_TOTAL_STUDENTS} Present ({derivedAttendancePercent}%)
                </span>
                <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 9:14 AM
                </span>
              </div>
            </div>

            {/* Attendance 30-square grid (Non-interactive sample preview) */}
            <ul
              aria-label="Sample attendance roll call grid"
              className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-2.5 list-none p-0 m-0"
            >
              {attendanceList.map((student) => (
                <li
                  key={student.id}
                  aria-label={`${student.id} (${student.rollNo}): ${student.isPresent ? "Present" : "Absent"}`}
                  className={`h-11 rounded-[var(--radius-md)] flex flex-col items-center justify-center text-xs font-semibold border ${
                    student.isPresent
                      ? "bg-[var(--color-badge-info-bg)] border-[var(--color-badge-info-border)] text-[var(--color-badge-info-text)]"
                      : "bg-[var(--color-badge-warning-bg)] border-[var(--color-badge-warning-border)] text-[var(--color-badge-warning-text)]"
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
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border-muted)]">
              <span>Auto-saved to local state · Simulated preview</span>
              <span className="font-medium text-[var(--color-text)]">
                Absent: {ATTENDANCE_TOTAL_STUDENTS - presentCount} students
              </span>
            </div>
          </div>
        )}

        {/* PANEL 2: Fees */}
        {activeTab === "fees" && (
          <div
            role="tabpanel"
            id="tour-panel-fees"
            aria-labelledby="tour-tab-fees"
            className="space-y-6 focus:outline-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                  Fee Collection · Term 2 Overview
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                  Planned: collect fees online (UPI first) with receipts and due reminders.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)]">
                {FEE_DERIVED_PERCENT}% Collected
              </span>
            </div>

            {/* Gauge & Totals */}
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Total Term Collection
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--color-text)] flex items-center">
                  <IndianRupee className="w-6 h-6 mr-1" />
                  14,82,500
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Target: ₹ 17,00,000 · Remaining: ₹ 2,17,500
                </p>
              </div>

              {/* Progress bar fill */}
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[var(--color-text)]">
                  <span>Progress</span>
                  <span>{FEE_DERIVED_PERCENT}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[var(--color-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-brand)] transition-all duration-500"
                    style={{ width: `${FEE_DERIVED_PERCENT}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Transaction Feed */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Recent Sample Transactions
              </span>
              <div className="divide-y divide-[var(--color-border)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden">
                {RECENT_FEE_TRANSACTIONS.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 bg-[var(--color-surface)] flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">{tx.studentName}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{tx.grade}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--color-text)]">
                        ₹ {tx.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">{tx.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: Exams */}
        {activeTab === "exams" && (
          <div
            role="tabpanel"
            id="tour-panel-exams"
            aria-labelledby="tour-tab-exams"
            className="space-y-6 focus:outline-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                  Mathematics Term 1 · Grade Distribution
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                  Planned: configurable grading scales and report cards.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)]">
                {EXAM_GRADED_COUNT} / {EXAM_TOTAL_STUDENTS} Graded ({EXAM_DERIVED_PERCENT}%)
              </span>
            </div>

            {/* Distribution Bars */}
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-3">
                Class Grade Breakdown ({EXAM_GRADED_COUNT} Students)
              </span>
              <div className="grid grid-cols-5 gap-3 text-center">
                {EXAM_GRADE_DISTRIBUTION.map((item) => (
                  <div key={item.grade} className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[var(--color-text)]">{item.count}</span>
                    <div className="w-full h-16 bg-[var(--color-border)]/50 rounded-t-[var(--radius-sm)] flex items-end justify-center p-1 my-1">
                      <div
                        className="w-full rounded-[var(--radius-sm)] transition-all duration-300"
                        style={{
                          height: `${(item.count / 18) * 100}%`,
                          backgroundColor: item.colorVar,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[var(--color-text)]">{item.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Mark Ledger */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Sample Report Card Preview
              </span>
              <div className="divide-y divide-[var(--color-border)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden">
                {SAMPLE_EXAM_MARKS.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 bg-[var(--color-surface)] flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">
                        {rec.studentName}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">{rec.subject}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {rec.marks} / {rec.totalMarks}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)]">
                        {rec.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
