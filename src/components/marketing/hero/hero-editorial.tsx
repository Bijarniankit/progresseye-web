import { Play } from "lucide-react";
import Link from "next/link";

const headlineWords = ["The", "school", "workspace"];

export function HeroEditorial() {
  return (
    <div className="space-y-6 lg:space-y-8 max-w-2xl">
      <h1 className="font-display leading-[1.05] tracking-tight text-[var(--color-hero-heading)] text-[clamp(40px,5.5vw,72px)]">
        <span className="block font-extrabold">
          {headlineWords.map((word, index) => (
            <span key={word}>
              <span className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block animate-word-reveal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {word}
                </span>
              </span>
              {index < headlineWords.length - 1 ? " " : ""}
            </span>
          ))}
        </span>{" "}
        <span className="block font-medium italic text-[var(--color-hero-tagline)] mt-1.5 pr-2 animate-tagline-reveal">
          that runs itself.
        </span>
      </h1>

      <p className="text-base sm:text-lg lg:text-[18px] text-[var(--color-text-muted)] leading-relaxed max-w-xl">
        An advanced, end-to-end school management platform built for Indian schools — attendance,
        fees, exams, communication, all in one calm screen.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/demo"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-hero-heading)] px-7 py-3.5 text-sm font-semibold text-[var(--color-text-inverse)] transition-all duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
        >
          <span className="absolute inset-0 translate-y-full bg-[var(--color-brand)] transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10">Book a free demo</span>
        </Link>

        <Link
          href="/#tour"
          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-6 py-3 text-sm font-semibold text-[var(--color-text)] backdrop-blur-md transition-all duration-200 hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-surface-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-hero-play-disc)] text-white shadow-xs">
            <Play className="h-3 w-3 fill-white text-white ml-0.5" />
          </span>
          <span>Watch product tour</span>
        </Link>
      </div>
    </div>
  );
}
