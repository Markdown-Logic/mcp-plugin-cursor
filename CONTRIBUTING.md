# Contributing

Keep this repository a thin remote integration. Do not add platform implementation, credentials, environment files, client registrations, local executables or automatic install hooks. Node checks require no dependencies; run `npm run validate` and `npm test`.

For skill updates, review the public upstream commit and preserve the original MIT notice. Update the original and packaged SHA-256 digests in `UPSTREAM.json`; describe every adaptation. The validator checks packaged integrity, not the authenticity of an arbitrary new upstream commit. A reviewer must verify the upstream source and claims.

Use the connection's advertised tools and preserve authorization, revision, retry and evidence boundaries. Keep private data out of public diagnostics. Live tests that render output consume usage; tests that grant OAuth access or change documents require separate authorization.

The repository validator intentionally permits only the reviewed package layout and two production server URLs. Change its allowlist and negative tests deliberately when changing the package. CI performs local checks only. Complete the Cursor acceptance checklist for releases; marketplace submissions and updates receive manual review.
