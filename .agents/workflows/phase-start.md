---
description: Start a new phase by reviewing requirements, reading AGENTS.md and relevant skills, and producing an implementation plan Artifact before stopping for approval.
---
# /phase-start Workflow

When starting a phase:
1. Read `AGENTS.md` and the current phase brief in `02-PHASES.md`.
2. Identify and read all relevant skills from `.agents/skills/`.
3. Check the design spec in `docs/design/public-pages-spec.md` and decisions in `docs/design/DECISIONS.md`.
4. Create an implementation plan Artifact including:
   - Target files to create or modify
   - Any new dependencies with explicit justifications
   - Risk assessment and mitigation
   - Step-by-step test plan (unit, visual, a11y)
5. **STOP AND WAIT**: Do not write code or install packages until the user reviews and explicitly approves the plan.
