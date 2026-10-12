# Pinned OpenAPI Specification

This directory holds the pinned, committed OpenAPI contract exported from `progresseye-api`. The web application builds its typed client hooks against this file exclusively via Orval (`pnpm gen:api`).

## Provenance
- **Source Repository**: `progresseye-api`
- **Source Git Tag**: `phase-02-approved`
- **Source Git Commit**: `5bdf148`
- **Export Date**: October 2026
- **Endpoints Defined**:
  - `GET /api/v1/health/live` (Liveness probe)
  - `GET /api/v1/health/ready` (Readiness probe)

## Contract Drift Policy
Web builds never query the live API during compilation. CI verifies contract synchronization via `pnpm test:contract-drift`:
```bash
pnpm gen:api
git diff --exit-code src/lib/api/generated/
```
If the API introduces changes, update this pinned spec via a deliberate version bump commit.
