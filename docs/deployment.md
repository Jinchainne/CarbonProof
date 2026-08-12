# CarbonProof deployment notes

CarbonProof is a non-financial registry reconciliation monitor. It does not
accept GEN and has no escrow, payout, refund, dispute, or arbiter flow.

## Contract decision

`assess_project` reads the stored project identity, methodology, claimed
quantity, and evidence URLs. Each validator independently renders the public
sources and evaluates registry identity, methodology, issuance/retirement
records, and serial-number overlap. `gl.eq_principle.prompt_comparative`
requires `status`, `risk_level`, and `serial_conflict` to agree across
validators. The result is persisted into the project audit record.

## State workflow

```text
REGISTERED -> EVIDENCE_SUBMITTED -> VERIFIED
                              -> REMEDIATION_REQUIRED -> EVIDENCE_SUBMITTED
                              -> BLOCKED
```

The owner can submit at most three remediation rounds. The review deadline
prevents assessment after the committed review window. No native value is
transferred by any method.

## Verification checklist

1. Run `genvm-lint check contracts/carbon_proof.py`.
2. Deploy the revised contract to Bradbury testnet.
3. Record the new deployed address in the contribution evidence.
4. Use the client to call `register_project` with stable public registry URLs.
5. Call `assess_project`, wait for the transaction receipt, and read
   `get_project` to verify the persisted status and risk fields.
6. If remediation is required, call `submit_remediation` and reassess.

## Bradbury deployment

- Contract: `0x54AD563960f0FF58F3713a265c3549BC61F84Aaf`
- Transaction: `0x91f9b7532f2b865941003ab148debbe6bb46e6184b91a5103e92e7ea350907a8`
