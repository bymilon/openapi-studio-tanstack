# Technical Stack

## Application Shape

Use one **single-package modular monolith**: one TypeScript application, lockfile, CI pipeline, and Cloudflare Worker deployment. Do not use a monorepo or Bun workspaces. Use **TanStack Start with Solid** and Vite. Prerender public marketing routes as static assets; serve authenticated application routes through a Cloudflare Worker.

Organize product behavior as flat vertical slices under `src/features/`. Keep `src/routes/` as thin TanStack adapters, framework-free OpenAPI semantics in `src/core/openapi/`, and runtime capabilities in `src/platform/`. Features may depend on core and platform contracts but not another feature's internal files.

## Runtime and Data

- **Production:** Cloudflare Workers and Workers Assets.
- **Local development and package management:** Bun; commands and lockfile must be Bun-native.
- **Database:** Turso/libSQL through Drizzle ORM using an edge-compatible client.
- **Migrations:** generated SQL committed to Git, forward-only in production, tested from an empty database and the previous schema.
- **Configuration:** request-scoped Worker bindings; never expose server secrets to browser bundles.

## Quality Tooling

- TypeScript strict mode for application and test code.
- Oxfmt is the only formatter; do not install Prettier.
- Oxlint checks correctness, suspicious code, imports, Vitest, and JSX accessibility. Do not enable React-specific rules for Solid.
- `tsc --noEmit` remains the authoritative type check; do not use Oxlint's experimental type checker as a merge gate.
- Valibot validates environment configuration and all external inputs. Use `drizzle-orm/valibot` for persistence boundaries without exposing database-generated schemas as public API contracts.
- Vitest for domain and component tests.
- Cloudflare Worker integration tests for runtime boundaries.
- Playwright only for revenue-critical browser journeys.
- Formatting, linting, typechecking, tests, production build, and Worker preview are merge gates.

## Engineering Constraints

- Pin stable dependency versions; preview packages require an approved specification decision.
- Prefer platform APIs and small framework-free domain modules over wrappers.
- Add an abstraction only for an approved current requirement, normally after two real consumers exist.
- Centralize authorization and validate it server-side for every protected operation.
- Redact secrets and sensitive headers from logs; use structured errors and correlation identifiers.
- Keep generated artifacts reproducible and do not hand-edit generated route or schema outputs.
- Keep features flat until real size requires a split; do not pre-create repeated domain/application/infrastructure layers.
- Do not create a generic shared directory. Promote behavior only after two real features need the same stable contract.
- Do not add Hono unless a separately approved HTTP API or MCP transport proves it removes more code than it adds.

## Legacy Reuse

Port only verified behavior, fixtures, SQL semantics, and audited framework-independent utilities. Do not copy framework-coupled UI, Astro runtime assumptions, database bindings, or accumulated compatibility layers. A later one-shot importer will handle cutover; dual writes are prohibited.
