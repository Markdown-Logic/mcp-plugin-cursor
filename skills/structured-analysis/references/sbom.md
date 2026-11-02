# SPDX and CycloneDX SBOM

Use the document's declared dialect and original source. The service's selected-field inspection supports CycloneDX **1.5 JSON**, not every SBOM representation; an SPDX or different CycloneDX profile can still have a reader/render path without inspection support.

Inventory identifiers have context. CycloneDX `bom-ref` connects records and dependency relationships within a BOM; SPDX identifiers connect elements and relationships within their document context. Package names alone are weak match keys. Preserve versions, identity fields, relationship direction/type, and unmatched or duplicate identities when comparing.

An SBOM describes inventory and relationships asserted by its producer. Absence from a bounded capture is not absence from a deployment. Dependency relationships do not establish runtime reachability, vulnerable code execution, or exploitability. Component hashes and declared licenses are assertions until independently verified; do not claim verification from a rendered inventory.

Read the relevant official dialect when a field's meaning affects the decision: [CycloneDX 1.5 JSON](https://cyclonedx.org/docs/1.5/json/) and [SPDX 2.3.1](https://spdx.github.io/spdx-spec/v2.3.1/). These references explain fields; they do not broaden the server's implemented profiles.
