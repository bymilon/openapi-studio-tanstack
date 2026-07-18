# OpenAPI Studio

Single-package modular monolith built with TanStack Start Solid for Cloudflare Workers.

## Local development

Prerequisite: Bun 1.3.14 or a newer 1.x release.

```bash
bun install --frozen-lockfile
bun run dev
```

## Validation

```bash
bun run check
```

Validate committed database migrations without cloud credentials:

```bash
bun run db:check
bun run db:smoke
```

Runtime database access expects `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`. Copy `.env.example` to an ignored local environment file; never commit real credentials.

`bun run deploy` is intentionally human-gated. Local development and CI require no production credentials.
