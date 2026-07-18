# Execution Plans

Use an execution plan for work that spans multiple task groups, sessions, or subsystems. The plan explains how to deliver an approved feature; the feature spec defines what must be true, and the task ledger remains the only execution-status record.

An execution plan must be self-contained and include:

- the approved feature spec and task-ledger paths;
- the intended outcome and explicit non-goals;
- relevant architecture, boundaries, and existing behavior;
- ordered task groups with dependencies and safe stopping points;
- interfaces, migrations, security, failure handling, and rollback implications;
- exact validation commands and requirement-to-evidence mapping.

Write steps as observable outcomes rather than vague activities. Preserve working behavior between task groups. Record newly discovered product decisions in the feature spec and pause for approval; record execution progress and evidence only in the task ledger.

Before handoff, reconcile the plan with the final diff, run all declared validation, list unresolved risks, and leave the ledger in an accurate state. A plan is complete only when another agent can execute it without inventing product or architecture decisions.
