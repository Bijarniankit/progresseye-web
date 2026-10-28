# ProgressEye — Environment Variables Reference

> **Status**: Comprehensive Registry (API & Web)  
> **Source of Truth**: `.env.example` in `progresseye-web` and `progresseye-api`

---

## 1. Web Application (`progresseye-web`)

| Variable Name | Type / Allowed Values | Default (Dev/Local) | Production Requirement | Purpose & Architectural Notes |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_ENV` | `development` \| `staging` \| `production` | `development` | **Mandatory** (`production`) | Evaluated and **inlined at build time**. Controls `robots.txt` (`Disallow: /` on staging/dev vs full indexing on production) and telemetry enforcement. |
| `NEXT_PUBLIC_SITE_URL` | URL string | `https://progresseye.in` | **Mandatory** | Canonical public domain used for OpenGraph images, sitemaps, and canonical link tags. |
| `NEXT_PUBLIC_COMPANY_NAME` | string | `ProgressEye Technologies Pvt. Ltd.` | `TODO-REAL-DATA` | Registered corporate entity name for footer copyright, metadata, and legal agreements (unregistered placeholder). |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Email string | `support@progresseye.in` | `TODO-REAL-DATA` | Customer support contact email (unregistered mailbox placeholder). |
| `NEXT_PUBLIC_HAS_LEAD_BACKEND` | `true` \| `false` | `false` | `true` (once backend live) | **Lead Intake Feature Flag**. When `false`, forms run client-side validation only, render informative not-connected notices, and dispatch zero network requests. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | string | `""` (empty) | **Mandatory** (Cloudflare) | Public site key for Cloudflare Turnstile anti-abuse widget. Loaded lazily only on form pages when backend is active. |
| `API_INTERNAL_URL` | URL string | `http://localhost:4000` | **Mandatory** (Container) | Internal backend address used exclusively by Next.js server route handlers to proxy `/api/v1/*` requests. Never exposed to browser clients. |
| `NEXT_PUBLIC_TWITTER_URL` | URL string | `""` (empty) | Optional | Social profile link. Social icon is omitted from the UI until a real URL is configured. |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL string | `""` (empty) | Optional | Social profile link. Social icon is omitted from the UI until a real URL is configured. |
| `NEXT_PUBLIC_GITHUB_URL` | URL string | `""` (empty) | Optional | Social profile link. Social icon is omitted from the UI until a real URL is configured. |

---

## 2. API Backend Service (`progresseye-api`)

| Variable Name | Type / Allowed Values | Default (Dev/Local) | Production Requirement | Purpose & Architectural Notes |
| :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | `development` \| `test` \| `production` | `development` | `production` | Node.js standard execution environment. |
| `APP_ENV` | `development` \| `staging` \| `production` \| `test` | `development` | `production` | Application lifecycle environment. Enforces Turnstile fail-closed verification in `production`. |
| `PORT` | integer | `4000` | Optional | Port on which the NestJS / Fastify HTTP server listens. |
| `API_PREFIX` | string | `/api/v1` | Fixed | Global URL path prefix for all HTTP endpoints. |
| `CORS_ORIGIN` | string | `http://localhost:3000` | Production Web Origin | Allowed CORS origin header for browser fetch requests. |
| `TRUSTED_PROXY_COUNT` | integer ($\ge 0$) | `0` | $\ge 1$ (behind proxy) | **IP Spoofing Protection**. When `0`, `trustProxy` is `false`, ignoring spoofed `X-Forwarded-For` headers. Set to upstream hop count (e.g. `1` behind ALB/Cloudflare). |
| `TRUSTED_PROXIES` | comma-separated string | `undefined` | Optional (CIDR list) | Comma-separated list of trusted upstream proxy IP/CIDR addresses (e.g. `10.0.0.0/8`). |
| `DATABASE_URL` | Postgres URI | Local dev URI | **Mandatory** | Primary PostgreSQL connection string with connection pooling (e.g. Supabase port 6543). |
| `DIRECT_URL` | Postgres URI | Local dev URI | **Mandatory** | Direct PostgreSQL connection string without pooler (port 5432) used for Prisma migrations. |
| `REDIS_HOST` | hostname | `localhost` | **Mandatory** | Redis host for BullMQ job queues and rate limit token buckets. |
| `REDIS_PORT` | integer | `6379` | **Mandatory** | Redis port. |
| `REDIS_PASSWORD` | string | empty | Optional | Redis authentication password. |
| `THROTTLE_TTL` | integer (ms) | `60000` (1 min) | Production tuning | Window duration for rate-limiting token buckets. |
| `THROTTLE_LIMIT` | integer | `100` | Production tuning | Max allowed requests per window for authenticated API endpoints. |
| `LOG_LEVEL` | `fatal` \| `error` \| `warn` \| `info` \| `debug` \| `trace` | `info` | `info` / `warn` | Pino structured JSON logging severity threshold. PII is redacted at all levels. |
| `JWT_ACCESS_SECRET` | string ($\ge 16$ chars) | dev secret | **Mandatory** | HMAC secret for signing short-lived access tokens. |
| `JWT_REFRESH_SECRET` | string ($\ge 16$ chars) | dev secret | **Mandatory** | HMAC secret for signing refresh tokens. |
| `LEAD_IP_HMAC_SECRET` | string | dev secret | **Mandatory** | Salt secret for one-way SHA-256 HMAC hashing of client IP addresses before database storage. |
| `TURNSTILE_ENABLED` | `"true"` \| `"false"` | `"false"` | **Mandatory `"true"`** | **Anti-Abuse Gating**. In `production`, API **fails to start** if this is not `"true"`. |
| `TURNSTILE_SECRET_KEY` | string | `1x0000000000000000000000000000000AA` (test) | **Mandatory non-test key** | Cloudflare Turnstile secret key. In `production`, API **fails to start** if set to a test key. |
| `SMTP_HOST` | hostname | `localhost` | **Mandatory** | Outgoing SMTP mail server host (Mailpit in development/test). |
| `SMTP_PORT` | integer | `1025` | **Mandatory** | Outgoing SMTP mail server port. |
| `SMTP_USER` | string | empty | Provider credentials | SMTP authentication username. |
| `SMTP_PASS` | string | empty | Provider credentials | SMTP authentication password. |
| `MAIL_FROM` | Email string | `noreply@progresseye.in` | Verified domain email | RFC 5322 From header for automated transactional emails (AWS SES identity). |
| `LEAD_NOTIFICATION_RECIPIENT` | Email string | `leads@progresseye.in` | Internal team inbox | Destination inbox for internal institutional lead notifications (unregistered mailbox placeholder). |
