# Staged validation

| Stage | Work | Evidence for completion |
| --- | --- | --- |
| Contract/assumptions | Relevant operations, required fields, mappings, dialect, references and gaps | Reviewed source or actual suitable validator output |
| Offline | Synthetic fixtures/mocks, serialization, missing/null, errors, pagination, bounded retries and deduplication | Actual local output at named code/contract revision |
| Provider sandbox | Minimal auth/read, then authorized disposable writes/messages with cleanup | Actual results in stated sandbox and scope |
| End to end | User workflow, partial failure, repeats/interruption, recovery and data correctness | Observed workflow results and gaps |
| Operations | Redacted logging, correlation, metrics, recovery/cleanup and ownership | Verified checks or explicit untested checklist |

For event-driven work include duplicates, invalid messages, ordering/replay and acknowledgment where relevant. Use bounded traffic; never exhaust quotas deliberately. Sandbox does not mean free or harmless.

Example proposed record:
- Requirement/operation: paginate all permitted records; source: provider guide revision and section.
- Scenario: fixture has two pages and one missing optional value.
- Expected: return each record once, preserve missing value, stop at absent next token.
- Environment/effects: offline fixture, no external effects; cleanup: none.
- Status: proposed, not run.

After execution append actual result, timestamp, code/contract revision and evidence location. A sanitized failure needs operation/message, request shape, response/error, environment, time and safe correlation ID; exclude tokens, authorization headers and private payloads. Preserve uncertain write outcomes and original operation identity while reconciling.
