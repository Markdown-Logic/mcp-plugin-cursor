# Source identity and evidence

Record which source was actually read: stable ID, source kind, returned hash/revision, observed time, and repository commit when provided. Do not conflate a source URL, document ID, repository document ID, Git SHA, stored content hash, parser-input hash, or mutation revision.

`inspect_document` accepts stored project-artifact `documentId` values, including endpoint-backed artifacts and indexed `endpoint_doc` artifact IDs, and optionally an owned `versionId`. It does not inspect connected repository captures. For every current-document page with `offset > 0` and no `versionId`, retain the first page's `inspection.sourceBinding.sha256` and supply it as `expectedSourceHash`. If the hash changes, stop combining pages and restart explicitly against one source snapshot. Artifact `updatedAt` is not an endpoint observation timestamp; mark endpoint freshness unknown when that evidence is absent.

For unsupported sources, read original source through the applicable read tool and clearly label any manual analysis. Copying a repository capture into a project is a separate write and is unnecessary for a read-only comparison. Do not perform that write merely to obtain inspection output.

Transport/parse failure, unsupported profile, missing fields, capture omissions, and an empty returned page have different meanings. Preserve the reported reason. None establishes that the source has no components, findings, or vulnerabilities.
