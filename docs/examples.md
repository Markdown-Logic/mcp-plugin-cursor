# Workflow examples

These prompts use the selected connection's live tool catalog and the person's authorization. Names are labels; discover real IDs and current revisions before addressing a document.

| Goal | Prompt and expected behavior |
| --- | --- |
| Public PDF | “Convert this complete Markdown to PDF with the public connection.” Use advertised `convert_markdown`; preserve source and attach actual returned bytes. No OAuth or private access. |
| Read private document | “List my available projects and let me choose a document to read.” Resolve team, project and document IDs; page actual results; read only the selected document. |
| Edit selected document | “Apply my approved draft to this document.” Read the current revision, use `expectedRevision`, and report the committed identity. On conflict, reconcile that same ID; do not retry blindly. |
| Export stored report | “Render this selected report to DOCX.” Use the real format/options; disclose renderer limitations, and return actual output. Rendering consumes usage. |
| Analyze evidence | “Compare these two SARIF versions.” Bind evidence to exact source versions and distinguish findings from security assurance. |

For runnable integration examples, use the canonical [Markdown Logic API examples](https://github.com/Markdown-Logic/api-examples/tree/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8). They are REST/CLI examples, not commands installed by this plugin:

- [Node report storage](https://github.com/Markdown-Logic/api-examples/blob/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8/node/scenarios/02-store-report.mjs) and [revision-safe updates](https://github.com/Markdown-Logic/api-examples/blob/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8/node/scenarios/03-update-report.mjs).
- [History and export](https://github.com/Markdown-Logic/api-examples/blob/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8/node/scenarios/04-history-export.mjs).
- [Python setup and scenarios](https://github.com/Markdown-Logic/api-examples/blob/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8/python/README.md).
- [Report workflow and authorization notes](https://github.com/Markdown-Logic/api-examples/blob/d3ab4f8f94baf53624cf951a8193c3b3a3b80ba8/docs/report-workflow.md).

Review and configure those examples separately before executing anything. Linking to them does not authorize creating projects, publishing, sharing, registering webhooks, creating credentials or sending private source to a public service.
