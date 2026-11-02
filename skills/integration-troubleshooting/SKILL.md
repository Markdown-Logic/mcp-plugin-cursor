---
name: integration-troubleshooting
description: Diagnose Markdown Logic MCP transport, authorization, discovery, rendering, and source-evidence refusals without exposing secrets or changing credentials.
compatibility: Applies to the authenticated Markdown Logic MCP service. Client protocol and skills support vary; use the actual discovery response and error.
metadata:
  author: Markdown Logic
  version: "0.1.0"
  audience: authenticated
---

# Integration troubleshooting

Record the intended server origin, client/version, selected transport/revision, method/tool, HTTP status, error code, and safe request ID. Exclude tokens, passwords, authorization headers, private source bytes, and webhook secrets. A resource URI is scoped to its originating server; identical URI strings across servers are unrelated.

Use the authenticated service's stateless JSON-only Streamable HTTP endpoint and the client's actual supported negotiation path. Legacy clients initialize; modern `2026-07-28` clients use discovery and required per-request metadata/header binding. Legacy HTTP+SSE sessions are not implemented. Do not advertise a session ID or mutate the tool catalogue after a skill/resource read.

Distinguish authorization failures from empty results: 401 can indicate invalid/expired/revoked credentials; scope refusals, bound-team limits, account status, and project policy can prevent otherwise valid access. Discovery and skills cannot grant new scopes. Diagnose using safe, read-only calls appropriate to the existing credential; do not create credentials, grants, registrations, or repeated authorization attempts from this workflow.

Preserve actual `PLAN_RESTRICTION`, `CONFIG`, `CONFLICT`, limit, unsupported-profile, and parse-failure reasons. A missing converter/search binding is not an empty successful operation. A stale revision needs a fresh read and reconciliation, not a retry loop. Honor `Retry-After` and stop repeated failing work.

For skills and importer compatibility, load [protocol profiles](references/protocol-profiles.md). Give the user the narrow supported correction and remaining uncertainty; do not claim desktop/live-edge support from a synthetic fixture.
