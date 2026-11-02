# Local Cursor validation — 2026-11-02

## Current follow-up: registration and request inspection

With explicit owner permission, the local package from commit `95d08d6` was tested in installed Cursor **3.27.22** on macOS after the service compatibility update. The existing test copy was reused without overwriting another installation or creating a separate static OAuth client.

Cursor Customize recognized the plugin, both MCP connections and seven skills. The anonymous connection showed **1 tool, 3 resources enabled**. The private connection showed **Needs authentication**, and its Authenticate action opened **Sign in to Markdown Logic — to continue to Cursor** in the browser.

The actual displayed authorization request had:

| Field | Observed value |
| --- | --- |
| Authorization endpoint | `https://auth.markdownlogic.com/oauth/authorize` |
| Response type | `code` |
| PKCE method | `S256` |
| Selected callback | `https://www.cursor.com/agents/mcp/oauth/callback` |
| Resource | `https://mcp.markdownlogic.com/` |
| Scopes | `documents:read documents:write projects:read releases:read` |

No unrelated admin, notification, key-management or git scope was requested. The trailing slash in the resource is the client's URL serialization of the MCP origin.

Read-only metadata reconciliation found two public client records created by Cursor during initial connection and its Authenticate action. Both registered the documented HTTPS callback and `http://localhost:8787/callback`, had no client secret, and carried the four MCP scope ceilings with authorization-code/refresh grants. Neither had any user authorization tickets at inspection. No automated retry or client mutation was performed after that observation. Identifiers, registration-management tokens, PKCE challenge and OAuth state are omitted from this public record.

The test stopped at **sign-in, before the consent screen or grant**. No credentials were entered, user access approved, document read/written, conversion performed, or generated file saved. The local test copy remains installed for the owner; its pending sign-in does not confer document access. The authorized test demonstrates normal registration and the requested authorization parameters, not complete authenticated installation acceptance.

## Earlier build and callback refusal

The initial local test used Cursor **3.19.7**, build `90de2327392570a5f5f625c656c6749d228e6430`, with package commit `4088b3c`. It loaded **MCPs 2 / Skills 7** and connected the anonymous server, but its dynamic registration included the legacy callback:

```text
cursor://anysphere.cursor-mcp/oauth/callback
```

That registration was refused by the then-active service's HTTPS/loopback-only policy before consent. Its temporary copy was verified unchanged and removed. A later service compatibility change was handled separately from this public integration repository. This follow-up used Cursor 3.27.22, whose observed registration included only the documented HTTPS/loopback callbacks; it is not a live retest of the older build's legacy callback. No claim is made that upgrading alone fixes every client's OAuth behavior.

## Remaining acceptance

Complete an owner-approved sign-in/consent and selected-document read before claiming authenticated acceptance. Test output-byte saving separately with permission. Packaged files and local reference paths pass static integrity checks; no private agent workflow or mutation was exercised. Marketplace review, terms and submission remain separate owner actions. Integration source is MIT with retained upstream notices.
