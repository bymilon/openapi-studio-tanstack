# Codex SDD Prompt Library

Use one prompt per coherent outcome. Replace bracketed values, then let Codex inspect the repository before it asks product questions.

## 1. Bootstrap the Constitution

```text
Goal
Establish the minimum durable product and engineering guidance for this repository.

Context
Read AGENTS.md and the saved SDD build plan. This is a fresh OpenAPI Studio rebuild. The legacy repository is read-only evidence, not a code source.

Constraints
Interview me only about unresolved product intent or irreversible technical decisions. Challenge unsupported assumptions. Create or reconcile specs/mission.md, specs/tech-stack.md, and specs/roadmap.md. Keep roadmap entries small, ordered outcomes. Record explicit non-goals. Do not scaffold application code, add dependencies, or invent process files.

Done when
The three documents agree, have no duplicated status, and are decision-complete for the first roadmap outcome. Report remaining decisions instead of guessing.
```

## 2. Specify the Next Outcome

```text
Goal
Turn the first unblocked roadmap outcome into one approved, implementable feature contract.

Context
Read AGENTS.md, specs/mission.md, specs/tech-stack.md, specs/roadmap.md, and relevant repository code. Select the first outcome whose dependencies are complete.

Constraints
Do not branch or code yet. Interview me only about material product decisions repository evidence cannot answer. Challenge scope. Create specs/features/YYYY-MM-DD-feature-name/spec.md with problem, evidence, REQ-NNN requirements, non-goals, observable behavior, interfaces, data/security implications, VAL-NNN acceptance scenarios, rollout, and approved decisions. Create one .tasks/YYYY-MM-DD-TSK-N-feature-name-TASKS.md ledger with three to seven task groups. Every task must map to requirements and validation. The ledger alone owns status and assignment.

Done when
No material decision is unresolved, every requirement is testable, every task has dependencies and an exact acceptance check, and I have approved the contract. Only then create feat/TSK-N-feature-name.
```

## 3. Plan Agent-Team Execution

```text
Goal
Make the approved feature safe to execute with a bounded agent team.

Context
Read the approved feature spec, its task ledger, AGENTS.md, and affected code. Inspect callers and tests before assigning work.

Constraints
Assign one owner per ready task group. Use subagents only for independent, bounded work. Prefer parallel read-only discovery and review. One writer owns a worktree; parallel writers require separate worktrees and non-overlapping files. The main agent owns decisions, integration, ledger updates, and final verification. Do not create another TODO file or copy task status elsewhere.

Done when
Every READY group has an owner, satisfied dependencies, mapped REQ/VAL IDs, affected boundary, and exact validation command. Report scope gaps instead of inventing requirements.
```

## 4. Deliver One Ready Task Group

```text
Goal
Complete exactly one READY task group: [TG-NNN].

Context
Read AGENTS.md, the approved feature spec, the active task ledger, and all affected callers and tests.

Constraints
Claim the task in the ledger. Implement the smallest complete vertical change. Do not expand scope, weaken tests, add speculative abstractions, or change an approved contract silently. Run focused acceptance checks and inspect the diff. Stop on an unresolved product decision, security/data-risk ambiguity, conflicting edit, or two failed approaches.

Done when
The mapped acceptance checks pass, the diff has been self-reviewed, an independent reviewer has reported no unresolved critical/high finding, and exact evidence is recorded by the orchestrator in the task ledger. Do not merge or deploy.
```

## 5. Review and Prepare to Ship

```text
Goal
Determine whether [branch] is ready for human merge and deployment approval.

Context
Review the complete diff against AGENTS.md, the approved feature spec, task ledger, and base branch.

Constraints
Prioritize correctness, authorization, tenant isolation, data integrity, Worker compatibility, accessibility, regressions, missing acceptance coverage, and unnecessary complexity. Report findings first with severity, file/line evidence, and REQ/VAL IDs. The reviewer must not fix its own findings. After fixes stop, run all declared validation and exercise the preview acceptance scenarios.

Done when
All checks pass, every requirement has evidence, no critical/high finding remains, rollback notes exist where needed, and the ledger is READY_TO_MERGE. Stop for human approval; do not push, merge, deploy, migrate production data, or mutate cloud resources.
```

## Promotion Rule

After three merged features, review failures and repeated manual steps. Package only stable behavior as `sdd-bootstrap`, `sdd-feature`, and `sdd-deliver` repository skills. Remove superseded prompt text so the skills become the only workflow source.
