# Local Cursor validation — 2026-11-02

Tested the unpublished package from commit `4088b3c` in installed Cursor **3.19.7**, build `90de2327392570a5f5f625c656c6749d228e6430` (2026-09-02), on macOS. Cursor displayed an available restart-to-update notice; this test did not install that update.

A new test copy was placed in the previously unused `~/.cursor/plugins/local/markdown-logic/` directory. No existing installation was overwritten. Native Cursor Customize showed:

- **Markdown Logic — Local**, version **0.1.0**, with the expected website/repository links and logo.
- **MCPs 2** and **Skills 7**. The skill list included the packaged names.
- **markdown-logic-public: 1 tool, 3 resources enabled** under Connected.
- **markdown-logic: Error** before private access was established.

The private server configuration displayed this exact diagnostic:

```text
a redirect URI must use https (or a loopback http address): cursor://anysphere.cursor-mcp/oauth/callback
```

This is an actual client/server compatibility blocker for the installed build. The registration attempt was refused before a consent screen was reached. No OAuth grant was approved, and no usable client ID, requested authorization resource or consent scopes were observed. The fixed HTTPS/loopback callbacks in current Cursor documentation therefore cannot be assumed for this installed build. Do not broaden the service's redirect policy or invent a shared OAuth client to bypass the refusal. Retest with a Cursor build using a supported documented callback before private-access acceptance.

Separately, production read-only metadata advertised the MCP resource `https://mcp.markdownlogic.com`, authorization server `https://auth.markdownlogic.com`, and the four MCP scopes `documents:read`, `documents:write`, `projects:read`, `releases:read`. The authorization server also advertises additional scopes. Actual Cursor scope selection remains unverified because this run never reached consent.

No conversion, private document read/write, account sign-in, consent approval or marketplace submission was performed. The public catalog check and UI discovery do not establish generated-file saving support. Skill files and relative references passed local integrity/path checks; no agent workflow execution was invoked.

After inspection, the test copy was verified byte-for-byte unchanged and removed. Cursor returned to its empty local-plugin inventory. The source clone, existing user MCP configurations and other plugin components were preserved.

Next acceptance steps: use a compatible Cursor callback, review the exact requested MCP scopes before any owner-approved grant, then test a user-selected read and separately authorize a benign public conversion/file-save check. At the time of this initial check the package license choice was pending; the current LICENSE and manifest record the owner’s subsequent MIT selection.
