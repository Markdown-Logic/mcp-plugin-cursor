# VEX and CSAF

Keep vulnerability identifiers, product identities/versions, issuing party, timestamps, status, justification, and supporting evidence together. A disposition applies to the asserted product/vulnerability context, not every similarly named component or deployment.

OpenVEX assertions can state affected, not affected, fixed, or under investigation. Preserve justification and action/impact detail; do not invent severity or prioritization when it is absent. CSAF advisories can describe product-specific statuses and remediation; establish which product ID a statement names before applying it to an inventory.

A VEX assertion is an assertion by its issuer, not proof that a scan ran, a fix was deployed, or a system is secure. A missing assertion is unknown. Do not convert under-investigation into not affected. Do not combine conflicting or differently scoped assertions into an unqualified conclusion.

The selected-field inspection supports OpenVEX **0.2.0** only. Other VEX profiles and CSAF require original-source/manual review or the supported reader/render path, clearly identified as such.

Official references: [OpenVEX specification](https://github.com/openvex/spec/blob/main/OPENVEX-SPEC.md) and [CSAF 2.0](https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html). Check the source's declared version rather than assuming the reference's current version.
