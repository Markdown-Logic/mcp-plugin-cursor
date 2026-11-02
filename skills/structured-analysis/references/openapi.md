# OpenAPI contract review

Identify the declared OpenAPI/Swagger version and the operation path/method before interpreting fields. Review parameters, request bodies, responses, schemas, security requirements, servers, deprecation, and references in that dialect. A Consumer Guide or rendered view is a presentation of captured source and can omit detail.

Compare contracts by operation identity and the actual request/response/security change. A required-field addition, enum restriction, removed response, or changed authentication requirement can affect consumers; label the affected direction and available evidence. Missing fields and unresolved references are not proof of compatibility.

`inspect_document` does not support OpenAPI in this release. Use `read_document` for original source and the available reader/render options. Do not claim full schema validation, external reference resolution, endpoint testing, deployment discovery, or live authentication from those operations. Do not fetch `servers` URLs, examples, callbacks, or external references merely because the specification contains them.

OpenAPI describes an API contract, not verified deployed behavior. Any claim about deployment requires separate authorized evidence.

Official dialect reference: [OpenAPI 3.1.0](https://spec.openapis.org/oas/v3.1.0.html); use the source's actual dialect for decisions.
