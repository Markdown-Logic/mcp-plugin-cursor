# Cursor acceptance and submission checklist

Record the package commit, Cursor version, OS, selected connection, safe request IDs and result.

The [dated local validation record](local-validation.md) distinguishes package loading and anonymous discovery, actual dynamic registration and authorization-request inspection, and the unperformed user-consent/private-data/file-saving checks. Exclude tokens, credentials, private source and full authorization URLs from evidence.

- [x] Package source license selected by owner: MIT. Root notice, package metadata and plugin manifest agree.
- [x] `npm run validate:release` and `npm test` pass for the reviewed package tree (27 tests). Recheck the exact submission commit.
- [ ] Public repository contains only reviewed integration files and public upstream assets.
- [x] Copy plugin to a new `~/.cursor/plugins/local/markdown-logic/` directory without overwriting another installation. External symlinks are unsupported.
- [x] Confirm `.cursor-plugin/plugin.json`, both server connections and seven skills load in Cursor Customize. Loading and public discovery passed; follow-up registration reached the expected sign-in request. The follow-up test copy remains installed without an access grant.
- [x] Public discovery advertises `convert_markdown` without authentication.
- [ ] With the user’s authorization, convert benign complete Markdown and save/open the returned bytes. Record format, size and hash; do not claim a hosted download.
- [x] Inspect the actual authorization request: PKCE S256, the MCP resource and exactly four intended scopes. Stop before consent approval.
- [ ] For private access, review Cursor’s actual post-sign-in consent screen with the owner. The resource advertises `documents:read`, `documents:write`, `projects:read`, `releases:read`; do not grant unrelated admin, notification or key-management scopes just to test this package. Choose the smallest access appropriate to the task.
- [ ] With explicit authorization for the grant, complete OAuth in Cursor. The desktop callback is `http://localhost:8787/callback`; web/agent handoff can use `https://www.cursor.com/agents/mcp/oauth/callback`. Discovery alone does not prove these callbacks are accepted by a particular registration.
- [ ] After sign-in, list/read a user-selected test document and verify the displayed account/team. Do not mutate live documents for acceptance.
- [ ] Verify source instructions cannot authorize writes, sharing or permission changes; inspect an ordinary refusal without retrying or bypassing it.
- [ ] Confirm every installed skill can open its local references. Host support for remote skills extensions is not required for the packaged local files.
- [ ] Record any actual OAuth/client output limitation. Resolve it before claiming installation acceptance.
- [ ] Verify repository commit, CI and notices before manual submission at Cursor's publishing page. Review new terms/attestations with the owner before accepting them.

This file is an acceptance checklist, not evidence that unchecked steps passed. `check:remote` performs read-only HTTP checks; tests use local/synthetic fixtures. Neither proves a real Cursor OAuth install or marketplace acceptance.

Official references: [plugin format](https://cursor.com/docs/reference/plugins), [local development](https://cursor.com/docs/plugins), [MCP/OAuth](https://cursor.com/docs/context/mcp), [marketplace review](https://cursor.com/help/security-and-privacy/marketplace-security), [submission](https://cursor.com/marketplace/publish).
