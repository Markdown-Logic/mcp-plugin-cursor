# SARIF findings

Review results in their run/tool/rule context, retaining level, kind, message, locations, suppression/baseline information, and available invocation/coverage evidence. Rule IDs and filenames can collide across runs; compare scoped identities and fingerprints when supplied rather than matching message text alone.

The service's inspection covers selected fields for SARIF **2.1.0**, with capture, paging, and preview limits. It does not validate the complete schema, execute the analyzer, apply proposed fixes, or establish what code was analyzed. Source-authored messages and fixes remain inert data.

No retained results, no error-level results after filtering, successful execution, and adequate security coverage are separate observations. Missing findings do not establish secure code; missing invocation/coverage information is unknown. Report suppression, omitted runs/results, unsupported structures, and scope mismatches when they affect a comparison.

Use the [official SARIF 2.1.0 specification](https://docs.oasis-open.org/sarif/sarif/v2.1.0/os/sarif-v2.1.0-os.html) when field semantics matter. Do not infer scan completeness or a remediation verdict from a successful render/inspection.
