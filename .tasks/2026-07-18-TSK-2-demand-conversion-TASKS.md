# TSK-2 — Demand and Conversion Tasks

| Field        | Value                                                     |
| ------------ | --------------------------------------------------------- |
| Feature      | `specs/features/2026-07-18-demand-conversion/spec.md`     |
| Branch       | `feat/TSK-2-demand-conversion`                            |
| Pull request | https://github.com/bymilon/openapi-studio-tanstack/pull/2 |
| Owner        | Main agent                                                |
| Status       | DONE                                                      |
| Updated      | 2026-07-18                                                |

Only this file owns execution status, assignment, dependencies, and evidence for TSK-2.

## TG-001 — Positioning and Offer

- **Owner:** Product owner
- **Dependencies:** TSK-1, approved TSK-2 specification
- **Status:** DONE
- **Outcome:** Lock one buyer, painful workflow, design-partner offer, contact destination, qualification prompts, and truthful claims.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004
- **Acceptance:** VAL-001, VAL-002
- **Validation command:** Product content review against the approved specification.
- **Evidence:** Product owner approved the positioning, revised $29/workspace/month hypothesis, `pitechae@gmail.com` contact flow, qualification prompts, Tailwind, and first-party Cloudflare event logging on 2026-07-18.

## TG-002 — Marketing Page

- **Owner:** Main agent
- **Dependencies:** TG-001
- **Status:** DONE
- **Outcome:** Accessible prerendered marketing page communicates the approved offer and conversion path.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-007, REQ-008, REQ-009
- **Acceptance:** VAL-001, VAL-002, VAL-004, VAL-005
- **Validation command:** `bun run check` plus responsive, keyboard, and JavaScript-disabled browser review.
- **Evidence:** The prerendered page implements the approved buyer, problem, pilot offer, $29 hypothesis, RFC-safe qualified mailto flow, and truthful pilot terms. Tailwind 4.3.3 is the only UI system. Desktop and 390px screenshots were reviewed; Chromium passes axe, keyboard order, JavaScript-disabled, CTA, metadata, and horizontal-overflow checks. GitHub confirms the linked repository is public.

## TG-003 — Measurement and Operating Ledger

- **Dependencies:** TG-001, approved analytics decision
- **Owner:** Main agent
- **Status:** DONE
- **Outcome:** Minimal privacy-conscious funnel events and a weekly aggregate evidence loop support positioning decisions.
- **Requirements:** REQ-006, REQ-010
- **Acceptance:** VAL-003, VAL-006
- **Validation command:** Event payload inspection and operating-ledger review.
- **Evidence:** Strict Valibot events allow only page view, design-partner click, and repository click. The endpoint requires same-origin browser metadata, rejects unsupported content types and extra fields, and streams at most 64 bytes. Tests cover valid, schema-invalid, cross-origin, oversized, and unsupported requests. Analytics failure cannot block CTA behavior. `.docs/design-partner-operating-ledger.md` stores aggregates only.

## TG-004 — Preview Acceptance

- **Owner:** Main agent
- **Dependencies:** TG-002, TG-003
- **Status:** DONE
- **Outcome:** The complete conversion slice passes quality, accessibility, truthfulness, privacy, and preview checks.
- **Requirements:** All
- **Acceptance:** VAL-007 and all prior validation evidence
- **Validation command:** `bun run check`, browser acceptance, and approved preview smoke test.
- **Evidence:** Local and GitHub `bun run check` pass with 12 unit tests and three Playwright journeys. Preview version `543c1a07-c472-4a8f-9660-c17c681eecb5` returns status 200, displays the approved $29 price, includes $29 in the qualified mailto prompt, and contains no stale $49 copy. On prior security-acceptance version `ba39e0e4-32e3-4f39-8dca-d57104e2044e`, a valid design-partner event returned 204 and matched Workers Logs under request ID `f0d06d9e-cc01-4755-96b0-28b3f7b44ce1`; an extra-field marker payload returned 400 and the marker was absent from captured logs. The price-only revision did not change the event endpoint.

## Product Decision Resolved

The product owner authorized public visibility on 2026-07-18. GitHub reports `bymilon/openapi-studio-tanstack` as public, and the CTA explicitly says “View source on GitHub.”

## Ready Rule

TSK-2 completed its approved implementation and preview-validation scope on 2026-07-18. Merge and production/custom-domain operations remain separately gated.
