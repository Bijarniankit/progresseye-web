# Pinned OpenAPI Specification

This directory holds the pinned, committed OpenAPI contract exported from `progresseye-api`. The web application builds its typed client hooks against this file exclusively via Orval (`pnpm gen:api`).

## Provenance
- **Source Repository**: `progresseye-api`
- **Source Git Commit**: `d645087` (`d64508764bf36ef2e121cbebc993f5427bb8ef52`)
- **Export Date**: October 2026 (Phase 9)
- **Endpoints Defined**:
  - `GET /api/v1/health/live` (Liveness probe)
  - `GET /api/v1/health/ready` (Readiness probe)
  - `POST /api/v1/public/contact` (Contact lead intake)
  - `POST /api/v1/public/demo` (Demo request intake)
  - `POST /api/v1/public/newsletter` (Newsletter subscription intake)

## Contract Drift Policy
Web builds never query the live API during compilation. CI verifies contract synchronization via `pnpm test:contract-drift`:
```bash
pnpm gen:api
git diff --exit-code src/lib/api/generated/
```
If the API introduces changes, update this pinned spec via a deliberate version bump commit.
