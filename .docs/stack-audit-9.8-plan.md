# Stack Audit: Path from 8.0 to 9.8

## Verdict

Keep the stack narrow:

**TanStack Start Solid + Cloudflare Workers + Workers Assets + Bun + Turso/libSQL + Drizzle + Valibot + Oxlint + Oxfmt.**

Do not add Hono during the delivery foundation. TanStack Start already owns application routing and server functions. Reconsider Hono only for a separately justified public API or MCP HTTP surface.

A 9.8 rating means the architecture is coherent, reproducible, secure at its boundaries, and proven on the production runtime. It does not mean adding more tools. A 10.0 cannot be claimed before real production traffic, recovery exercises, and customer evidence.

## Current Rating

| Area | Current | Target |
| --- | ---: | ---: |
| Runtime architecture | 9.0 | 9.8 |
| Validation boundaries | 8.0 | 9.8 |
| Developer and agent experience | 9.0 | 9.8 |
| Simplicity | 8.0 | 9.8 |
| Repository consistency | 5.0 | 10.0 |
| Demonstrated production readiness | 3.0 | 9.5 |
| Overall | **8.0** | **9.8** |

## Blockers Before Application Work

### 1. Reconcile Git, Specification, and Ledger

The repository is on `main` at commit `9f5b340 feat/TSK-1-delivery-foundation`, but the feature specification is `SPEC_DRAFT`, its ledger is `BACKLOG`, and the ledger says no branch exists. These cannot all be true.

Before scaffolding:

1. Review and explicitly approve or reject the TSK-1 contract.
2. If approved, change the spec to `SPEC_APPROVED`, create `feat/TSK-1-delivery-foundation`, and move only TG-001 to `READY`.
3. Correct the existing commit description to represent the SDD foundation, not completed feature delivery, if it has not been pushed.
4. Keep `main`, the feature contract, and the ledger truthful after every transition.

### 2. Remove Process Duplication

Use these sources only:

- `AGENTS.md` for durable repository rules.
- Mission, stack, and roadmap specifications for product constraints.
- One feature `spec.md` for its approved contract.
- One task ledger for mutable execution state and evidence.
- Git and CI for implementation history.

Treat `.docs/sdd-codex-build-plan.md` as historical context. Use `PLANS.md` only when a feature spans multiple sessions or subsystems. Delete `.tasks/.gitkeep` now that the directory contains a ledger. Do not add ADRs, hooks, generators, or SDD skills before repeated use proves a need.

### 3. Lock the Tool Boundaries

- **Oxfmt:** the only formatter. Do not install Prettier.
- **Oxlint:** correctness, suspicious, import, Vitest, and JSX accessibility checks. Do not enable React-specific rules for Solid.
- **TypeScript:** `tsc --noEmit` remains authoritative. Do not rely on Oxlint's experimental type checker.
- **Valibot:** validate environment configuration and every external request, form, webhook, MCP input, and untrusted database JSON value.
- **Drizzle Valibot:** use `drizzle-orm/valibot` for persistence schemas. Never expose generated database schemas as public API contracts.
- **Hono:** excluded until an approved feature demonstrates that a separate HTTP framework removes more code than it adds.

Required command contract:

```json
{
  "format": "oxfmt",
  "format:check": "oxfmt --check",
  "lint": "oxlint --deny-warnings",
  "typecheck": "tsc --noEmit",
  "check": "bun run format:check && bun run lint && bun run typecheck && bun test && bun run build"
}
```

## Evidence Required for 9.8

### Reproducibility

- Pin stable direct dependencies and commit `bun.lock`.
- `bun install --frozen-lockfile` succeeds from a clean checkout.
- Local, CI, and Cloudflare builds use the same scripts.
- Generated routes, Worker types, and SQL migrations reproduce without unexplained diffs.

### Runtime Correctness

- Use the official Cloudflare Vite integration for TanStack Start.
- Prove prerendered marketing routes and dynamic application routes coexist in one Worker deployment.
- Read secrets and bindings only in server/request scope.
- Run integration tests inside the Cloudflare Workers test runtime, not only Bun's runtime.
- Confirm unsupported Node APIs and server-only modules cannot enter the client bundle.

### Data Integrity

- Keep Drizzle schema and generated SQL migrations in one workflow.
- Test migrations on an empty database, the previous schema snapshot, and a retry.
- Use database constraints and transactions for invariants; validation alone is insufficient.
- Define revision-based compare-and-swap before collaborative spec saving.
- Document backup, restore, and rollback procedures before storing customer data.

### Security

- Centralize authentication and authorization policy before protected features.
- Test tenant isolation and role denial, not only successful access.
- Validate and cap all request bodies and uploaded specifications.
- Redact credentials, authorization headers, cookies, tokens, and document bodies from logs.
- Keep deployment, secrets, billing, database migration, and production mutation behind human approval.
- Complete a threat review before endpoint execution, GitHub writes, billing, or MCP access.

### Delivery Quality

- Every requirement maps to a black-box acceptance scenario and recorded evidence.
- CI gates formatting, linting, typechecking, tests, build, and migration checks.
- An independent reviewer checks the complete diff after writes stop.
- Preview deployment is isolated from production data and credentials.
- Rollback is rehearsed for every stateful or externally visible feature.

### Commercial Reality

- Marketing ships before broad product parity and records source-to-contact conversion.
- Each product phase defines one activation or revenue hypothesis.
- Billing is delivered immediately after the smallest sellable editing/publishing workflow.
- Defer legacy parity unless interviews, usage, conversion, or retention support it.

## Start Gate

TSK-1 may begin only when all are true:

- The product owner explicitly approves its feature specification.
- Git/spec/ledger state is reconciled.
- Oxlint, Oxfmt, Valibot, Drizzle, and no-Hono decisions are recorded in `specs/tech-stack.md` and TSK-1.
- TG-001 has an owner and exact validation commands.
- No cloud resource, secret, production database, deployment, push, or merge is implicitly authorized.

Meeting this gate raises the design to approximately **9.0/10**. The remaining score must be earned through clean-install, CI, Worker preview, migration, security, rollback, and production evidence—not documentation.
