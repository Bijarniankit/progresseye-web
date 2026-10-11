---
name: pe-qa-visual-a11y
description: Use before finishing any UI phase to check accessibility, visual defects, overflow, broken layouts and performance.
---
# Quality assurance
1. Run lint, typecheck, test and build.
2. Start the dev server. Browser agent visits every changed route at 360, 768 and 1280 px in light and dark, and saves screenshots.
3. Visual checks: no horizontal scroll, no clipped or overlapping text, no layout shift on load, fonts and images load, console is clean, 404 and error states render.
4. Accessibility: axe via Playwright with zero serious or critical issues; keyboard-only pass (tab order, visible focus, Escape closes, no traps); landmarks, one h1, alt text, form labels; contrast; reduced-motion emulation; 200% zoom.
5. Performance targets on mobile: Lighthouse performance 90+, accessibility, best practices and SEO 95+; LCP 2.5s or less, CLS 0.1 or less, INP 200ms or less.
6. Visual regression: Playwright screenshot baselines for key sections.
7. Report a table of route by viewport by result, defects by severity, fixes made, what remains. Then stop and wait for review.
