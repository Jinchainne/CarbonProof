# CarbonProof Consensus Design

## Purpose

CarbonProof is a reusable escrow primitive for evidence-backed carbon-credit delivery. It does not ask an LLM to make an unconstrained market decision: a project developer is paid only when validator consensus finds that live registry and verification evidence satisfies the buyer's pre-committed delivery criteria.

## Non-Deterministic Consensus

`verify_delivery` copies stored order fields into local variables and invokes a closure through `gl.eq_principle.prompt_comparative`.

1. Each validator independently calls `gl.nondet.web.render` for the submitted public registry, methodology, and verification URLs.
2. Each validator calls `gl.nondet.exec_prompt` with the project description, delivery criteria, and fetched proof.
3. The equivalence principle requires the `verdict` field to match exactly: `VERIFIED`, `NEEDS_REVISION`, or `REJECTED`.
4. Reasoning can differ in wording, but must support the same conclusion about credit delivery.

The verdict is bound directly to escrow state: verification pays the developer, revision returns the order to the developer, and final rejection enables buyer recovery.

## State Machine

```text
FUNDED -> PROOF_SUBMITTED -> VERIFIED -> PAID
                          -> NEEDS_REVISION -> PROOF_SUBMITTED
                          -> REJECTED -> REJECTED_FINAL -> REFUNDED

Any unsettled state -> DISPUTED -> arbiter APPROVE -> PAID
                                 -> arbiter REJECT -> REFUNDED
DISPUTED after deadline + grace -> REFUNDED
```

`NEEDS_REVISION` is capped at three rounds. The cap prevents endless proof resubmission while the timeout path protects funds if the arbiter is inactive.

## Safety Invariants

- Only the designated developer can submit proof, and only buyer/developer can raise a dispute.
- The arbiter is fixed at order creation and is the only address able to resolve a dispute.
- `_settle` zeroes the live escrow ledger and persists terminal state before transferring GEN.
- Every live order has a deadline; unresolved, non-disputed orders can be refunded after expiry.
- Fetched web content is untrusted evidence and cannot override reviewer instructions.

## Reuse

Builders can adapt the document types and delivery criteria while retaining the settlement core: committed criteria, validator-consensus verdict, capped revisions, independent arbitration, and deterministic recovery paths.
