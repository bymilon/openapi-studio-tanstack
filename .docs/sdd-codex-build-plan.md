# Fresh OpenAPI Studio: SDD and Codex Operating Plan

## Objective

Build the new product only in this repository. Treat the legacy Astro repository as read-only behavioral evidence. Deliver progressive parity through small, revenue-relevant vertical slices rather than copying the previous system.

## Sources of Truth

- `AGENTS.md`: durable repository rules and definition of done.
- `PLANS.md`: rules for long-running execution plans; never feature status.
- `specs/mission.md`: customer, problem, commercial outcome, and exclusions.
- `specs/tech-stack.md`: approved runtime and architectural constraints.
- `specs/roadmap.md`: ordered outcomes and dependencies only.
- `specs/features/YYYY-MM-DD-feature-name/spec.md`: approved feature contract.
- `.tasks/YYYY-MM-DD-TSK-N-feature-name-TASKS.md`: sole mutable execution ledger.
- Git, pull requests, and CI: implementation history and verification evidence.

## Delivery Lifecycle

```text
ROADMAP_CANDIDATE -> SPEC_DRAFT -> SPEC_APPROVED -> TASKED
-> IN_PROGRESS -> VALIDATING -> READY_TO_MERGE -> MERGED
```

Do not branch or code before specification approval. The feature specification defines observable requirements, non-goals, interfaces, risks, validation, rollout, and approved decisions. Its task ledger contains three to seven independently verifiable groups with one owner each.

For every task group: inspect, implement the smallest complete vertical change, run focused checks, review the diff, obtain an independent review, run declared validation, and record evidence. Stop for unresolved product decisions, security or data-risk ambiguity, scope expansion, conflicting edits, or two failed approaches.

Human approval is required after the feature contract and before push, merge, deployment, production migration, secret rotation, or cloud mutation.

## Agent Operating Model

The main agent owns intent, writing, integration, ledger updates, and final verification. Use bounded subagents for read-only discovery, threat modeling, test-gap analysis, independent review, or validation. Use at most three helpers, depth one. One writer owns a worktree; parallel writers require separate worktrees and non-overlapping task groups.

Run the manual prompt library for three merged features before packaging stable workflows as repository skills under `.agents/skills/`. Do not automate product judgment.

## Product Sequence

1. Repository controls, CI, preview deployment, observability, and database smoke test.
2. Static marketing, pricing, conversion analytics, and contact capture.
3. Authentication, secure sessions, workspaces, invitations, and centralized RBAC.
4. OpenAPI 3.0/3.1 import, validation, canonical storage, reopen, and revisions.
5. Minimal editor, conflict-safe saving, history, and published documentation.
6. Scale checkout, verified webhooks, entitlements, and customer portal.
7. Conflict-safe GitHub synchronization.
8. Restricted endpoint execution with SSRF controls, limits, and redaction.
9. Scoped MCP tools with immediate token revocation.
10. Audited one-shot legacy import and cutover.

Campaigns, recipes, extension marketplace, VS Code, broad integrations, AI Coach, push notifications, broad admin tooling, and proxy-product expansion remain out of scope until customer evidence justifies them.

## Quality Gates

- Every requirement maps to an acceptance scenario and task group.
- Cover the happy path, material failure or boundary path, and authorization path.
- Formatting, lint, typecheck, tests, build, and Worker preview pass when applicable.
- No server secret appears in a client bundle.
- Schema changes pass clean-install, prior-snapshot, and retry-safety checks.
- Independent review has no unresolved critical or high-severity finding.
- Tests assert public behavior rather than implementation details.
- No dependency, abstraction, flag, or configuration exists without a current requirement.
- New ideas enter the roadmap instead of expanding an active feature.

## Technical Baseline

Use one strict TypeScript TanStack Start Solid application with Vite, Cloudflare Workers and Workers Assets, Bun commands, Turso through Drizzle and the supported edge libSQL client, prerendered marketing routes, Vitest, focused Worker integration tests, and Playwright only for revenue-critical journeys. Pin stable dependencies and read Worker bindings per request.

Legacy code is never copied wholesale. Port only audited semantics, fixtures, SQL behavior, and framework-free utilities. Rebuild authentication, authorization, persistence, execution, billing, and framework integration. Design the one-shot importer later and avoid dual writes.
