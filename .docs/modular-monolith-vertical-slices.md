# Modular Monolith with Feature-Based Vertical Slices

## Decision

OpenAPI Studio will be a **single-package modular monolith**: one repository, one application, one lockfile, one CI pipeline, and one Cloudflare Worker deployment.

Do not describe the codebase as a workspace. OpenAPI Studio already has customer workspaces, and Bun workspaces normally imply multiple packages. Do not introduce a monorepo, internal package graph, or independently deployed services without measured operational need.

This architecture is rated **9.4/10** before implementation. It can reach 9.8 by proving its boundaries through real vertical slices, not by adding more layers or tooling.

## Intended Structure

```text
src/
  routes/                    # Thin TanStack route adapters
  features/
    marketing/
    authentication/
    workspace-membership/
    spec-import/
    spec-editing/
    spec-publishing/
    billing/
    github-sync/
    endpoint-execution/
    mcp-access/
  core/
    openapi/                 # Pure shared OpenAPI semantics
  platform/
    database/
    authorization/
    observability/
    configuration/
```

Create only the directories required by the active approved feature. The tree above defines placement, not scaffolding work.

## Flat Feature Slices

Each feature owns its user interface, server behavior, validation, and tests. Keep its files flat until real size makes a split clearer.

```text
features/spec-import/
  import.schema.ts
  import.server.ts
  import-view.tsx
  import.test.ts
```

Do not mechanically create `domain/`, `application/`, `infrastructure/`, `controllers/`, `services/`, or `repositories/` inside every feature. Avoid barrel `index.ts` files unless a feature needs an explicit public contract.

TanStack route files contain route declarations, loading, and input handoff only. Business rules remain in their owning feature. Generated route files must never be hand-edited.

## Dependency Rules

- Features may depend on `core/` and `platform/`.
- `core/` must not depend on features, UI, database, TanStack, Solid, or Worker APIs.
- A feature must not import another feature's internal files.
- Cross-feature behavior uses a small explicit exported contract.
- `platform/` implements runtime capabilities but contains no product workflow.
- Do not create a generic `shared/` directory. Promote code only when two real features require the same stable behavior.
- Prefer database constraints and platform APIs over application abstractions.
- Add automated import-boundary enforcement only after a real violation demonstrates the need.

## AI Agent Ownership Model

```text
one feature
-> one approved specification
-> one task ledger
-> one branch or worktree
-> one implementation writer
-> one independent reviewer
```

Parallel writers may work only in separate worktrees on non-overlapping feature directories. Read-only discovery, threat modeling, and review may run concurrently.

The main integrating agent owns high-contention files and decisions:

- `src/routes/` and application composition;
- database schema and migrations;
- global configuration and the Bun lockfile;
- `core/openapi/` contracts;
- integration, task-ledger updates, and final validation.

Subagents report evidence to the main agent. They do not independently change product intent, merge, deploy, or edit the same task ledger.

## Testing Placement

Co-locate focused behavioral tests with their feature by default. Tests must exercise public outcomes, failure paths, authorization, and data boundaries rather than internal implementation shape.

Use separate cross-feature or Worker integration tests only when the behavior genuinely crosses module or runtime boundaries. Use Playwright only for revenue-critical browser journeys.

## Conditions for 9.8

1. Record this decision in `specs/tech-stack.md` and the durable ownership rules in `AGENTS.md` before scaffolding.
2. Deliver two real vertical slices without cross-feature internal imports or a generic shared layer.
3. Demonstrate that route adapters remain thin and server-only code cannot enter client bundles.
4. Keep schema migrations, composition, and lockfile changes under one integrating owner.
5. Add boundary linting only if manual review fails to preserve these rules.
6. Keep Hono excluded unless a separately approved public API or MCP transport proves that it removes more code than it adds.

The remaining score must be earned through working code, clean dependency direction, integration tests, preview deployment, and production evidence. Documentation alone cannot establish architectural quality.
