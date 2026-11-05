---
name: api-integration-planner
description: Plan an API integration from contracts or provider guides, design staged tests, and maintain source-bound implementation evidence and troubleshooting in Markdown Logic.
compatibility: Requires authenticated Markdown Logic MCP. Discover actual tools, scopes and supported profiles; optional UI is host-dependent.
metadata:
  author: Markdown Logic
  version: "0.1.0"
  audience: authenticated
---

# API integration planner

Connect user outcome → operation/message → source evidence → implementation task → proposed test → observed result. Usually the goal and API/docs are sufficient to begin. Infer runtime, sandbox, volume, sensitivity and constraints from context; ask only when a missing detail materially changes the plan. Label optional unknowns as assumptions or open decisions. Never ask for secrets in a project.

Read relevant original OpenAPI, Swagger, AsyncAPI, provider guides, quick starts and changelogs. A machine-readable specification is optional. Plan only operations needed for the goal. Read [contract interpretation](references/contracts.md) for dialects, references and provider-vs-client guarantees, and [source reading](references/source-reading.md) for repository/endpoint captures. MDL search is stored-content search, not open-web discovery. `inspect_document` does not validate OpenAPI or AsyncAPI.

For a requested new project, create the smallest useful integration brief/plan, validation plan and source register; add an evidence/issue log when actual development results exist. Combine documents for small integrations and avoid empty scaffolding. Map auth/scopes/environments, schemas/transforms, pagination, errors, bounded retries, idempotency, limits, versioning, deprecation and costs where documented. Distinguish contract constraints, provider guidance, observation and proposed client policy. Unknown limits stay unknown.

Use [staged validation and test records](references/validation.md). Each test identifies requirement/operation, source, scenario/input, expected behavior, environment/fixture, permitted effects/cleanup and status. Proposed, not run, passed, failed and blocked are distinct. Actual results require timestamp, code/contract revision and evidence location. Never mark a proposed test passed from a plausible design.

Update the plan and affected tests as implementation evidence arrives. A changed contract can make previous results stale. For troubleshooting, compare the contract, intended client behavior and smallest sanitized actual exchange; distinguish hypothesis from demonstrated mismatch and choose the next discriminating test. A timed-out write may already have succeeded; reconcile its outcome before retrying. Do not create recurring checks or repeat live/paid operations merely because the skill runs.

This skill supports planning, manual source interpretation, test design and authorized MDL project maintenance. Full schema/reference validation, executable tests, sandbox writes, brokers, credentials, CI and monitoring require separately available capabilities and authorization. A linked server URL does not authorize requests. Properties are optional; Markdown plans/logs remain sufficient. Use Project artifacts for guards and handoff. MDL connection failures use [connection recovery](references/connection-recovery.md), distinct from diagnosis of the user's API.
