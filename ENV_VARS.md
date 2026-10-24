# ProgressEye Environment Variables Matrix

This document provides a comprehensive specification of every environment variable across `progresseye-web` and `progresseye-api`.

> [!IMPORTANT]
> **Build-Time Inlining for Next.js**:
> Any variable prefixed with `NEXT_PUBLIC_` is inlined into the client JavaScript bundle at **BUILD time**. Changing these variables at container runtime in staging or production will have **no effect** on client code. Builds must be executed with the exact target environment variables configured.
>
> **Production Turnstile Launch Guard**:
> In `production` (`NEXT_PUBLIC_APP_ENV=production` or `APP_ENV=production`), Cloudflare test site/secret keys (`1x...`, `2x...`, `3x...`) are strictly rejected at build time and process startup. Real Cloudflare Turnstile keys are launch-blocking.

---

## 1. Web Frontend (`progresseye-web`)

| Variable | Scope | Required | Purpose | Local Default | CI Value | Staging Value | Production Value |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_ENV` | Build | Yes | Controls client environment logic, error logging, and validation guards | `development` | `development` | `staging` | `production` |
| `NEXT_PUBLIC_HAS_LEAD_BACKEND` | Build | Yes | Feature flag enabling public lead intake forms and API integration | `false` | `false` | `true` | `false` (until Phase 11 approval) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build | When flag ON | Cloudflare Turnstile public site key | `1x00000000000000000000AA` (always passes) | `1x00000000000000000000AA` | Real Staging Site Key | Real Production Site Key (Launch-blocking) |
| `NEXT_PUBLIC_API_URL` | Build/Runtime | No | Public API base URL accessed from browser | `http://localhost:4000/api/v1` | `http://localhost:4000/api/v1` | `https://api.staging.progresseye.com/api/v1` | `https://api.progresseye.com/api/v1` |
| `API_INTERNAL_URL` | Runtime | No | Internal network API URL used by Next.js server rewrites | `http://localhost:4000` | `http://localhost:4000` | `http://api-internal:4000` | `http://api-internal:4000` |
| `NEXT_PUBLIC_LAUNCH_READY` | Build | No | Production launch readiness verification flag. When `true`, enforces zero TODO/draft tokens and production keys | `false` | `false` | `false` | `true` (at launch release build) |
| `PORT` | Runtime | No | Node server listener port | `3000` | `3000` | `3000` | `3000` |

---

## 2. API Backend (`progresseye-api`)

