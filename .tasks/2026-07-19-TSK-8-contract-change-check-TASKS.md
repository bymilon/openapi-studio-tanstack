# TSK-8: Contract Change Check

**Overall status:** IN_PROGRESS

## TG-001: Evidence and contract

- **Owner:** Main agent
- **Status:** DONE
- **Acceptance:** Public evidence, scope, privacy boundary, supported checks, limitations, and validation contract are recorded.
- **Evidence:** `.docs/2026-07-19-public-openapi-pain-evidence.md` and the approved feature specification.

## TG-002: Comparison core

- **Owner:** Main agent
- **Status:** DONE
- **Dependencies:** TG-001
- **Acceptance:** JSON and YAML parsing plus supported change classification pass focused unit tests without network access.
- **Validation:** `bun run test`
- **Evidence:** Seven test files and 18 unit tests pass, including focused parser and comparison coverage.

## TG-003: Browser workflow

- **Owner:** Main agent
- **Status:** DONE
- **Dependencies:** TG-002
- **Acceptance:** `/compare` delivers local file selection, samples, decision-oriented results, privacy disclosure, responsive layout, and accessible states.
- **Validation:** `bun run test:e2e`
- **Evidence:** Six browser tests pass across the marketing and comparison routes, including accessibility, narrow viewport, malformed input, oversized input, and no-JavaScript coverage.

## TG-004: Release validation

- **Owner:** Main agent
- **Status:** IN_PROGRESS
- **Dependencies:** TG-003
- **Acceptance:** Full checks, preview deployment, browser inspection, pull request, CI, and rollback record pass.
- **Validation:** `bun run check`
- **Evidence:** The local full gate passes. Preview version `c4b254a2-b80a-445c-baff-822e5cba705f` serves `/compare` with the new route and assets. Pull request and CI remain.
