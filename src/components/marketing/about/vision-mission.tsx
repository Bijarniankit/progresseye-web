import { Eye, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section aria-labelledby="vision-mission-title" className="relative bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="vision-mission-title" className="sr-only">
          Vision and Mission
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Vision Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface-raised p-8 shadow-xs">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                Our Vision
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                A future where Indian school administration is so quiet, so reliable, and so out of
                the way, that teachers can spend their day on teaching and mentoring.
              </p>
            </div>
          </div>

          {/* Mission Card (High Contrast Dark Card) */}
          <div className="flex flex-col justify-between rounded-2xl border border-border-contrast bg-surface-contrast p-8 text-text-contrast shadow-xs">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-text-contrast">
                Our Mission
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-contrast/80">
                To build the school management workspace we wish every school could have —
                thoughtful, honest, accessible, and designed for how Indian schools actually work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