| Variable | Scope | Required | Purpose | Local Default | CI Value | Staging Value | Production Value |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `APP_ENV` | Runtime | Yes | Application execution environment (`development`, `staging`, `production`) | `development` | `development` | `staging` | `production` |
| `NODE_ENV` | Runtime | Yes | Node runtime mode | `development` | `development` | `production` | `production` |
| `PORT` | Runtime | No | Fastify server port | `4000` | `4000` | `4000` | `4000` |
| `API_PREFIX` | Runtime | No | Route prefix for REST endpoints | `/api/v1` | `/api/v1` | `/api/v1` | `/api/v1` |
| `CORS_ORIGIN` | Runtime | Yes | Allowed Origin header(s) | `http://localhost:3000` | `http://localhost:3000` | `https://staging.progresseye.com` | `https://progresseye.com` |
| `LOG_LEVEL` | Runtime | No | Pino logger verbosity (`trace`, `debug`, `info`, `warn`, `error`) | `info` | `info` | `info` | `info` |
| `TRUSTED_PROXY_COUNT` | Runtime | Yes | Number of upstream reverse proxy hops to trust for client IP determination | `0` (direct/off) | `0` | `1` or `2` (per edge topology) | `1` or `2` (per edge topology) |
| `TRUSTED_PROXIES` | Runtime | No | Comma-separated list of explicit proxy CIDRs/IPs | Unset | Unset | Optional CIDR list | Optional CIDR list |
| `DATABASE_URL` | Secret | Yes | Transaction-pooled PostgreSQL connection string | Local Postgres URL | Local/Docker Postgres URL | Supabase Pooler URL (`ap-south-1`) | Supabase Pooler URL (`ap-south-1`) |
| `DIRECT_URL` | Secret | Yes | Direct PostgreSQL connection string for Prisma migrations | Local Postgres URL | Local/Docker Postgres URL | Supabase Direct URL (`ap-south-1`) | Supabase Direct URL (`ap-south-1`) |
| `SUPABASE_URL` | Runtime | Optional | Supabase project management URL | Unset | Unset | `https://<ref>.supabase.co` | `https://<ref>.supabase.co` |
| `SUPABASE_ANON_KEY` | Secret | Optional | Supabase anonymous client key | Unset | Unset | Staging Anon Key | Production Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Optional | Supabase administrative service role key | Unset | Unset | Staging Service Role Key | Production Service Role Key |
| `REDIS_HOST` | Runtime | Yes | Redis host for BullMQ queues and throttler cache | `localhost` | `localhost` | Managed Redis Host | Managed Redis Host |
| `REDIS_PORT` | Runtime | Yes | Redis port | `679` | `6379` | `6379` | `6379` |
| `REDIS_PASSWORD` | Secret | Optional | Redis authentication password | Empty | Empty | Staging Redis Password | Production Redis Password |
| `THROTTLE_TTL` | Runtime | No | Global rate limit window duration in milliseconds | `60000` (1 min) | `60000` | `60000` | `60000` |
| `THROTTLE_LIMIT` | Runtime | No | Maximum requests allowed per window per IP | `100` | `100` | `100` | `100` |
| `JWT_ACCESS_SECRET` | Secret | Yes | HMAC key for signing short-lived access tokens (min 32 chars) | Dev secret | Dev secret | Staging secret | High-entropy production secret |
| `JWT_REFRESH_SECRET` | Secret | Yes | HMAC key for signing refresh tokens (min 32 chars) | Dev secret | Dev secret | Staging secret | High-entropy production secret |
| `LEAD_IP_HMAC_SECRET` | Secret | Yes | HMAC secret for hashing visitor IPs in lead records | Dev secret | Dev secret | Staging secret | High-entropy production secret |
| `TURNSTILE_ENABLED` | Runtime | Yes | Enable Turnstile validation in lead service | `false` | `false` | `true` | `true` (enforced on prod startup) |
| `TURNSTILE_SECRET_KEY` | Secret | When enabled | Cloudflare Turnstile server verification secret | `1x0000000000000000000000000000000AA` | `1x0000000000000000000000000000000AA` | Real Staging Secret | Real Production Secret (Launch-blocking) |
| `SMTP_HOST` | Runtime | Yes | SMTP server hostname | `localhost` (Mailpit) | `localhost` (Mailpit) | AWS SES Endpoint (`email-smtp.ap-south-1.amazonaws.com`) | AWS SES Endpoint (`email-smtp.ap-south-1.amazonaws.com`) |
| `SMTP_PORT` | Runtime | Yes | SMTP server port | `1025` | `1025` | `587` (STARTTLS) | `587` (STARTTLS) |
| `SMTP_USER` | Secret | Optional | SMTP authentication username | Empty | Empty | AWS SES SMTP Username | AWS SES SMTP Username |
| `SMTP_PASS` | Secret | Optional | SMTP authentication password | Empty | Empty | AWS SES SMTP Password | AWS SES SMTP Password |
| `MAIL_FROM` | Runtime | Yes | Outbound sender envelope address | `noreply@progresseye.com` | `noreply@progresseye.com` | `staging-notifications@progresseye.com` | `noreply@progresseye.com` |
| `LEAD_NOTIFICATION_RECIPIENT` | Runtime | Yes | Destination inbox for inbound institutional lead alerts | `leads@progresseye.com` | `leads@progresseye.com` | `staging-leads@progresseye.com` | `institutional-leads@progresseye.com` |
