# TSK-3 — Landing Redesign

**Overall status:** IN_PROGRESS

## TG-001 — Product and Design Context

- **Owner:** Main agent
- **Status:** IN_PROGRESS
- **Acceptance:** `PRODUCT.md`, `DESIGN.md`, official benchmark, and critique define a truthful non-generic direction.
- **Evidence:** Official Apple, Google, GitHub, Stripe, Cloudflare, and Linear surfaces were reviewed for hierarchy, proof, CTA, trust, and responsive patterns without copying trade dress. Impeccable v3.9.1 context, brand register, palette, and independent critique informed `PRODUCT.md` and `DESIGN.md`. Live mode is configured for the TanStack root document; no CSP was detected.

## TG-002 — Product-Led Landing Surface

- **Owner:** Main agent
- **Dependencies:** TG-001
- **Status:** DONE
- **Acceptance:** Responsive page implements REQ-001 through REQ-007 without new UI dependencies.
- **Evidence:** The product owner rejected the true-white/cobalt pass as generic. The replacement uses a distinctive redline identity, a custom contract-path mark, locally hosted Martian Grotesk, an immediate breaking-change painkiller, and a clearly labelled review prototype. Desktop and 390px mobile full-page screenshots have been inspected. No UI dependency was added.

## TG-003 — Release Validation

- **Owner:** Main agent
- **Dependencies:** TG-002
- **Status:** IN_PROGRESS
- **Acceptance:** REQ-008 and REQ-009 validation, independent review, preview acceptance, and CI pass.
- **Evidence:** The third visual direction is implemented. After product-owner review exposed an oversized desktop fold, the type scale, hero spacing, grid balance, and downstream display sizes were tightened. Exact fold evidence at `.docs/TSK-3-fold-2048x1000.png` keeps the CTA and prototype visible without scrolling; full-page desktop and mobile evidence is also current. Accessibility, truthfulness, no-JavaScript, and narrow-screen checks pass. Updated preview approval remains.

## Ready Rule

Outreach remains paused until TG-003 is done and the product owner explicitly approves the redesigned preview. Merge and production remain separately gated.
