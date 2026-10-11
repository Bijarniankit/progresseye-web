---
description: Review a completed phase by running verification checks, summarizing changes, and generating a walkthrough Artifact.
---
# /phase-review Workflow

When concluding a phase:
1. Run lint, typecheck, tests, and build:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`
   - `pnpm build`
2. Summarize git diff and verify against the phase checklist in `02-PHASES.md`.
3. Check for any unresolved `TODO-REAL-DATA` or `DRAFT-NEEDS-LEGAL-REVIEW` flags.
4. Document any open issues or known technical debt.
5. Produce a comprehensive walkthrough Artifact detailing the implemented features and test results.
6. **STOP AND WAIT**: Request user review and sign-off before proceeding to the next phase.
