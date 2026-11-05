# Skills protocol profiles

The [stable MCP skills extension](https://skills.extensions.modelcontextprotocol.io/specification/stable/skills) is declared under modern discovery `capabilities.extensions["io.modelcontextprotocol/skills"]`. It uses `skills/list`, `skills/get`, and ordinary `resources/read`. There is no standard top-level `capabilities.skill` field. File manifests provide raw-byte SHA-256 digests and sizes; cache freshness/scope and content integrity are different properties.

Use the originating server identity plus skill URI as the identity/cache key. Reading a SKILL.md as an ordinary resource does not activate a skill, approve its content, change tools, or confer authority. The host decides whether it supports verified skill loading. For clients without that support, use ordinary tools, resources, prompts, and server instructions as available.

The [OpenAI static importer](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server) documents a separate bounded draft compatibility profile, advertised during initialization. It imports a static submission-time snapshot, currently up to five uniquely named skills. Its scan/import behavior is not live runtime skill loading. A server implementation or an installed generic SDK request API does not prove a particular client supports either profile.

Do not submit a plugin, install it, create credentials, or change permissions merely to test this workflow. Report the actual advertised profile and the client's observed behavior.
