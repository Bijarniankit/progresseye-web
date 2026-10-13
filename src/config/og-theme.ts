/**
 * Open Graph Image Theme Constants
 *
 * Satori (@vercel/og) renders SVG/canvas in an isolated environment without access
 * to CSS variables (var(--...)) or external stylesheets.
 * These color constants represent the brand design system's exact values.
 * Documented exemption in scripts/no-hex-check.mjs and DECISIONS.md (D-017).
 */

export const ogTheme = {
  background: "rgb(250, 246, 236)", // #FAF6EC warm cream surface
  slateDark: "rgb(15, 23, 42)", // #0F172A slate-900 / brand text & badge
  white: "rgb(255, 255, 255)", // #FFFFFF badge text
  headline: "rgb(30, 27, 75)", // #1E1B4B deep indigo headline
  bodyText: "rgb(71, 85, 105)", // #475569 slate-600 subtitle
  mutedText: "rgb(100, 116, 139)", // #64748B slate-500 footer domain text
} as const;
