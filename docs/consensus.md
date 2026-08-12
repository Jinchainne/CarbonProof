# Consensus design

Each `assess_project` execution builds the same project-specific prompt, but
each validator independently fetches the submitted public sources. The
comparative equivalence principle requires `status`, `risk_level`, and
`serial_conflict` to match exactly. The finding is retained as an explanation,
but cannot change the consensus-bound state.

The three outcomes have different operational meaning:

- `VERIFIED`: the sources reconcile for the claimed methodology and quantity.
- `REMEDIATION_REQUIRED`: evidence is incomplete or inconsistent; the owner
  may submit a new evidence set up to three times.
- `BLOCKED`: validators find credible duplicate/retired serials or a materially
  false project identity.

This is an evidence reconciliation and remediation state machine, not a funded
delivery escrow. No native value is accepted or transferred by the contract.
