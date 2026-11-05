# Contract interpretation

Read the declared dialect and relevant operations, never assume a newer dialect. For OpenAPI, map paths/methods, parameters, request/response types, security requirements, callbacks/webhooks and references; retain unresolved references. Original-source review is not formal schema validation or deployed conformance. Versioned reference: https://spec.openapis.org/oas/v3.1.0.html (not a latest-version claim).

For AsyncAPI, identify the described application's role, channels, operations, messages, payload/headers, correlation, replies and protocol bindings. Do not mechanically reverse a producer contract into a consumer contract. Topology, delivery, acknowledgment, ordering and retry guarantees require protocol/provider evidence when absent. Versioned reference: https://www.asyncapi.com/docs/reference/specification/v3.0.0 (not a latest-version claim).

Schemas alone often omit operational limits, costs and delivery guarantees. Unknown values remain open decisions; distinguish a provider guarantee from proposed client policy. Signed-webhook signature tests apply only when supported by the provider contract.
