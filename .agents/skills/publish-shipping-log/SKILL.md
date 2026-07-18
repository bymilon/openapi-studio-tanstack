---
name: publish-shipping-log
description: Create and package evidence-led OpenAPI Studio Shipping Log posts for LinkedIn or X, including numbered written entries, truthful metrics, and generated editorial hero images. Use when asked to publish, draft, continue, or package the build-in-public journey, shipping journal, founder log, progress update, or next Shipping Log entry.
---

# Publish Shipping Log

Create one truthful, written field note and its social hero. Keep this skill repository-local. Never install or modify a global skill.

## Workflow

1. Read `AGENTS.md`, `.docs/shipping-log-series.md`, and `.docs/design-partner-operating-ledger.md` completely.
2. Inspect `git log`, the active pull request, CI state, and relevant shipped artifacts. Use them only as evidence. Do not change product code.
3. Select the next three-digit log number. Do not reuse a published number.
4. Draft the post using the established structure:
   - log number
   - ISO date
   - current product stage and MRR
   - what happened
   - observation
   - evidence
   - next uncertainty
   - `Log closed.`
5. Keep the post between 120 and 250 words. Write in first person. Use exact counts. Never imply traction, customers, revenue, or released functionality without evidence.
6. Save the post as `.docs/shipping-log-NNN-YYYY-MM-DD.md`.
7. Generate one LinkedIn landscape hero with the built-in `$imagegen` skill and `image_gen` tool. Do not use an API-key fallback unless the user explicitly requests it.
8. Copy the selected generated image into `.docs/shipping-log-NNN-linkedin-hero.png`. Preserve the original generated file.
9. Inspect the image with `view_image`. Verify all required text, hierarchy, crop safety, and visual quality. Make one targeted regeneration when a material defect exists.
10. Validate the post and asset, then report their paths. Commit, push, merge, deploy, or publish externally only when the user authorizes that action.

## Editorial Contract

- Lead with an operational fact, not an engagement hook.
- Separate observation from interpretation.
- Name failures without manufactured vulnerability.
- End with the next uncertainty, not a generic audience question.
- Never expose prospect identities or private conversation details.
- Never use em dashes in any content or image text.
- Use no more than four relevant hashtags.
- Do not mention Avatar in published output.

## Hero Contract

Use a premium archival field-note design:

- LinkedIn landscape ratio near `1.91:1`
- warm uncoated paper and restrained halftone texture
- near-black ink with forest-green accent
- Swiss editorial grid and strong safe margins
- large `SHIPPING LOG NNN` identifier
- exact strings for project, date, stage, MRR, and `@milonspace`
- only metrics supported by the post

Avoid movie references, neon sci-fi interfaces, gradients, glassmorphism, generic AI symbols, fake dashboards, decorative clutter, watermarks, and extra prose.

## Validation

Run the smallest checks that prove the package:

```powershell
rg -n "—" .docs/shipping-log-NNN-YYYY-MM-DD.md
git diff --check
bun -e "import sharp from 'sharp'; const m=await sharp('.docs/shipping-log-NNN-linkedin-hero.png').metadata(); console.log(m.width, m.height, m.width/m.height)"
```

The em-dash scan must return no matches. Confirm the post word count is within range and the image ratio is between `1.89` and `1.93`.
