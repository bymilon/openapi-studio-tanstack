# Demand and Conversion

| Field           | Value                           |
| --------------- | ------------------------------- |
| Feature ID      | TSK-2                           |
| Roadmap outcome | Phase 1 — Demand and Conversion |
| Status          | SPEC_APPROVED                   |
| Owner           | Product owner                   |
| Updated         | 2026-07-18                      |

## Problem and Outcome

OpenAPI Studio has no revenue, qualified demand evidence, or credible conversion path. Building accounts and editor functionality now would optimize an unproven product. This slice must explain one urgent workflow, state a price hypothesis, and make it easy for a qualified API team to request a design-partner conversation.

The page positions OpenAPI Studio as a safe workflow for editing, reviewing, and publishing OpenAPI contracts without YAML mistakes or documentation drift. It measures qualified intent without pretending the unfinished product is self-service.

## Requirements

- **REQ-001:** The prerendered home page addresses small API teams maintaining OpenAPI 3.0/3.1 and leads with a specific workflow outcome rather than a feature inventory.
- **REQ-002:** The page explains the current problem, proposed workflow, intended customer, boundaries, and evidence-backed reasons to trust the approach.
- **REQ-003:** The offer states a design-partner price hypothesis of **$49 per workspace per month after the pilot**, with pilot terms confirmed in conversation and no checkout yet.
- **REQ-004:** The primary CTA is “Apply to become a design partner”; it opens a pre-addressed email containing short qualification prompts for team, current workflow, recurring pain, specification size, and willingness to pay.
- **REQ-005:** A secondary CTA allows prospects to inspect the public GitHub repository; neither CTA implies immediate product access.
- **REQ-006:** Conversion measurement records only page view and named CTA-click events. It must not record email addresses, free text, OpenAPI documents, full URLs, or fingerprinting identifiers.
- **REQ-007:** The page is responsive, keyboard operable, readable without JavaScript, and meets WCAG 2.2 AA checks relevant to this page.
- **REQ-008:** Marketing UI uses `@tailwindcss/vite` with a small token set in CSS. No component library, custom design-system package, animation library, or Hono dependency is introduced.
- **REQ-009:** Marketing remains a flat `src/features/marketing/` slice; the route is a thin adapter and no sales behavior enters platform or OpenAPI core modules.
- **REQ-010:** The repository documents a manual design-partner operating loop and records funnel evidence without storing prospect personal data in Git.

## Non-Goals

- Authentication, waitlist accounts, product access, editor demos, checkout, billing, or workspace provisioning.
- A lead database, CRM integration, newsletter, chat widget, cookie banner, session replay, A/B testing platform, or attribution framework.
- Multiple personas, competitor comparison pages, SEO content, testimonials that do not exist, or fabricated usage claims.
- Hono, an application API, or generalized analytics abstraction.

## Interfaces and Boundaries

- `/` is prerendered and contains the complete marketing page.
- The design-partner CTA uses the approved public contact email `pitechae@gmail.com` and a fixed `mailto:` template. The address is public product content, not a secret.
- Analytics uses bounded first-party events written to existing Cloudflare Workers Logs. The page remains fully functional when analytics is blocked.
- Funnel evidence belongs in an ignored local operating ledger or approved external system; Git contains only the empty template and aggregate, non-identifying results.
- Tailwind utilities stay inside marketing components; repeated visual tokens belong in `src/styles.css`.

## Failure, Privacy, and Accessibility Behavior

- CTA behavior is a normal link with visible contact fallback; it does not depend on client hydration.
- Analytics failure cannot block content or CTA navigation.
- No form accepts or persists prospect data in this phase.
- Focus indicators, semantic landmarks, heading order, contrast, reduced motion, and narrow-screen layouts are explicitly validated.
- Claims must describe implemented or planned outcomes accurately; “design partner” and pilot status remain visible near the CTA.

## Validation

- **VAL-001 → REQ-001, REQ-002, REQ-003:** Content review confirms one buyer, one painful workflow, one offer, transparent pilot status, and the $49 price hypothesis.
- **VAL-002 → REQ-004, REQ-005:** Browser tests confirm both CTAs have correct destinations, qualification copy, accessible names, and no false access promise.
- **VAL-003 → REQ-006:** Network and bundle review confirms only approved page-view and CTA events exist and no prohibited payload field is emitted.
- **VAL-004 → REQ-007:** Automated accessibility checks, keyboard review, JavaScript-disabled review, and mobile/desktop screenshots pass.
- **VAL-005 → REQ-008, REQ-009:** Dependency and boundary review confirms Tailwind is the only new UI tool and marketing remains one flat slice with a thin route.
- **VAL-006 → REQ-010:** The operating-ledger template defines weekly visitors, qualified replies, conversations, design partners, willingness-to-pay evidence, objections, and next decision.
- **VAL-007:** `bun run check` and the approved preview smoke test pass; current `main` behavior remains recoverable by reverting the feature commit.

## Commercial Gate

Phase 2 should not begin merely because the page ships. The initial evidence target is 20 qualified conversations, five design partners, and two explicit willingness-to-pay confirmations. If outreach produces no repeated urgent problem, revise positioning before adding identity or editor scope.

## Rollout and Rollback

Deploy only to the existing preview Worker first. After content and analytics evidence are reviewed, a separately approved production/custom-domain operation may follow. Rollback reverts the marketing commit and redeploys the previous Worker version; no prospect database or billing state exists.

## Approved Decisions

- Positioning: safe OpenAPI editing, review, and publishing without contract corruption or documentation drift.
- Buyer: small API teams and API-first software companies maintaining OpenAPI 3.0/3.1.
- Offer: design-partner pilot followed by a $49/workspace/month price hypothesis.
- Conversion: qualified `mailto:` contact flow, not a lead database.
- UI: add `@tailwindcss/vite`; do not add Hono or a component library.
- Analytics: first-party bounded events in existing Cloudflare Workers Logs; no cookie, vendor SDK, or tracking token.
- Public design-partner contact: `pitechae@gmail.com`.

## Approval Gate

The product owner approved the positioning, offer, contact destination, qualification prompts, Tailwind usage, and first-party analytics approach on 2026-07-18. Implementation is authorized. Preview deployment, merge, and production/custom-domain operations remain separately gated.
