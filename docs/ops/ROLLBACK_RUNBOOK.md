# ProgressEye Rollback Runbook

This runbook defines the operational procedure for rolling back staging and production deployments across the web frontend and API backend.

---

## 1. Guiding Principles & Deployment Constraints

1. **Backward-Compatible Database Migrations**:
   - All Prisma database migrations must be strictly backward-compatible.
   - Destructive operations (such as column drops or renames) require a phased, two-release process:
     - **Release N**: Add new column/structure, write to both, read from old (or vice versa).
     - **Release N+1**: Migrate remaining legacy data, switch reads/writes fully.
     - **Release N+2**: Safely drop the obsolete column/table.
   - Because all migrations are backward-compatible, an application code rollback can proceed immediately without requiring an emergency database schema downgrade.

2. **No Automatic Migrations on Boot**:
   - `prisma migrate deploy` is NEVER executed on API container startup.
   - Schema migrations run exclusively in an explicit CI/CD release phase or administrative pipeline before new code containers receive traffic.

---

## 2. Web Frontend Rollback (`progresseye-web`)

### Managed Hosting (Vercel / Cloudflare Pages)
- **Time to Rollback**: < 30 seconds (Instant traffic redirection).
- **Execution Steps**:
  1. Open the project dashboard (Deployments view).
  2. Locate the previously verified, healthy deployment SHA.
  3. Click **"Instant Rollback"** / **"Promote to Production"**.
  4. Instant CDN cache invalidation switches live user traffic to the previous build artifacts.
  5. Verify `/api/v1/health/live` and key marketing routes (`/`, `/about`, `/contact`).

### Container / Docker Deployment
- **Time to Rollback**: < 2 minutes.
- **Execution Steps**:
  1. Update the ECS service / Kubernetes deployment / PaaS release to reference the prior Docker image tag (e.g. `progresseye-web:sha-<previous-commit>`).
  2. Initiate rolling deployment.
  3. Confirm health probes return HTTP 200 before routing traffic.

---

## 3. API Backend Rollback (`progresseye-api`)

- **Time to Rollback**: < 3 minutes.
- **Execution Steps**:
  1. Identify the previous stable container image tag (e.g. `progresseye-api:sha-<previous-commit>`).
  2. Update the container orchestrator / hosting platform (Render / AWS ECS / Railway) to deploy the previous tag.
  3. Wait for the new container instances to report healthy on `GET /api/v1/health/live`.
  4. Confirm that reverse proxy logs report HTTP 200/201 and error rates return to normal baseline (< 0.1%).
  5. **Database Verification**:
     - Check database connection pool metrics in Supabase dashboard.
     - Verify no pending locks or migration timeouts.
     - Because all migrations are backward-compatible, the rolled-back API container continues to operate smoothly.

---

## 4. Emergency Contacts & Post-Incident Action

- **Primary Alert Recipient**: Team notification email (`ops-alerts@progresseye.com`).
- **Post-Rollback Triage**:
  - Download application logs from Pino log stream for the incident timeframe.
  - Review log redactions (ensure zero PII or raw visitor IPs leaked).
  - Open a high-priority incident issue in GitHub tracking root cause and remediation.

---

## 5. Strict-Transport-Security (HSTS) Production Ramp Plan

To prevent irreversible site lockout due to misconfigured SSL certificates, custom DNS issues, or CDN edge errors, HSTS max-age is controlled dynamically via the `HSTS_MAX_AGE_SECONDS` environment variable across both `progresseye-web` and `progresseye-api`.

### Configuration Variable
Both repositories read `process.env.HSTS_MAX_AGE_SECONDS`. If omitted, default fallbacks apply:
- Production (`APP_ENV=production` / `NEXT_PUBLIC_APP_ENV=production`): defaults to `300` seconds (5 minutes).
- Staging / Development: defaults to `86400` seconds (1 day).

### Ramp Table & Deployment Steps

| Stage | Target Environment | Duration / Gate Criteria | `HSTS_MAX_AGE_SECONDS` Value | Directives | Deployment & Rollback Actions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage 0 (Staging)** | Staging pre-production | Continuous testing | `86400` (1 day) | No `preload`, no `includeSubDomains` | Verify reverse proxy TLS certificates and zero HTTPS redirect loops. |
| **Stage 1 (Production Initial Launch)** | Production canary | Days 0 to 1 (First 24-48 hours) | `300` (5 minutes default) | No `preload`, no `includeSubDomains` | Set `HSTS_MAX_AGE_SECONDS=300` in deployment environment. If DNS/TLS issues occur, roll back to HTTP/TLS within 5 minutes. |
| **Stage 2 (Production Short Soak)** | Production | Days 2 to 7 (Zero TLS alerts) | `86400` (1 day) | No `preload`, no `includeSubDomains` | Update env var to `HSTS_MAX_AGE_SECONDS=86400` and redeploy. Client rollback clears within 24 hours. |
| **Stage 3 (Production Medium Soak)** | Production | Weeks 2 to 4 (Uptime verified) | `604800` (1 week) | No `preload`, no `includeSubDomains` | Update env var to `HSTS_MAX_AGE_SECONDS=604800` and redeploy. Standard operational cadence. |
| **Stage 4 (Production Steady State)** | Production apex | Month 2+ (Permanent domain) | `31536000` (1 year) | `includeSubDomains; preload` (after apex certified) | Update env var to `HSTS_MAX_AGE_SECONDS=31536000`. Long-term defense against SSL stripping. |

> [!IMPORTANT]
> **Preload & SubDomains Guard**: Do NOT submit to the Chrome HSTS preload list (`includeSubDomains; preload`) until the final apex domain, email MX records, and multi-tenant subdomain strategy have operated in steady state for at least 90 days. Chrome preload list submission is irreversible once accepted. Staging environments strictly remain at `HSTS_MAX_AGE_SECONDS=86400`.
