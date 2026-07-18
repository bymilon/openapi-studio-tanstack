# Product Roadmap

This roadmap orders outcomes, not deadlines. Start a phase only when its predecessor meets the approved feature specification and validation contract. Each phase must ship as one or more small, usable vertical slices.

## Phase 0 — Delivery Foundation

Establish repository governance, SDD task tracking, CI, preview deployment, observability, and a Turso migration smoke test. Prove the application can build and run on Cloudflare before product work.

## Phase 1 — Demand and Conversion

Ship prerendered marketing, clear positioning and pricing, conversion analytics, and a waitlist or contact path. Capture evidence before expanding the product surface.

## Phase 2 — Identity and Tenancy

Add secure authentication, sessions, workspaces, invitations, and centralized role-based authorization with audit events.

## Phase 3 — OpenAPI Core

Import JSON/YAML, validate OpenAPI 3.0/3.1, store a canonical document, and support reliable reopen and revision history.

## Phase 4 — Edit and Publish

Deliver the smallest useful editor, conflict-safe saving, revision review, and published documentation derived from the canonical contract.

## Phase 5 — Paid Plan

Add Scale checkout, verified and idempotent billing webhooks, server-enforced entitlements, and a customer billing portal. Validate activation-to-paid conversion and retention.

## Phase 6 — Workflow Integrations

Add GitHub installation, pull, and conflict-safe commits. Then add safe endpoint execution with SSRF defenses, limits, redaction, and retention controls.

## Phase 7 — Agent Access

Provide scoped MCP tokens with immediate revocation and a minimal set of read, update, and run tools. Treat tool authorization as the same policy boundary as the web application.

## Phase 8 — Migration and Cutover

Build an audited, retry-safe, one-shot legacy importer; rehearse migration; reconcile counts and hashes; then perform a reversible cutover without dual writes.

## Phase 9 — Evidence-Gated Parity

Consider remaining legacy capabilities only when customer interviews, usage, revenue, or retention establish a concrete need. Every addition requires its own approved feature specification.
