# Phase 10 Status Report

## 1. Done and Merged

The following pull requests and merge commits have been verified green across all CI test suites and merged into `main`:

- **API Service (`progresseye-api`)**:
  - **Pull Request**: PR #37 (`docs(api): aws staging topology, single-server compose, caddyfile, and progresseye.com domain`)
  - **Merge Commit SHA**: `53dedbb02fa62125f385c490a61fa08d32d43169`
  - **Scope**: AWS single-server EC2 Docker Compose specification (`docker-compose.staging.yml`), Caddy reverse proxy ingress configuration (`Caddyfile`), domain migration to `progresseye.com`, removal of legacy `.do/app.yaml`, and pointer to canonical staging owner checklist.

- **Web Frontend (`progresseye-web`)**:
  - **Pull Request**: PR #52 (`docs(web): aws staging topology, single-server compose, caddyfile, and progresseye.com domain`)
  - **Merge Commit SHA**: `a1c29b35bcddf7e279b90cff3156cfc5d7966846`
  - **Scope**: AWS single-server EC2 Docker Compose specification (`docker-compose.staging.yml`), Caddy reverse proxy ingress configuration (`Caddyfile`), canonical staging owner deployment checklist (`docs/ops/STAGING_OWNER_CHECKLIST.md`), Node 24 and pnpm 12.11.2 pinned Dockerfile (`Dockerfile`), staging robots.txt gating, empty default support email guard, and domain migration to `progresseye.com`.

---

## 2. Owner Actions Pending

The following external infrastructure provisioning and governance prerequisites require direct action by the project owner before live staging deployment can take place:

1. **Domain Registration & DNS**:
   - Register the apex domain `progresseye.com` with chosen registrar.
   - Configure DNS hosting (via AWS Route 53 hosted zone or external registrar DNS) with `A` records pointing `staging.progresseye.com` and `api.staging.progresseye.com` to the EC2 Elastic IP address.

2. **AWS Account & Security Baseline**:
   - Set up dedicated AWS production/staging account with hardware/FIDO2 MFA on the root account.
   - Configure AWS Budgets and CloudWatch Billing Alarms (recommended threshold: $60/month with SMS/email notifications).
   - Create IAM administrator user/role with MFA for daily operations; lock away root credentials.

3. **Compute, Database & Email Infrastructure**:
   - Launch EC2 `t3.medium` instance in region `ap-south-1` (Mumbai) with Amazon Linux 2023 or Ubuntu 24.04 LTS, attach an Elastic IP, and provision Docker CE + Docker Compose plugin.
   - Provision Amazon RDS PostgreSQL 17 instance (`db.t4g.micro`, gp3 storage, private VPC subnet, 7-day automated backup retention).
   - Verify domain identity `progresseye.com` in Amazon Simple Email Service (SES) with DKIM/SPF/DMARC DNS records in region `ap-south-1`.
   - Submit AWS SES Production Sandbox Exit request describing inbound school inquiry notification traffic to enable delivery to external domains.

4. **Security & Ingress Credentials**:
   - Provision Cloudflare account and obtain Cloudflare Turnstile production site key and secret key for `progresseye.com` / `staging.progresseye.com`.
   - Designate a valid ACME certificate notification email for Let's Encrypt / ZeroSSL TLS certificate notifications in `Caddyfile` (replacing `TODO-REAL-DATA-ACME-EMAIL`).

5. **Operational Communication & Identity**:
   - Provision institutional lead intake mailbox (`leads@progresseye.com`) and configure MX/inbox routing.
   - Register corporate legal entity name and update legal footer/terms metadata (replacing `TODO-REAL-DATA`).
   - Configure third-party external uptime monitoring (e.g. Better Uptime, Checkly, or UptimeRobot) targeting `https://staging.progresseye.com/api/v1/health`.

6. **AWS Price Verification**:
   - Verify live on-demand hourly pricing for `t3.medium` in `ap-south-1` on the official [Amazon EC2 On-Demand Pricing](https://aws.amazon.com/ec2/pricing/on-demand/) page.
   - Verify PostgreSQL 17 single-AZ instance pricing for `db.t4g.micro` in `ap-south-1` on the official [Amazon RDS PostgreSQL Pricing](https://aws.amazon.com/rds/postgresql/pricing/) page.
   - Verify current SES free-tier terms and outbound allowance conditions on the official [Amazon SES Pricing](https://aws.amazon.com/ses/pricing/) page.

---

## 3. Agent Tasks Blocked Until Accounts Exist

The following agent tasks cannot be executed until the owner provisions the accounts and infrastructure listed in Section 2:

1. **Populate Real Staging Deployment Configuration**:
   - Populate actual parameter values in AWS Systems Manager (SSM) Parameter Store / `.env` on the staging host (RDS endpoints, database credentials, Turnstile keys, SES SMTP credentials).
2. **Execute Staging Smoke Test Script**:
   - Execute `node scripts/staging-smoke.mjs` against the live staging endpoint `https://staging.progresseye.com` to validate HTTP 200 responses, security headers, and health checks.
3. **Execute Hop-Trace Verification for `TRUSTED_PROXY_COUNT`**:
   - Temporarily enable `DIAGNOSTICS_ENABLED=true` on the API container, execute hop-trace probe `curl -H "X-Forwarded-For: 203.0.113.195" https://staging.progresseye.com/api/v1/health/hop-trace`, confirm whether Fastify extracts origin client IP via hop count 1 or 2, configure `TRUSTED_PROXY_COUNT`, and revert `DIAGNOSTICS_ENABLED=false`.
4. **End-to-End Form-to-API-to-DB-to-Email Pipeline Verification**:
   - Submit live test lead on staging marketing form with real Turnstile token, verify DB persistence in PostgreSQL table `Lead`, verify internal notification dispatch through AWS SES, and verify delivery to `leads@progresseye.com`.
5. **Turnstile Local Storage & Cookie Privacy Audit**:
   - Inspect browser storage, cookies, and network traffic during Turnstile challenge execution on live staging domain to ensure zero unsolicited client tracking.
6. **Real-Device Font & CLS Verification**:
   - Measure real-world mobile Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) on staging across real physical devices and mobile browsers.
7. **Production HSTS Ramp Execution**:
   - Monitor initial staging deployment with `HSTS_MAX_AGE_SECONDS=300`, evaluate operational stability, and incrementally ramp to 86,400 s (1 day), then 2,592,000 s (30 days), and finally 63,072,000 s (2 years) with preload.
8. **Live Rollback Drill Execution**:
   - Conduct staging rollback drills according to `docs/ops/ROLLBACK_DRILL.md` (Docker Compose rollback, migration rollback, and RDS point-in-time recovery verification).
9. **Production Bundle & Performance Analysis**:
   - Run bundle analyzer against final production artifacts to establish baseline bundle sizes and identify downstream optimization opportunities.
