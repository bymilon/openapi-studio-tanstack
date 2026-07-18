# TSK-1 — Delivery Foundation Tasks

| Field | Value |
| --- | --- |
| Feature | `specs/features/2026-07-18-delivery-foundation/spec.md` |
| Branch | `feat/TSK-1-delivery-foundation` |
| Pull request | — |
| Owner | Main agent |
| Status | IN_PROGRESS |
| Updated | 2026-07-18 |

Only this file owns execution status, assignment, dependencies, and evidence for TSK-1.

## TG-001 — Runtime Skeleton

- **Owner:** Main agent
- **Dependencies:** Complete
- **Status:** IN_PROGRESS
- **Outcome:** Minimal TanStack Start Solid modular monolith runs with Bun, targets Cloudflare Workers, and establishes only required vertical-slice boundaries and quality tools.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-010, REQ-011
- **Acceptance:** VAL-001, VAL-002, VAL-003, VAL-008, VAL-009
- **Validation command:** `bun run format:check && bun run lint && bun run typecheck && bun test && bun run build`; then time-bounded `bun run preview`, `GET /health`, dependency inspection, and bundle inspection.
- **Evidence:** —

## TG-002 — Database Baseline

- **Owner:** Unassigned
- **Dependencies:** TG-001
- **Status:** BACKLOG
- **Outcome:** Request-scoped Turso access and a retry-safe baseline migration work against a disposable database.
- **Requirements:** REQ-005, REQ-006
- **Acceptance:** VAL-004
- **Validation command:** To be locked after the supported driver and migration CLI are pinned.
- **Evidence:** —

## TG-003 — Automated Quality Gates

- **Owner:** Unassigned
- **Dependencies:** TG-001, TG-002
- **Status:** BACKLOG
- **Outcome:** Local `check` and GitHub Actions enforce the approved build, code-quality, test, and migration gates.
- **Requirements:** REQ-007, REQ-009
- **Acceptance:** VAL-005, VAL-007
- **Validation command:** `bun run check`
- **Evidence:** —

## TG-004 — Preview and Observability

- **Owner:** Unassigned
- **Dependencies:** TG-001, TG-003
- **Status:** BACKLOG
- **Outcome:** A human-approved preview deployment is isolated from production and emits redacted, correlated runtime logs.
- **Requirements:** REQ-008, REQ-009
- **Acceptance:** VAL-006, VAL-007
- **Validation command:** Manual preview acceptance using the pinned Wrangler command and Cloudflare log inspection.
- **Evidence:** —

## Ready Rule

TSK-1 was approved on 2026-07-18. TG-001 is the only active write group. Subagents may perform bounded read-only research and independent review; the main agent is the sole writer and ledger editor.

## Factory Evidence

- **Intake:** User authorized the full build-and-ship loop on 2026-07-18.
- **Risk:** Medium for local scaffold; high for credentials, data, and deployment.
- **Routing:** Main agent writes; independent agents research, review, and validate. Models remain unpinned and are routed by task risk.
- **Retry limit:** Stop and re-triage after two materially similar failed approaches.
- **Metrics:** Record accepted outcome, checks, review findings, retries, interventions, and deployment health—not lines of code or token volume.
