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

`bun run deploy` is intentionally human-gated. Local development and CI require no production credentials.
