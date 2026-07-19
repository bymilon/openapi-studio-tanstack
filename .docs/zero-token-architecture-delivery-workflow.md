# Zero-Token Architecture for Product Delivery

## Core Idea

Do not spend AI tokens on work that deterministic tools can perform faster, cheaper, and more reliably.

Zero-Token Architecture is not a formal architecture standard. It is Kelsey Hightower's intentionally provocative name for established automation: shell commands, scripts, cron jobs, Makefiles, CI pipelines, configuration management, tests, and human reasoning.

The goal is not zero AI. The goal is zero unnecessary AI.

References:

- [Kelsey Hightower's original framing](https://www.linkedin.com/posts/kelsey-hightower-849b342b1_announcing-the-zero-token-architecture-instead-activity-7440773267134701568-Z-o9)
- [Zero Token Architecture](https://www.zerotokenarchitecture.com/)
- [PlatformCon session](https://platformcon.com/sessions/zta-zero-token-architecture-nyc)
- [The Register's conference report](https://www.theregister.com/on-prem/2026/04/08/rebrand-automation-as-zero-token-architecture-to-master-ai/5221999)

## Choose the Correct Executor

| Work type                        | Best executor                              |
| -------------------------------- | ------------------------------------------ |
| Exact, repetitive, deterministic | Script or native tool                      |
| Validation with known rules      | Formatter, linter, compiler, or test       |
| Scheduled deterministic work     | CI, cron, or workflow                      |
| Retrieval with an exact location | File search or database query              |
| Product judgment                 | Human                                      |
| Ambiguous investigation          | AI agent                                   |
| Cross-domain synthesis           | AI agent                                   |
| Novel implementation             | Human plus AI agent                        |
| Consequential external action    | Deterministic workflow plus human approval |

## Hybrid Architecture

```text
Human intent
    ↓
AI interprets ambiguity
    ↓
Specification records the decision
    ↓
Deterministic tools perform execution
    ↓
Automated gates verify the result
    ↓
AI investigates novel failures
    ↓
Human approves consequential actions
```

## Apply It to the Delivery Workflow

### 1. Bootstrap durable context once

Codex creates or reviews:

- `AGENTS.md`
- Mission
- Technical constraints
- Roadmap
- Validation contract
- Task-ledger format

Codex then reads these files instead of repeatedly asking the user to restate the project. Durable context reduces tokens and prevents drift.

### 2. Use AI to resolve uncertainty

AI is appropriate for:

- Synthesizing customer evidence
- Finding contradictions
- Proposing the smallest product bet
- Identifying missing decisions
- Drafting feature specifications
- Diagnosing unfamiliar failures

AI is unnecessary for deciding whether formatting passed or a test returned exit code zero.

### 3. Convert reasoning into deterministic artifacts

Every reusable AI decision should become one of:

- A specification
- An acceptance criterion
- A test
- A repository rule
- A validation command
- A task dependency
- A deployment check

The first execution may require reasoning. Repeated executions should not.

Example:

```text
First occurrence:
AI discovers that mobile overflow matters.

Repeated validation:
A browser test checks that body width does not exceed 360 pixels.
```

### 4. Use AI for exceptions

The successful path should be deterministic:

```text
Change
→ Format
→ Lint
→ Type-check
→ Test
→ Build
→ Preview
→ CI
```

The failure path should escalate progressively:

```text
Gate fails
→ Capture the exact failure
→ Classify it as known or novel
→ Apply the documented remedy when known
→ Ask AI to diagnose only when novel
```

## Pipeline Layers

### Layer 1: Deterministic foundation

These should run without AI:

- Repository and Git-state inspection
- Dependency installation
- Formatting and linting
- Type checking
- Unit and integration tests
- Database checks
- Production builds
- Browser and accessibility tests
- Secret and content-rule scans
- Preview deployment
- Health checks
- CI status checks

### Layer 2: Agent reasoning

Use Codex for:

- Evidence synthesis
- Feature boundaries
- Architecture tradeoffs
- Novel failure diagnosis
- Risk-focused review
- Missing-test analysis
- Customer-learning assets

### Layer 3: Human control

Humans own:

- Mission and target customer
- Pricing and product claims
- Destructive operations
- Production deployment
- Paid infrastructure
- Security exceptions
- Commercial decisions

## Token Ladder

Before invoking an agent, ask these questions in order:

1. Can a native command answer it?
2. Can an existing test answer it?
3. Can a repository document answer it?
4. Can a deterministic workflow answer it?
5. Can a narrow AI prompt answer it?
6. Does it require a larger agent investigation?
7. Does it require human judgment?

Start at the cheapest reliable level.

## OpenAPI Studio Example

| Activity                       | Executor                                   |
| ------------------------------ | ------------------------------------------ |
| Research public pain           | AI plus human judgment                     |
| Select the product slice       | AI recommendation plus human authorization |
| Record scope                   | Specification                              |
| Parse and compare contracts    | Deterministic product logic                |
| Verify behavior                | Unit tests                                 |
| Verify browser workflow        | Playwright                                 |
| Verify accessibility           | Axe                                        |
| Verify mobile overflow         | Width assertion                            |
| Build release                  | Vite                                       |
| Publish preview                | Wrangler                                   |
| Confirm remote route and asset | HTTP inspection                            |
| Validate pull request          | GitHub Actions                             |
| Approve shipping               | Human authorization                        |

The agent does not reason about whether tests passed. The test runner establishes that fact.

## Designing a Repeatable Pipeline

For each repeated activity, define:

- Trigger
- Inputs
- Deterministic operation
- Expected output
- Failure condition
- Retry policy
- Escalation point
- Required approval
- Audit evidence

Example release contract:

```text
Trigger: feature implementation completed
Input: clean feature branch
Operation: complete validation gate
Success: every command exits successfully
Failure: preserve logs and identify the failing layer
Escalation: AI diagnoses only the failed layer
Approval: human authorizes preview deployment
Evidence: commit, test results, preview version, and CI URL
```

## When Not to Automate

Do not build a pipeline when:

- The activity has happened only once
- The process is changing rapidly
- Human judgment is the product
- Failure cannot be detected objectively
- Automation costs more than repetition
- The action has irreversible consequences without review

Perform the workflow manually first. Automate it after it becomes stable and repetitive.

## Intern Rule

> AI discovers the process. Specifications record it. Scripts repeat it. Tests police it. Humans own the consequences.

Zero-Token Architecture makes AI a focused reasoning layer above reliable engineering automation, not an expensive universal middleman.
