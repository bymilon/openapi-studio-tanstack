# TSK-1 — Delivery Foundation Tasks

| Field        | Value                                                     |
| ------------ | --------------------------------------------------------- |
| Feature      | `specs/features/2026-07-18-delivery-foundation/spec.md`   |
| Branch       | `feat/TSK-1-delivery-foundation`                          |
| Pull request | https://github.com/bymilon/openapi-studio-tanstack/pull/1 |
| Owner        | Main agent                                                |
| Status       | DONE                                                      |
| Updated      | 2026-07-18                                                |

Only this file owns execution status, assignment, dependencies, and evidence for TSK-1.

## TG-001 — Runtime Skeleton

- **Owner:** Main agent
- **Dependencies:** Complete
- **Status:** DONE
- **Outcome:** Minimal TanStack Start Solid modular monolith runs with Bun, targets Cloudflare Workers, and establishes only required vertical-slice boundaries and quality tools.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-010, REQ-011
- **Acceptance:** VAL-001, VAL-002, VAL-003, VAL-008, VAL-009
- **Validation command:** `bun run check`; then time-bounded `bun run preview`, `GET /health`, dependency inspection, and bundle inspection.
- **Evidence:** `bun install --frozen-lockfile`, `bun run check`, and `git diff --check` pass on Bun 1.3.14. The production build prerenders `/` and emits the Worker entry. Built preview smoke checks return `GET /health` 200 with `{"status":"ok"}`, `HEAD /health` 200, `POST /health` 405, and `/` 200. Independent review findings were resolved; no deployment occurred.

## TG-002 — Database Baseline

- **Owner:** Main agent
- **Dependencies:** TG-001
- **Status:** DONE
- **Outcome:** Request-scoped Turso access and a retry-safe baseline migration work against a disposable database.
- **Requirements:** REQ-005, REQ-006
- **Acceptance:** VAL-004
- **Validation command:** `bun run db:check`, `bun run db:smoke`, and `bun run check`.
- **Evidence:** Drizzle ORM 0.45.2, Drizzle Kit 0.31.10, and `@libsql/client` 0.17.4 are pinned. `db:check` validates the generated migration graph. `db:smoke` applies the committed migration twice to in-memory libSQL, then completes a typed insert/query. TanStack's `server-only` guard protects the credential-bearing factory. On 2026-07-18, `db:integration` applied the migration twice and completed the same query against disposable Turso database `oas-tsk1-val-6bfd6949` through `@libsql/client/web`; the one-day token remained in process memory and the database was destroyed immediately afterward.

## TG-003 — Automated Quality Gates

- **Owner:** Main agent
- **Dependencies:** TG-001, TG-002
- **Status:** DONE
- **Outcome:** Local `check` and GitHub Actions enforce the approved build, code-quality, test, and migration gates.
- **Requirements:** REQ-007, REQ-009
- **Acceptance:** VAL-005, VAL-007
- **Validation command:** `bun run check`; then observe the required GitHub pull-request run and a temporary deliberately failing validation commit.
- **Evidence:** Local `bun ci` and `bun run check` pass. The workflow uses SHA-pinned official actions, Bun 1.3.14, Ubuntu 24.04, read-only repository permissions, concurrency cancellation, a ten-minute timeout, no secrets, and no deployment job. PR #1 run `29637211097` passed; deliberate failing commit `51d1be9` was rejected by run `29637241493`; revert commit `072bdb2` restored green run `29637270052`. Independent review found no workflow security blocker.

## TG-004 — Preview and Observability

- **Owner:** Main agent
- **Dependencies:** TG-001, TG-003
- **Status:** DONE
- **Outcome:** A human-approved preview deployment is isolated from production and emits redacted, correlated runtime logs.
- **Requirements:** REQ-008, REQ-009
- **Acceptance:** VAL-006, VAL-007
- **Validation command:** Manual preview acceptance using the pinned Wrangler command and Cloudflare log inspection.
- **Evidence:** `bun run check` and the preview deploy dry run pass. The server emits a generated `x-request-id` and bounded structured logs without paths, queries, headers, bodies, or error details; failures become generic correlated 500 responses. Tests cover successful correlation and sensitive failure containment. The only configured Worker and deploy script target `openapi-studio-tanstack-preview`, with 100% Workers Logs sampling. Independent re-review found no remaining local blocker. A first live attempt proved redirected Vite configuration did not honor an environment-specific name; the newly created generic Worker was deleted, and isolation was simplified to a preview-only top-level configuration. Preview version `67c600d7-78d7-4b95-9fac-b3ff443b7644` is live at `https://openapi-studio-tanstack-preview.pibin.workers.dev`. `/` and `/health` returned 200; response request ID `20c93123-d540-44dd-9802-22f5455fdfd7` appeared in real-time logs, while a temporary secret-marker header value did not.

## Ready Rule

TSK-1 completed its approved implementation and preview-validation scope on 2026-07-18. Merge and any production operation remain separately human-gated. Subagents may perform bounded read-only research and independent review; the main agent is the sole writer and ledger editor.

## Factory Evidence

- **Intake:** User authorized the full build-and-ship loop on 2026-07-18.
- **Risk:** Medium for local scaffold; high for credentials, data, and deployment.
- **Routing:** Main agent writes; independent agents research, review, and validate. Models remain unpinned and are routed by task risk.
- **Retry limit:** Stop and re-triage after two materially similar failed approaches.
- **Metrics:** Record accepted outcome, checks, review findings, retries, interventions, and deployment health—not lines of code or token volume.
