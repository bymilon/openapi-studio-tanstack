# Public Evidence Product Slice Plan

## Objective

Use current public evidence from Reddit, X, and GitHub to select, build, validate, and ship one working OpenAPI painkiller before customer interviews.

## Constraints

- Build one complete vertical slice, not an editor platform.
- Use public complaints, issue discussions, and active repositories as directional evidence. Do not treat engagement as willingness to pay.
- Keep uploads local to the browser unless persistence is required by the selected workflow.
- Do not add authentication, billing, workspaces, collaboration, or speculative infrastructure.
- Preserve OpenAPI semantics and report uncertainty honestly.

## Execution

1. Collect recent pain signals from Reddit and X plus recurring issues and workflows from GitHub.
2. Rank pains by frequency, urgency, buyer relevance, implementation cost, and fit with the current positioning.
3. Write the selected feature specification, validation contract, and task ledger before implementation.
4. Build the smallest end-to-end workflow on a feature branch.
5. Test valid, invalid, breaking, non-breaking, no-JavaScript, mobile, privacy, and accessibility behavior as applicable.
6. Deploy a preview, inspect it in a browser, open a pull request, pass CI, and ship only the validated slice.

## Decision Rule

Prefer a workflow that produces an immediate decision from two real OpenAPI documents. Reject ideas that require accounts, persistent customer data, third-party integrations, or broad editing before value is visible.
