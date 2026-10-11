# ProgressEye Web — agent rules
Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4 (CSS-first tokens), shadcn/ui, motion, TanStack Query, next-intl.
Design source of truth: docs/design/public-pages-spec.md, amended by docs/design/DECISIONS.md.

Always
- Work on one phase at a time. Produce an implementation plan first and wait for approval.
- Server Components by default. Add 'use client' only for interaction, motion or browser APIs.
- Tokens only: no hard-coded hex colors, pixel spacing or font sizes inside components.
- Every animation has a prefers-reduced-motion path.
- Never hand-edit src/lib/api/generated. Run pnpm gen:api.
- Every page needs metadata, one h1, loading and error states, keyboard access, dark mode, and checks at 360, 768 and 1280 px.
- Before finishing: pnpm lint, typecheck, test and build pass, and screenshots are attached.

Never
- Invent statistics, customer counts, prices, uptime or security claims. Use the TODO-REAL-DATA marker.
- Add a dependency that is not listed with a reason in the approved plan.
- Store auth tokens in localStorage.

Skills: start with pe-design-system, then use typography, spacing, ux, effects, motion, responsive, components and qa as relevant.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
