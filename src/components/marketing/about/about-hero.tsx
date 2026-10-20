import { aboutConfig } from "@/config/about";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden bg-surface py-16 md:py-24 lg:py-28"
    >
      {/* Ink Swoosh SVG background (Pure CSS, zero motion library) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-brand/8"
        >
          <path
            d="M -40 480 Q 280 380 460 440 T 1040 340"
            fill="none"
            stroke="currentColor"
            strokeWidth="80"
            strokeLinecap="round"
            className="animate-ink-swoosh"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span>Our Mission</span>
        </div>

        {/* H1 Heading: Factual team claims strictly gated behind hasConfiguredStory */}
        <h1
          id="about-hero-title"
          className="font-display text-4xl font-extrabold tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {aboutConfig.hasConfiguredStory ? (
            <>
              <span className="block">Built by people</span>
              <span className="block text-brand">who&apos;ve sat in staff rooms.</span>
            </>
          ) : (
            <>
              <span className="block">Software designed for schools</span>
              <span className="block text-brand">that value calm.</span>
            </>
          )}
        </h1>

        {/* Subtitle: Plain product belief with zero claims of past actions/team */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted sm:text-xl">
          One belief: software made for schools should feel like the school itself — quiet, capable,
          and never in the way.
        </p>
      </div>
    </section>
  );
}
