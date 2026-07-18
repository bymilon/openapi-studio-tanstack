# TSK-1 — Delivery Foundation Tasks

| Field | Value |
| --- | --- |
| Feature | `specs/features/2026-07-18-delivery-foundation/spec.md` |
| Branch | Not created — specification approval required |
| Pull request | — |
| Owner | Main agent |
| Status | BACKLOG |
| Updated | 2026-07-18 |

Only this file owns execution status, assignment, dependencies, and evidence for TSK-1.

## TG-001 — Runtime Skeleton

- **Owner:** Unassigned
- **Dependencies:** Specification approval
- **Status:** BACKLOG
- **Outcome:** Minimal TanStack Start Solid modular monolith runs with Bun, targets Cloudflare Workers, and establishes only required vertical-slice boundaries and quality tools.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-010, REQ-011
- **Acceptance:** VAL-001, VAL-002, VAL-003, VAL-008, VAL-009
- **Validation command:** To be locked from generated package scripts before work starts.
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

After explicit specification approval, create `feat/TSK-1-delivery-foundation`, replace placeholder validation commands with exact pinned commands, assign TG-001 to the main implementation agent, and move only TG-001 to `READY`. Subagents may perform bounded read-only research and independent review; TG-001 has one writer.
