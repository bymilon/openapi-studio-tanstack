# Codex CLI Fresh Repository Bootstrap

Use these prompts to establish the same delivery system in a new repository without prematurely selecting architecture or implementing features.

## Prompt 1: Bootstrap the Repository

```text
You are bootstrapping a new production repository using specification-driven development.

Do not implement product code yet.

First, inspect the current workspace, Git state, existing files, available tools, and repository instructions. Preserve existing work. Do not overwrite files without checking whether they already exist.

Create the minimum durable project context needed for human and AI contributors.

Create:

AGENTS.md
- Repository-specific operating instructions
- Source, test, documentation, specification, and task locations
- Formatting, linting, type-checking, testing, and build commands
- Architecture and dependency rules
- Security and configuration boundaries
- Human approval boundaries for deployments, merges, destructive actions, billing, and external mutations
- Rules for keeping documentation truthful and current

specs/mission.md
- Target customer
- Painful job
- Product promise
- Business objective
- Evidence currently available
- Assumptions requiring validation
- Explicit non-goals
- Product principles

specs/tech-stack.md
- Runtime and language
- Application framework
- Database and persistence
- Deployment platform
- Testing strategy
- Formatting and linting
- Observability
- Security boundaries
- Dependency-selection criteria
- Architecture constraints
- Record undecided choices instead of guessing

specs/roadmap.md
- High-level implementation order
- Use very small, independently shippable phases
- Each phase must deliver one observable user or operational outcome
- Include entry criteria, exit criteria, validation, dependencies, and exclusions
- Do not create speculative phases beyond what current evidence supports

.docs/reusable-product-delivery-workflow.md
- Evidence intake
- Product decision
- Specification workflow
- Task decomposition
- Developer experience loop
- Agent experience loop
- Validation pipeline
- Preview and release pipeline
- Customer-learning loop

.tasks/README.md
- Define the task-ledger format
- Ownership, priority, dependencies, status, acceptance criteria, validation, and completion evidence
- State that task files, not chat history, are the progress source of truth

Also create a concise README.md only if one does not already exist. It must explain the project's current state truthfully and provide verified setup commands.

Operating rules:

1. Begin with evidence, not features.
2. Ask for missing product decisions only when they materially change the foundation.
3. Do not invent customers, requirements, benchmarks, integrations, or business validation.
4. Prefer a modular monolith and flat feature-based vertical slices unless evidence requires another architecture.
5. Use exact dependency versions.
6. Prefer native platform capabilities before dependencies.
7. Keep implementation, tests, and ownership boundaries easy for coding agents to trace.
8. Define one complete local validation command.
9. Keep phases small enough for one focused pull request.
10. Do not deploy, merge, create paid resources, or mutate external systems without explicit approval.
11. Avoid em dash characters in all product content and documentation.
12. Avoid unnecessary abstractions, infrastructure, and speculative flexibility.

Before writing:

- Report what already exists.
- Identify conflicts or missing decisions.
- Propose the exact files you will create or modify.
- Save the bootstrap plan under `.docs/`.
- Then proceed with documentation only.
- Finish by showing the resulting repository structure, unresolved decisions, and the recommended first roadmap phase.
```

## Prompt 2: Specify the Next Roadmap Phase

```text
Inspect `specs/roadmap.md` and select the next incomplete phase.

Do not implement it yet.

Read:

- AGENTS.md
- specs/mission.md
- specs/tech-stack.md
- specs/roadmap.md
- .docs/reusable-product-delivery-workflow.md

Create a feature branch named:

feat/TSK-{N}-{short-feature-name}

Create:

specs/features/YYYY-MM-DD-feature-name/spec.md
.tasks/YYYY-MM-DD-TSK-{N}-{feature-name}-TASKS.md

The feature specification must define:

- User and painful job
- Evidence supporting the work
- User-visible outcome
- Functional requirements
- Failure states
- Privacy and security boundaries
- Accessibility requirements
- Explicit exclusions
- Acceptance criteria
- Validation strategy
- Release and rollback conditions

Divide implementation into small dependency-ordered task groups. Each task group must have:

- Owner
- Priority
- Status
- Dependencies
- Acceptance conditions
- Validation command
- Completion evidence

Use multiple agents only for independent, objectively reviewable work. Assign clear file ownership and avoid parallel edits to the same files.

Save the plan before implementation. Stop after presenting the specification, task ledger, risks, and proposed validation pipeline.
```

## Prompt 3: Implement the Approved Feature

```text
Implement the approved feature specification and remaining task groups.

Work through one task group at a time. Keep the task ledger current after every completed group.

For each group:

1. Read its acceptance criteria.
2. Make the smallest coherent change.
3. Add focused tests.
4. Run focused validation.
5. Record completion evidence.
6. Continue only if validation passes.

After implementation:

1. Run formatting.
2. Run linting.
3. Run type checking.
4. Run unit and integration tests.
5. Run the production build.
6. Run browser and accessibility tests where applicable.
7. Run the repository's complete validation command.
8. Scan public content for prohibited em dash characters.
9. Review the diff for unrelated changes, weak claims, secrets, dead code, and unnecessary dependencies.

Do not merge or deploy yet. Report the completed outcome, validation evidence, remaining risks, and exact release candidate.
```

## Prompt 4: Ship the Release Candidate

```text
Ship the validated release candidate.

Before release:

- Confirm the working tree and branch.
- Confirm the complete local gate passes.
- Confirm no secrets or unrelated changes are included.
- Commit with a concise conventional message.
- Push the feature branch.
- Deploy only to the approved preview environment.
- Verify the remote health endpoint, route, assets, mobile layout, accessibility, and critical user workflow.
- Open a pull request with scope, exclusions, validation evidence, preview URL, and rollback instructions.
- Wait for independent CI.
- Merge only after all required checks pass.
- Confirm main-branch CI after merge.

A successful deployment command is not remote verification. Exercise the deployed product.

Do not deploy to production, configure a custom domain, create paid resources, or expand scope unless explicitly authorized.

Finish with:

- Live preview URL
- Pull request
- Merge commit
- CI result
- Shipped user outcome
- Known limitations
- Next customer-learning action
```

## Workflow Summary

```text
Bootstrap
→ Evidence
→ Specification
→ Tasks
→ Implementation
→ Local gate
→ Preview
→ Remote verification
→ Pull request
→ CI
→ Merge
→ Customer learning
```
