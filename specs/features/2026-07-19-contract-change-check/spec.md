# Contract Change Check

**Status:** APPROVED  
**Owner:** Main agent  
**Roadmap:** Public-evidence product slice before Phase 2

## Outcome

A visitor can compare two local OpenAPI 3.x JSON or YAML documents and understand whether the revision contains a supported high-confidence breaking change before sharing any contract with a server.

## Requirements

1. Provide a dedicated `/compare` route linked from the marketing page.
2. Accept one baseline file and one revised file, each limited to 2 MB and `.json`, `.yaml`, or `.yml`.
3. Parse files entirely in the browser. Do not transmit, persist, log, or analyze contract contents server-side.
4. Require an OpenAPI 3.x root version and a paths object in both documents.
5. Detect and explain these high-confidence changes:
   - operation removed
   - required request parameter added
   - successful response removed
   - schema or property type changed
   - response property removed
   - request property made required
   - supported security requirement removed from an operation
6. Group results into breaking changes and review notes, with method, path, location, and plain-language impact.
7. Show a clear no-supported-breaking-changes result without claiming full compatibility.
8. Provide sample contracts so the workflow is useful without user data.
9. Work with keyboard navigation, mobile layouts, reduced motion, and without client-side JavaScript for the explanatory shell. Comparison requires JavaScript and must say so.

## Non-Goals

- Full OpenAPI validation or exhaustive compatibility analysis
- External `$ref` retrieval or dereferencing
- Swagger 2.0, AsyncAPI, callbacks, webhooks, links, discriminator analysis, or JSON Schema composition semantics
- Accounts, saved comparisons, GitHub integration, CI configuration, billing, or AI-generated judgments

## Privacy and Failure Behavior

- File contents remain in browser memory and are cleared on reload.
- Reject unsupported extensions, files over 2 MB, malformed JSON or YAML, missing OpenAPI 3.x versions, and missing paths with actionable messages.
- Do not fetch external references. Report unresolved `$ref` coverage as a review note.
- Never render specification text as HTML.

## Validation

- Unit tests cover every supported breaking-change category and direction.
- Browser tests cover sample comparison, malformed input, privacy copy, keyboard use, mobile layout, accessibility, and the no-JavaScript shell.
- The production bundle contains no server upload path for contract contents.
- `bun run check` passes and the Cloudflare preview is inspected before merge.

## Rollout

Deploy to preview first. Roll back by reverting the route, feature slice, marketing link, and YAML dependency. No data migration is required.
