# TSK-2 — Demand and Conversion Tasks

| Field        | Value                                                 |
| ------------ | ----------------------------------------------------- |
| Feature      | `specs/features/2026-07-18-demand-conversion/spec.md` |
| Branch       | `feat/TSK-2-demand-conversion`                        |
| Pull request | —                                                     |
| Owner        | Main agent                                            |
| Status       | SPEC_REVIEW                                           |
| Updated      | 2026-07-18                                            |

Only this file owns execution status, assignment, dependencies, and evidence for TSK-2.

## TG-001 — Positioning and Offer

- **Owner:** Product owner
- **Dependencies:** TSK-1, approved TSK-2 specification
- **Status:** WAITING_APPROVAL
- **Outcome:** Lock one buyer, painful workflow, design-partner offer, contact destination, qualification prompts, and truthful claims.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004
- **Acceptance:** VAL-001, VAL-002
- **Validation command:** Product content review against the approved specification.
- **Evidence:** —

## TG-002 — Marketing Page

- **Owner:** Unassigned
- **Dependencies:** TG-001
- **Status:** BACKLOG
- **Outcome:** Accessible prerendered marketing page communicates the approved offer and conversion path.
- **Requirements:** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-007, REQ-008, REQ-009
- **Acceptance:** VAL-001, VAL-002, VAL-004, VAL-005
- **Validation command:** `bun run check` plus responsive, keyboard, and JavaScript-disabled browser review.
- **Evidence:** —

## TG-003 — Measurement and Operating Ledger

- **Owner:** Unassigned
- **Dependencies:** TG-001, approved analytics decision
- **Status:** BACKLOG
- **Outcome:** Minimal privacy-conscious funnel events and a weekly aggregate evidence loop support positioning decisions.
- **Requirements:** REQ-006, REQ-010
- **Acceptance:** VAL-003, VAL-006
- **Validation command:** Event payload inspection and operating-ledger review.
- **Evidence:** —

## TG-004 — Preview Acceptance

- **Owner:** Unassigned
- **Dependencies:** TG-002, TG-003
- **Status:** BACKLOG
- **Outcome:** The complete conversion slice passes quality, accessibility, truthfulness, privacy, and preview checks.
- **Requirements:** All
- **Acceptance:** VAL-007 and all prior validation evidence
- **Validation command:** `bun run check`, browser acceptance, and approved preview smoke test.
- **Evidence:** —

## Ready Rule

No implementation task group is ready until the product owner approves the feature specification and supplies the public contact email. Analytics remains separately gated until its provider and public configuration are approved.
