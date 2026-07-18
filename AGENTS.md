# Repository Guidelines

## Product Direction

Build OpenAPI Studio as small, revenue-relevant vertical slices. Read `specs/mission.md`, `specs/tech-stack.md`, and `specs/roadmap.md` before planning product work. The legacy repository is behavioral reference material only; do not copy framework-coupled code.

## Spec-Driven Workflow

No feature implementation begins without an approved `specs/features/YYYY-MM-DD-feature-name/spec.md`. Record execution state only in the corresponding `.tasks/YYYY-MM-DD-TSK-N-feature-name-TASKS.md`; do not duplicate status in specifications or plans.

Work on one `READY` task group at a time:

1. Confirm its requirements, dependencies, owner, and validation command.
2. Move it to `IN_PROGRESS` and implement only its approved scope.
3. Run focused checks, review the diff, and record evidence.
4. Move through `REVIEW` and `VALIDATING`; use `DONE` only when evidence passes.

Stop and request a product decision when requirements conflict, scope expands, security or data behavior is unclear, or two implementation attempts fail.

## Development Standards

- Use Bun for package management and scripts; never mix lockfiles.
- Use strict TypeScript and two-space indentation.
- Use Oxfmt as the only formatter, Oxlint for linting, and `tsc --noEmit` as the authoritative type check.
- Use Valibot at external trust boundaries and `drizzle-orm/valibot` only for persistence validation; public contracts must not be generated from database schemas.
- Keep server-only code, bindings, credentials, and database access outside client bundles.
- Prefer platform features and existing dependencies. Add abstractions only for a current approved requirement.
- Test public behavior, authorization, failure paths, and data boundaries, not implementation details.

### Content punctuation

- Never use em dashes (`—`) in user-facing content or metadata. Use periods, commas, colons, or parentheses instead.
- Never commit secrets or local environment files.

## Architecture and Ownership

Use one single-package modular monolith. Organize product behavior as flat vertical slices under `src/features/`; create only directories required by the active feature. Keep TanStack files in `src/routes/` as thin adapters, pure OpenAPI semantics in `src/core/openapi/`, and runtime capabilities in `src/platform/`.

- Features may depend on `core/` and `platform/`, never another feature's internal files.
- `core/` must not depend on features, UI, database, Solid, TanStack, or Worker APIs.
- Do not create internal packages, generic `shared/`, barrel exports, or repeated layer folders without a demonstrated need.
- Co-locate focused behavioral tests with their owning feature.
- One writer owns a feature worktree. The main agent owns routes, composition, schema migrations, global configuration, the lockfile, and shared core contracts.
- Do not add Hono while TanStack Start adequately owns routing and server functions.

Once scripts exist, the merge gate is `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run build`. Also run feature-specific commands declared in the task ledger.

## Git and Review

Use `feat/TSK-N-short-slug`, `fix/TSK-N-short-slug`, or `chore/TSK-N-short-slug`. Keep commits focused and imperative. Pull requests must link the feature spec and task ledger, summarize user-visible behavior, include validation evidence, and disclose migration, security, rollout, and rollback effects.

Human approval is required before implementation, merge, deployment, production migration, secret rotation, or cloud-resource mutation. Agents must not push, merge, or deploy autonomously.
