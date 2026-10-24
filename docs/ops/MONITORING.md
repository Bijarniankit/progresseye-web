# ProgressEye Monitoring & Observability Runbook

This document details the monitoring strategy, uptime health checks, alerting pathways, database backup protocols, and privacy-preserving log retention policies.

---

## 1. Uptime Checks & Synthetic Health Monitoring

- **Service**: Free-tier external uptime monitoring (e.g. Better Stack / UptimeRobot / Cronitor).
- **Probes**:
  - Target URL: `https://<api-host>/api/v1/health/live`
  - Probe Frequency: Every 60 seconds.
  - Success Criteria: HTTP 200 within 2500ms timeout.
  - Expected Response Body: `{"status":"ok"}`.
- **Alert Channels**:
  - Direct alert to the engineering team distribution email (`ops-alerts@progresseye.com`).
  - No paid enterprise alerting services (e.g., PagerDuty) required for staging/initial launch.

---

## 2. Database Backup and Point-in-Time Recovery (PITR)

- **Infrastructure**: Managed PostgreSQL hosted on Supabase (`ap-south-1` Mumbai region).
- **Automated Backups**:
  - Daily full database snapshots retained for 7 days (Free tier) or 30 days (Pro tier with Point-in-Time Recovery via WAL archiving).
- **Restore Cadence & Verification**:
  - **Cadence**: Monthly scheduled disaster recovery simulation.
  - **Procedure**:
    1. Clone snapshot into an isolated sandbox instance (`progresseye_sandbox_restore`).
    2. Run Prisma migration status check (`pnpm prisma migrate status`) to verify schema integrity.
    3. Run read-only sanity query suite asserting table row counts and index health.
    4. Deprovision sandbox instance upon successful audit log entry.

---

## 3. Log Retention & Visitor Privacy Safeguards

- **Log Retention Policy**:
  - Centralized application log retention is capped at **14 days**.
  - Automated log expiration / rotation purges all log streams older than 14 days.
- **Privacy Protections**:
  - **IP Redaction**: In Phase 9, Fastify Pino logger is strictly configured to redact raw client IP addresses (`remoteAddress` and `x-forwarded-for` are masked as `[Redacted]`).
  - **Zero PII**: In accordance with the Phase 9 privacy mandate, request logs do not log request bodies, email addresses, student IDs, or query parameters.
  - **Clean Schemas**: Spec excludes extraneous or non-existent telemetry fields (e.g. `user_agent_hash` is not collected or stored).
