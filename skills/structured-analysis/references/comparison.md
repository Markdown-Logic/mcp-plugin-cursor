# Comparison evidence

For each input, retain stable ID, requested version/source kind, actual source binding, observed profile, parser-input hash, and capture/metric revisions. A display version or a submitted component hash is not a parser-input hash or a document write revision.

When inspection is available, retain `coverage`, `metrics`, `limits`, `limitations`, and `page` alongside the selected `untrusted_source_evidence`. Use complete returned JSON pointers for citations. A missing/clipped pointer cannot be reconstructed reliably from a preview.

Follow `page.nextOffset` while `hasMore` is true. Every current-document page with `offset > 0` and no `versionId` requires the first page's `sourceBinding.sha256` as `expectedSourceHash`, including ordinary project artifacts. Do not combine changed-source pages; report the change and restart explicitly. Exhausting retained pages does not erase capture omissions, unreadable/unsupported entries, text-budget omissions, view clipping, or nonprojected fields.

Keep each metric's unit, scope, denominator, rule, and unknown reason. Do not turn null into zero, count preview rows as whole-source totals, add incompatible units, or extrapolate missing populations. Align schema/profile and matching strategy before calling additions/removals; unmatched identities can reflect changed identifiers or incomplete evidence.

A useful comparison separates supported observations, the interpretation applied to them, and unresolved questions. Claims of source validity, deployed behavior, exploitability, or security need separate evidence outside this selected-field inspection.
