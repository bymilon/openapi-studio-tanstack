# Token-Efficient Codex Delivery Pipeline

Our delivery workflow should make decisions once, save them to disk, and let deterministic tools repeat them without model involvement.

## Current Pipeline

```text
User request
→ Codex reads context
→ Codex researches
→ Codex specifies
→ Codex implements
→ Codex runs validation
→ Codex diagnoses failures
→ Codex deploys preview
→ Codex verifies release
→ CI repeats validation
→ Human reviews outcome
```

The main costs are repeated context loading, broad exploration, duplicated validation reasoning, verbose tool output, and using agents for deterministic work.

## Improved Pipeline

```text
Human supplies outcome
→ Repository files supply durable context
→ Native tools collect exact state
→ Codex resolves only uncertainty
→ Specification freezes decisions
→ Task ledger selects one bounded unit
→ Deterministic tools perform routine execution
→ Tests evaluate known behavior
→ Codex receives only failures
→ Preview workflow deploys and verifies
→ Human approves consequential actions
```

## Eliminate Repeated Context Reconstruction

Store durable context in:

- `AGENTS.md`
- `specs/mission.md`
- `specs/tech-stack.md`
- `specs/roadmap.md`
- The active task ledger
- A session handoff when necessary

After bootstrap, use a compact continuation prompt:

```text
Read AGENTS.md and the active task ledger.
Continue the next unblocked task group.
Follow its acceptance criteria.
Run focused validation.
Update completion evidence.
Stop before deployment or merge.
```

Do not repeat the entire bootstrap prompt after the repository context exists.

## Read Only What the Task Requires

Use targeted discovery:

```text
Question
→ Find the exact symbol, phrase, or path
→ Inspect relevant lines
→ Inspect direct dependencies only
```

Avoid recursive repository reading when an exact search can answer. Do not load completed research, unrelated specifications, old task ledgers, screenshots, or social assets by default.

## Suppress Successful Output

Successful validation normally needs only a compact summary:

```text
format: pass
lint: pass
typecheck: pass
tests: 18/18 pass
browser: 6/6 pass
build: pass
```

Keep full logs on disk or in CI. Send detailed output to the model only when a stage fails.

## Convert Reasoning Into Durable Enforcement

Every reusable decision should become one of:

- A specification
- An acceptance criterion
- A repository rule
- A test
- A validation command
- A task dependency
- A deployment check

Examples:

| Repeated reasoning          | Durable replacement    |
| --------------------------- | ---------------------- |
| What stack do we use?       | `specs/tech-stack.md`  |
| What comes next?            | `specs/roadmap.md`     |
| What is in scope?           | Feature specification  |
| What remains?               | Active task ledger     |
| How do we validate?         | `bun run check`        |
| Does this regression exist? | Automated test         |
| Is this content allowed?    | Automated content scan |
| How do we release?          | Release workflow       |

The first occurrence may require AI reasoning. Repeated occurrences should not.

## Execution Tiers

### Tier 0: No model

Use deterministic tools for:

- Git state and file discovery
- Dependency installation
- Formatting and linting
- Type checking
- Unit and integration tests
- Database validation
- Production builds
- Browser and accessibility checks
- Secret and content scans
- Deployment and health checks
- CI status
- Release metadata

Expected model tokens: zero.

### Tier 1: Narrow model call

Use a tightly scoped call for:

- Classifying one failure
- Summarizing one diff
- Drafting one acceptance criterion
- Reviewing one module
- Converting evidence into structured fields

Provide only relevant fragments and failure output.

### Tier 2: Full reasoning

Reserve deeper reasoning for:

- Product scope
- Architecture choices
- Security boundaries
- Ambiguous defects
- Cross-module changes
- Customer-evidence synthesis
- Release-risk review

### Tier 3: Human decision

Stop model work when the remaining issue is:

- Pricing
- Customer selection
- Product positioning
- Legal or security acceptance
- Production-release authority
- Destructive operations
- Meaningful scope expansion

More tokens cannot resolve an owner decision.

## Token Ladder

Before invoking an agent, ask in order:

1. Can a native command answer it?
2. Can an existing test answer it?
3. Can a repository document answer it?
4. Can a deterministic workflow answer it?
5. Can a narrow AI prompt answer it?
6. Does it require a larger agent investigation?
7. Does it require human judgment?

Start at the cheapest reliable level.

## Minimal Task Context Packet

Every implementation run should receive only:

```text
Repository rules:
AGENTS.md

Product constraints:
Relevant mission and technical-stack sections

Current objective:
One feature specification

Current work:
One active task group

Relevant implementation:
Owned files and direct dependencies

Required proof:
Acceptance criteria and validation commands
```

## Context Routing

| Question             | Load                         |
| -------------------- | ---------------------------- |
| Product purpose      | `specs/mission.md`           |
| Stack decision       | `specs/tech-stack.md`        |
| Current order        | `specs/roadmap.md`           |
| Feature behavior     | Active feature specification |
| Current status       | Active task ledger           |
| Repository commands  | `AGENTS.md`                  |
| Release process      | Delivery workflow document   |
| Historical reasoning | Relevant memo only           |

## Failure-Only Escalation

Send Codex a compact failure envelope:

```text
Stage: browser test
Command: bun run test:e2e
Failed test: compare mobile no-JavaScript
Expected: scrollWidth <= 360
Actual: scrollWidth = 394
Changed files:
- src/styles.css
- tests/browser/compare.test.ts
```

Do not include successful database logs, asset tables, and unrelated passing tests.

## Agent-Team Policy

Multiple agents often increase cost because each agent reloads context and produces overlapping reasoning.

Use another agent only when:

- Work can run concurrently
- File ownership does not overlap
- Output has objective acceptance criteria
- Work avoids blocking the primary agent
- Expected time saved exceeds duplicated context cost

Good delegation gives separate agents independent research, accessibility inspection, or deployment auditing. Do not ask several agents to review the same feature broadly.

Default to one agent for one vertical slice.

## Staged Validation

During implementation:

```text
Changed parser
→ Run parser tests
```

Before commit:

```text
Run unit tests, lint, and type checking
```

Before preview:

```text
Run the complete local gate
```

Before merge:

```text
CI independently runs the complete gate
```

This avoids running expensive browser and database checks after every small edit without weakening release confidence.

## Compact Reporting

Use structured facts instead of narrated command histories:

```text
TG-002 complete
Changed: 3 files
Focused tests: 7 passed
Full gate: not run
Blockers: none
Next: TG-003
```

## Cost Measurement

```text
Total model cost =
input tokens × input rate
+ output tokens × output rate
+ cached input tokens × cached rate
```

Track per task:

- Model calls
- Input, cached-input, and output tokens
- Full-repository scans
- Agent delegations
- Failure-only escalations
- Time to a passing gate
- Cost per merged task group

The business metric is model cost per validated, merged user outcome, not cost per prompt.

## Strict Operating Policy

1. No AI call when a command can answer.
2. No repository-wide scan when exact search can answer.
3. No repeated decision after it is documented.
4. No repeated judgment after it becomes a test.
5. No full logs unless a stage fails.
6. No subagent without independent work and clear ownership.
7. No complete gate after every small edit.
8. No implementation without a bounded task group.
9. No completed historical context loaded by default.
10. No AI-generated explanation unless someone needs it.

## Target Pipeline

```text
One human outcome
→ One routed context packet
→ One bounded Codex reasoning cycle
→ Deterministic implementation and checks
→ Failure-only AI escalation
→ Deterministic preview and CI
→ One human release decision
```

The largest saving does not come from shorter prompts. It comes from removing the model from stable, repeatable work entirely.
