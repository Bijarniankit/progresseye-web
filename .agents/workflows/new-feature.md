---
description: Scaffold a standardized feature folder adhering to pe-components and domain-driven design principles.
---
# /new-feature Workflow

When scaffolding a new feature module:
1. Determine the module name `<module>` within `src/features/<module>/`.
2. Create the standard directory structure:
   - `src/features/<module>/components/`
   - `src/features/<module>/hooks/`
   - `src/features/<module>/schemas/`
   - `src/features/<module>/table-configs/`
   - `src/features/<module>/tests/`
3. Implement components adhering to `pe-components`:
   - React 19 Server Components where possible; minimal `use client`
   - Design tokens only (no hardcoded hex or px)
   - Proper WAI-ARIA roles, labels, and keyboard navigability
   - URL-driven state (nuqs) for filters and pagination
   - Icons from `lucide-react`
4. Add Vitest unit test and axe accessibility check for each component.
