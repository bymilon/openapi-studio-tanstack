# TSK-3 — Landing Redesign

**Overall status:** IN_PROGRESS

## TG-001 — Product and Design Context

- **Owner:** Main agent
- **Status:** DONE
- **Acceptance:** `PRODUCT.md`, `DESIGN.md`, official benchmark, and critique define a truthful non-generic direction.
- **Evidence:** Official Apple, Google, GitHub, Stripe, Cloudflare, and Linear surfaces were reviewed for hierarchy, proof, CTA, trust, and responsive patterns without copying trade dress. Impeccable v3.9.1 context, brand register, palette, and independent critique informed `PRODUCT.md` and `DESIGN.md`. Live mode is configured for the TanStack root document; no CSP was detected.

## TG-002 — Product-Led Landing Surface

- **Owner:** Main agent
- **Dependencies:** TG-001
- **Status:** DONE
- **Acceptance:** Responsive page implements REQ-001 through REQ-007 without new UI dependencies.
- **Evidence:** The page now uses a true-white/cobalt instrument system, a concise outcome-led hero, a clearly labelled sample OpenAPI review artifact, distinct workflow and evidence structures, explicit current/non-current boundaries, and a compact five-team founding offer. The qualified mailto and bounded conversion events are unchanged. No dependency was added. Desktop and 390px mobile full-page screenshots were inspected after the first implementation pass.

## TG-003 — Release Validation

- **Owner:** Main agent
- **Dependencies:** TG-002
- **Status:** IN_PROGRESS
- **Acceptance:** REQ-008 and REQ-009 validation, independent review, preview acceptance, and CI pass.
- **Evidence:** Local `bun run check` passes with 12 unit/security tests and three Playwright journeys covering axe, keyboard order, JavaScript-disabled content, CTA truthfulness, and narrow-screen overflow. The Impeccable detector returns zero findings. Full-page evidence is preserved at `.docs/TSK-3-redesign-desktop.png`, `.docs/TSK-3-redesign-mobile.png`, and `.docs/TSK-3-redesign-200-percent.png`. Independent review found no P0 design blocker and confirmed that every original P0/P1 visual defect is resolved. Preview and CI acceptance remain.

## Ready Rule

Outreach remains paused until TG-003 is done and the product owner explicitly approves the redesigned preview. Merge and production remain separately gated.
