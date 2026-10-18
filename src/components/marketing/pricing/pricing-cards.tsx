"use client";

import { Check, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ANNUAL_SAVINGS_PERCENT, PRICING_TIERS } from "@/config/pricing";

export function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(true);

  const { starter, school, district } = PRICING_TIERS;
  const schoolPrice = isAnnual ? school.annualPricePerStudent : school.monthlyPricePerStudent;

  return (
    <div className="space-y-10">
      {/* Billing Cycle Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="inline-flex p-1 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] select-none">
          <button
            type="button"
            aria-pressed={!isAnnual}
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 ${
              !isAnnual
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-e1)] border border-[var(--color-border)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Monthly billing
          </button>

          <button
            type="button"
            aria-pressed={isAnnual}
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-150 ${
              isAnnual
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-e1)] border border-[var(--color-border)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <span>Annual billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--color-brand)] text-[var(--color-brand-foreground)] uppercase tracking-wider">
              Save {ANNUAL_SAVINGS_PERCENT}%
            </span>
          </button>
        </div>
      </div>

      {/* 3-Tier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* TIER 1: Starter */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-e1)] hover:border-[var(--color-brand)]/40 transition-colors">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text)]">
                {starter.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5">
                {starter.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-4 border-b border-[var(--color-border)]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[var(--color-text)]">
                {starter.customPriceLabel}
              </div>
            </div>

            {/* Feature list under Planned label */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                <span>Planned Scope</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                  Planned
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text)]">
                {starter.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href={starter.ctaHref}
              className="block w-full py-2.5 px-4 rounded-[var(--radius-md)] text-center text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors focus-ring"
            >
              {starter.ctaLabel}
            </Link>
          </div>
        </div>

        {/* TIER 2: School (Most Popular — Inverted Semantic Card) */}
        <div className="rounded-[var(--radius-xl)] p-6 sm:p-8 flex flex-col justify-between relative bg-[var(--color-surface-contrast)] text-[var(--color-text-inverse)] border border-[var(--color-border)] shadow-[var(--shadow-e3)] scale-100 lg:-translate-y-2">
          {/* Most popular floating badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[var(--color-brand)] text-[var(--color-brand-foreground)] shadow-md">
              {school.badge}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text-inverse)]">
                {school.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-inverse)]/80 mt-1.5">
                {school.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-4 border-b border-[var(--color-text-inverse)]/20">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold flex items-center text-[var(--color-text-inverse)]">
                  <IndianRupee className="w-6 h-6 mr-0.5 inline shrink-0" aria-hidden="true" />
                  <span className="font-display">{schoolPrice}</span>
                </span>
                <span className="text-xs text-[var(--color-text-inverse)]/80">
                  {school.billingPeriodLabel}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-inverse)]/70 mt-1">
                {isAnnual ? `Billed annually (Save ${ANNUAL_SAVINGS_PERCENT}%)` : "Billed monthly"}
              </p>
            </div>

            {/* Feature list under Planned label */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-inverse)]/70">
                <span>Planned Scope</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]">
                  Planned
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text-inverse)]">
                {school.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href={school.ctaHref}
              className="block w-full py-2.5 px-4 rounded-[var(--radius-md)] text-center text-sm font-semibold bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] transition-colors shadow-sm focus-ring border border-[var(--color-border)]"
            >
              {school.ctaLabel}
            </Link>
          </div>
        </div>

        {/* TIER 3: District */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-e1)] hover:border-[var(--color-brand)]/40 transition-colors">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-[var(--color-text)]">
                {district.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1.5">
                {district.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-4 border-b border-[var(--color-border)]">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[var(--color-text)]">
                {district.customPriceLabel}
              </div>
            </div>

            {/* Feature list under Planned label */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                <span>Planned Scope</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                  Planned
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text)]">
                {district.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-[var(--color-brand)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href={district.ctaHref}
              className="block w-full py-2.5 px-4 rounded-[var(--radius-md)] text-center text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors focus-ring"
            >
              {district.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
