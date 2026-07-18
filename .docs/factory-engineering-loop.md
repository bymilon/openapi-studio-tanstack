# Repo-Native Software Factory

## Operating Loop

```text
intake -> triage -> specify -> implement -> review -> verify -> ship -> monitor
```

The task ledger and Git are the control plane. CI provides deterministic gates. Do not build a custom orchestration platform until a measured recurring bottleneck justifies it.

## Roles and Routing

- The main agent owns intent, task state, the only write stream, integration, and final synthesis.
- Read-only subagents perform independent research, threat analysis, review, and validation.
- Use fast reasoning for deterministic inventory and log classification; balanced reasoning for mechanical implementation and validation; strongest reasoning for architecture, security, data, ambiguous failures, and final review.
- Do not pin model names in repository configuration. Change routing only from comparative evidence.
- Stop after two materially similar failures and return to triage or specification.

## Evidence and Metrics

Every completed task records commands, results, review findings, retries, interventions, residual risk, and post-release health. Optimize accepted customer value per total cost under reliability and security constraints. Do not optimize lines of code, commit count, token use, or automation percentage.

Track lead time, first-pass acceptance, verification pass rate, rework, escaped defects, rollback, human intervention reason, and cost per accepted change. Compare tasks within similar risk classes.

## Safety and Anti-Overfitting

- Human approval remains mandatory for ambiguous product intent, secrets, destructive actions, production migrations, deployment, rollback, merge, and residual high risk.
- Agents never silently rewrite their own controls. Version workflow changes, validate them on varied tasks, and roll back regressions.
- Add a durable rule only after repeated evidence. Change one prompt, tool, or routing variable at a time.
- Prefer compilers, tests, schema validation, diff review, smoke checks, and telemetry over agent confidence.
- Keep credentials least-privileged and stage-specific. Monitoring may create follow-up work but never mutate production automatically.

This adopts the useful loop from Warp's factory-engineering articles while rejecting vendor lock-in, premature multi-harness abstraction, autonomous recursive self-modification, and throughput vanity metrics.
