import { ProductTourIsland } from "./product-tour-island";

export function ProductTourSection() {
  return (
    <section
      id="tour"
      aria-label="Product tour preview"
      className="py-16 sm:py-20 lg:py-24 border-b border-[var(--color-border-muted)] bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50">
            <span>Interactive Product Tour</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
              aria-hidden="true"
            />
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
              Planned
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
            A calm, capable workspace for daily school operations.
          </h2>

          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            Preview of planned features, shown with sample data. Switch between modules below to see
            how routine school administration is organized into a single, intuitive interface.
          </p>
        </div>

        {/* Deferred Island Container */}
        <div className="max-w-5xl mx-auto">
          <ProductTourIsland />
        </div>
      </div>
    </section>
  );
}
