---
name: pe-components
description: Use when creating or changing reusable React components, variants or design-token usage in ProgressEye.
---
# Component design
React 19 and TypeScript strict. Server Components by default; add use client only when needed.
Layers: components/ui (shadcn primitives), components/marketing (composites), features/<module> (domain). Variants use cva, class merging uses cn, ref is a normal prop in React 19, use Radix Slot for asChild.
Tokens only, no inline hex. Accessibility is built in: roles, labels, keyboard behavior per the WAI-ARIA Authoring Practices, focus management.
Presentational components never fetch data. Filter and pagination state lives in the URL (nuqs). Icons come from lucide-react only.
Each component ships with a dev example, a Vitest and Testing Library test for behavior, and an axe check. One component per file, no barrel files, file under 200 lines. Document props with TSDoc.
