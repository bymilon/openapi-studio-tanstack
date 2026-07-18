# Public OpenAPI Pain Evidence

## Decision

Ship a browser-local OpenAPI change check. A user selects a baseline and revised JSON or YAML contract, then receives a concise report of high-confidence breaking changes.

## Evidence

- A June 2026 FastAPI discussion describes accidental response-field changes becoming more likely as AI tooling increases development pace. The recommended control is comparing generated OpenAPI contracts in CI: https://www.reddit.com/r/FastAPI/comments/1tvfwxr/prevent_unintentional_breaking_api_changes_in/
- A February 2026 discussion reports repeated review work caused by inconsistent OpenAPI documents and SDK generator failures: https://www.reddit.com/r/node/comments/1r76obi/i_was_tired_of_fixing_inconsistent_openapi_specs/
- A January 2026 discussion repeatedly identifies synchronization between implementation and OpenAPI as the central requirement: https://www.reddit.com/r/node/comments/1q5imqi/openapi_static_or_dynamic/
- GitHub documents removed operations, renamed parameters or response fields, newly required parameters, type changes, enum removals, validation changes, and authentication changes as consumer-breaking categories: https://docs.github.com/en/rest/about-the-rest-api/breaking-changes
- The active oasdiff issue backlog shows that exhaustive semantic comparison is difficult, including OpenAPI 3.1 composition, multi-type schemas, formats, defaults, and semantic wording: https://github.com/oasdiff/oasdiff/issues
- Current oasdiff documentation separates definite errors, potential warnings, and informational changes, supporting a severity-based decision surface: https://github.com/oasdiff/oasdiff/blob/main/docs/BREAKING-CHANGES.md

X search produced weak direct pain evidence. It showed OpenAPI being used as agent tooling input, but did not produce a stronger buyer signal than Reddit and GitHub. Do not inflate that channel's contribution.

## Scope Choice

Start with high-confidence structural breaks that can be explained deterministically. Do not claim exhaustive compatibility analysis. Keep contracts in memory and avoid accounts, persistence, remote URLs, GitHub installation, or CI integration.
