# Delivery Foundation

| Field           | Value                         |
| --------------- | ----------------------------- |
| Feature ID      | TSK-1                         |
| Roadmap outcome | Phase 0 — Delivery Foundation |
| Status          | SPEC_APPROVED                 |
| Owner           | Product owner                 |
| Updated         | 2026-07-18                    |

## Problem and Outcome

The fresh repository has no executable application or deployment path. Product work must not begin until one minimal TanStack Start Solid application can be reproduced locally, validated in CI, previewed on Cloudflare Workers, and connected safely to a disposable Turso database.

This phase produces delivery confidence, not customer functionality. It is required now because every later vertical slice depends on the same runtime, build, migration, and observability boundaries.

## Requirements

- **REQ-001:** A developer can install and run the application using documented Bun commands on a clean checkout.
- **REQ-002:** The application uses TanStack Start Solid, Vite, strict TypeScript, and the official Cloudflare Vite integration.
- **REQ-003:** A minimal public health route is served locally and from a preview Worker without exposing secrets or internal diagnostics.
- **REQ-004:** Public marketing routes can be prerendered into Workers Assets while application routes retain Worker execution.
- **REQ-005:** Turso access uses Drizzle and an edge-compatible libSQL client through request-scoped server code.
- **REQ-006:** Generated SQL migrations are committed, apply to an empty disposable database, and can be rerun without corrupting schema state.
- **REQ-007:** GitHub Actions validates formatting, linting, typechecking, tests, production build, and migration smoke checks using the Bun lockfile.
- **REQ-008:** Preview runtime failures and request correlation are observable through Cloudflare-native logs without recording credentials, tokens, document bodies, or sensitive headers.
- **REQ-009:** Deployment, database provisioning, and secret creation remain explicit human-approved operations.
- **REQ-010:** The repository establishes a single-package modular monolith with thin route adapters and only the feature, core, and platform boundaries required by implemented behavior.
- **REQ-011:** Oxfmt, Oxlint, `tsc --noEmit`, and Valibot have non-overlapping responsibilities and run through Bun scripts; no direct Prettier, ESLint, or Hono application dependency, configuration, or script exists. Unavoidable transitive framework tooling is reported but not adopted as project tooling.

## Non-Goals

- Authentication, workspaces, OpenAPI import, editor behavior, billing, or legacy migration.
- A monorepo, Bun workspaces, component library, custom design system, generalized repository layer, or custom CI framework.
- Production deployment, custom domains, paid observability vendors, or permanent production data.
- Porting legacy application code.

## Interfaces and Boundaries

- Local commands use `bun install`, `bun run dev`, `bun run check`, and `bun run build`.
- `GET /health` returns a small static success response and performs no database query.
- Database credentials exist only in local untracked environment files, GitHub secrets, and Cloudflare secrets.
- Worker bindings are read inside server request handling; no secret-bearing module is importable by client code.
- The initial schema contains only the migration journal or one deliberately trivial smoke-test table. Product tables belong to later approved features.
- Product code belongs to flat slices under `src/features/`; `src/routes/` contains thin TanStack adapters, `src/core/openapi/` contains pure OpenAPI behavior, and `src/platform/` contains runtime capabilities.
- Valibot owns external runtime validation. Drizzle-generated Valibot schemas remain persistence contracts and must not define public APIs.

## Failure and Security Behavior

- Missing database configuration fails a database smoke command with a clear non-secret error; it does not break the public health route.
- CI fails on lockfile drift, migration failure, type errors, test failures, or build failure.
- Logs attach a generated correlation identifier and redact configured sensitive fields.
- Preview deployment cannot target the production Worker or production Turso database.

## Validation

- **VAL-001 → REQ-001:** From a clean checkout, `bun install --frozen-lockfile` and `bun run dev` start successfully using documented prerequisites.
- **VAL-002 → REQ-002, REQ-003:** `bun run typecheck`, tests for `/health`, and `bun run build` pass; built output targets Cloudflare Workers.
- **VAL-003 → REQ-004:** The production build contains prerendered marketing assets and a Worker entry for dynamic routes.
- **VAL-004 → REQ-005, REQ-006:** A disposable Turso database accepts the baseline migration twice safely and the smoke query succeeds.
- **VAL-005 → REQ-007:** A pull request CI run executes the documented Bun checks and rejects a deliberately failing test in a temporary validation branch.
- **VAL-006 → REQ-008:** A preview request produces a correlation identifier in Cloudflare logs and a review confirms no configured secret value is present.
- **VAL-007 → REQ-009:** CI can build and test without production credentials; deploy jobs require an approved environment or manual action.
- **VAL-008 → REQ-010:** A boundary review confirms no internal packages, premature layer folders, cross-feature internal imports, or business logic in route adapters.
- **VAL-009 → REQ-011:** `bun run format:check`, `bun run lint`, and `bun run typecheck` invoke Oxfmt, Oxlint, and TypeScript respectively; direct dependencies, configuration, and scripts contain no Prettier, ESLint, or Hono. Transitive framework tooling is reported but not treated as an application tool choice.

## Rollout and Rollback

Create only a non-production preview Worker and disposable Turso database. Pin stable dependency versions and commit the Bun lockfile. Rollback deletes the preview resources after human approval; no customer traffic or production data is involved.

## Approved Decisions

- One single-package modular monolith, not a monorepo or Bun workspace.
- Flat, feature-based vertical slices with main-agent ownership of high-contention composition files.
- GitHub Actions for CI.
- Cloudflare-native preview logs initially; add a vendor only after an observed need.
- Drizzle plus an edge-compatible libSQL client for the first stable Turso integration.
- Oxfmt, Oxlint, TypeScript, and Valibot have distinct formatting, linting, typechecking, and runtime-validation roles.
- Hono is excluded from the delivery foundation.

## Approval Gate

The product owner approved autonomous implementation on 2026-07-18. Application scaffolding and local validation are authorized. Cloudflare deployment, Turso provisioning, production credentials, push, merge, and destructive external actions remain separately gated.
