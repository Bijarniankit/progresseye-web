---
description: Synchronize OpenAPI contract from API to Web, regenerate typed TanStack Query hooks and Zod schemas with Orval.
---
# /contract-sync Workflow

1. Fetch pinned OpenAPI specification from `progresseye-api` (e.g., `http://localhost:4000/api/v1/openapi.json` or exported spec file).
2. Execute code generation:
   - `pnpm gen:api` (Orval)
3. Ensure generated artifacts in `src/lib/api/generated/` are up to date.
4. Run `pnpm typecheck` to verify that consumers adapt to any updated endpoints or schema types.
5. Fix any broken usages or notify of breaking schema changes.
6. Commit generated files (never hand-edit `src/lib/api/generated`).
