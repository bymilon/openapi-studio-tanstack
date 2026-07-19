# Reusable Product Delivery Workflow

This is the operating system for building future products with human and AI contributors. Each loop must produce one observable improvement that can be shipped, tested, or shown to a customer.

## End-to-End Loop

```text
Evidence
  ↓
Product decision
  ↓
Specification
  ↓
Small task group
  ↓
Implementation
  ↓
Local validation
  ↓
Preview deployment
  ↓
Remote verification
  ↓
Pull request and CI
  ↓
Merge
  ↓
Customer learning
  ↺
```

## 1. Evidence Intake

Start with one uncertainty: what painful problem should we solve next?

Collect evidence from customer conversations, support messages, communities, repositories, competitors, and analytics. Record:

- Who experiences the problem
- What triggers it
- What they currently do
- What the failure costs
- How often it occurs
- Which evidence remains weak

Do not manufacture confidence. Save the evidence memo in `.docs/`.

## 2. Product Decision

Convert the evidence into the smallest testable product bet. State the user, painful job, proposed outcome, and strict exclusions.

For OpenAPI Studio, the first bet was local comparison of two OpenAPI contracts for selected high-confidence breaking changes. Accounts, persistence, billing, collaboration, GitHub integration, and a full editor were excluded.

This boundary prevents overfitting and premature infrastructure.

## 3. Specification-Driven Development

Before implementation, create `specs/features/YYYY-MM-DD-feature-name/spec.md` answering:

- Who is this for?
- What job are they completing?
- What inputs are accepted?
- What result is produced?
- What failures must be handled?
- What privacy boundary applies?
- What is deliberately unsupported?
- How will success be validated?

The specification is the shared contract for product, design, engineering, QA, and agents.

## 4. Task Decomposition

Break the feature into dependency-ordered task groups, commonly:

1. Evidence and contract
2. Domain logic
3. User workflow
4. Release validation

Each group needs an owner, status, dependencies, acceptance conditions, validation command, and completion evidence. Store the ledger in `.tasks/YYYY-MM-DD-TSK-N-feature-TASKS.md`.

The ledger is operational truth. Chat history is not.

## 5. Developer Experience

The developer loop is:

```text
Read repository rules
→ Read specification
→ Select one task group
→ Make the smallest coherent change
→ Format
→ Lint
→ Type-check
→ Run focused tests
→ Run the complete gate
```

Good DX provides one package manager, one complete validation command, exact dependencies, fast focused tests, reproducible setup, clear module boundaries, and actionable failures. In this repository, `bun run check` is the release contract.

## 6. Agent Experience

Good AX gives agents enough durable context to work safely:

- `AGENTS.md` for repository-specific rules
- Specifications instead of conversational scope
- Small task groups with explicit acceptance criteria
- Flat vertical slices with clear ownership
- Non-interactive validation commands
- Tests that prove behavior
- Human approval boundaries for consequential actions

An agent should be able to trace:

```text
Mission
→ Technical constraints
→ Roadmap phase
→ Feature specification
→ Task group
→ Changed files
→ Tests
→ Deployment evidence
```

## 7. Validation Pipeline

| Layer                | Purpose                                       |
| -------------------- | --------------------------------------------- |
| Formatting           | Prevent meaningless style variation           |
| Linting              | Detect suspicious or invalid patterns         |
| Type checking        | Verify structural correctness                 |
| Unit tests           | Prove domain behavior                         |
| Database checks      | Verify schema and migrations                  |
| Production build     | Detect bundling and runtime-boundary failures |
| Browser tests        | Verify real user workflows                    |
| Accessibility checks | Detect usability barriers                     |
| Mobile checks        | Detect overflow and responsive failures       |

The full gate must pass locally before deployment.

## 8. Release Pipeline

```text
Clean local gate
→ Commit
→ Deploy preview
→ Verify remote route and assets
→ Open pull request
→ Run independent CI
→ Review evidence
→ Merge
→ Confirm main-branch CI
```

A successful deployment command does not prove the release works. Inspect the deployed URL and exercise its critical workflow.

## 9. Customer-Learning Loop

Shipping creates evidence. It does not prove demand.

For each qualified team, track whether they:

| Signal                           | Meaning                                  |
| -------------------------------- | ---------------------------------------- |
| Provide a real contract          | The problem has enough trust and urgency |
| Complete the workflow unaided    | The product is understandable            |
| Question a result                | Accuracy requirements are emerging       |
| Return with another contract     | Repeat value may exist                   |
| Request CI or GitHub integration | Workflow expansion may be justified      |
| Agree to pay                     | Commercial validation has begun          |

Observe hesitation, expected behavior, false positives, missed results, existing spending, and production blockers. Do not pitch while learning.

## 10. Agent-Team Roles

Use multiple agents only when work is independent and objectively reviewable.

- Research agent: gathers and classifies evidence
- Product agent: drafts scope and exclusions
- Implementation agent: owns one vertical slice
- Test agent: attacks acceptance criteria and edge cases
- Release agent: validates preview, CI, and deployment state
- Primary agent: owns decisions, integration, and truthfulness

Do not assign several agents to the same files. That creates conflicts, duplicated reasoning, and unclear ownership.

## Rules for Interns and Future Projects

1. Begin with evidence, not features.
2. Write the product boundary before implementation.
3. Build one vertical user outcome at a time.
4. Keep task status on disk.
5. Treat tests as executable acceptance criteria.
6. Run focused checks while working and the full gate before release.
7. Verify the deployed system, not only the deployment command.
8. Never call a preview validated without customer behavior.
9. Add infrastructure only when the current loop requires it.
10. Make every release reduce a customer uncertainty.

The core principle is simple: specifications control scope, automated gates control quality, previews control release risk, and customer behavior controls the roadmap.
