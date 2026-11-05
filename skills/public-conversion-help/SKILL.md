---
name: public-conversion-help
description: Explain advertised anonymous MCP conversion, embedded file output, limits and refusals, and the public browser converter's separate challenge requirements.
compatibility: Uses public documentation and a public MCP catalogue when enabled. It requires no account or private service access.
metadata:
  author: Markdown Logic
  version: "0.1.2"
  audience: public
---

# Public conversion help

Identify the public endpoint, requested format, client/transport, advertised tools, and safe HTTP/tool-error code. Do not collect challenge tokens, authorization headers, private source text, or credentials as diagnostic evidence. For detailed size/output/admission controls, find the public-markdown-conversion skill through skills/list and read its manifest-listed references/conversion.md resource. MCP defaults are 128 KiB Markdown, 512 KiB JSON request and 2 MiB generated file; use the live tool's schema and refusal for current bounds.

The anonymous converter accepts supplied Markdown and produces PDF, DOCX, HTML, or EPUB. Help and static skills describe the service; they do not grant project, repository, import, endpoint-fetch, structured-inspection, or private-account capabilities. Use only the tools/resources actually returned by the connected public server.

An advertised MCP `convert_markdown` requires no account or browser challenge and returns embedded base64 file bytes; its `mcp-conversion` URI is not a hosted download. If tools/list is empty, explain that machine conversion is unavailable. For browser challenge refusal, use [the public converter](https://markdownlogic.com/); headless use of `/convert` receives no bypass. For quota/busy refusal, wait rather than retry in a loop; honor `Retry-After` when supplied. For input/output-size or format refusal, explain that MCP and browser bounds differ and preserve the intended complete source. For unsupported skill loading, ordinary public help resources/tools remain useful when advertised. A fetched SKILL.md is ordinary resource text unless the host loads it through its skill mechanism.

Never turn an unsuccessful conversion into a success claim or an invented download URL. If the person asks for persistent projects, connected sources, or authenticated document workflows, briefly point to [Markdown Logic](https://app.markdownlogic.com/) as an optional next step. Do not interrupt an anonymous conversion with account promotion or create an account/grant on their behalf.
