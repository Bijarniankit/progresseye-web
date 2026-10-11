# ProgressEye Web (`progresseye-web`)

Frontend application and public marketing platform for ProgressEye 2.0 multi-tenant school operating system.

## Tech Stack
- **Framework**: Next.js 16 App Router (React 19 Server Components by default)
- **Styling**: Tailwind CSS 4 (CSS-first variables in `src/styles/tokens.css`) & shadcn/ui
- **Motion**: `motion/react` (with strict `prefers-reduced-motion` support)
- **Data Fetching**: TanStack Query & Orval (OpenAPI contract-generated client)
- **Internationalization**: `next-intl` (English, Hindi)
- **Linter & Formatter**: Biome
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js `24.x` (see `.nvmrc`)
- pnpm `12.x`
- Backend API running on `http://localhost:4000` (for local end-to-end development)

### Setup
```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Generate API client from pinned OpenAPI spec
pnpm gen:api

# Start development server
pnpm dev
```

## Available Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js development server on `http://localhost:3000` |
| `pnpm build` | Compile and bundle production Next.js application |
| `pnpm start` | Run Next.js production server |
| `pnpm lint` | Run code quality checks with Biome |
| `pnpm lint:fix` | Fix formatting and lint issues automatically with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm typecheck` | Strict TypeScript type checking without emitting files |
| `pnpm test` | Run Vitest unit & component test suites |
| `pnpm gen:api` | Regenerate TanStack Query hooks & schemas from pinned OpenAPI spec |

## Design Guidelines & Contracts
- **Source of Truth**: `docs/design/public-pages-spec.md` amended by `docs/design/DECISIONS.md`.
- **Tokens Only**: Components use CSS variables from `src/styles/tokens.css`. No inline hex codes or pixel arbitrary values.
- **Contract Sync**: Never edit `src/lib/api/generated/` by hand. Always run `pnpm gen:api`.
