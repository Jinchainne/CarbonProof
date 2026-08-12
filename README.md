# CarbonProof

CarbonProof is a GenLayer-powered carbon registry reconciliation monitor. It
does not hold GEN and does not pay or refund a counterparty. A project owner
registers an identity, methodology, claimed quantity, and public evidence.
Validators independently inspect the live sources and reach consensus on
whether the record is verified, needs remediation, or is blocked for a likely
serial-number conflict or false identity.

## Why GenLayer

Registry data is heterogeneous, changes over time, and is often distributed
across PDFs, project pages, and retirement records. `assess_project` uses
`gl.nondet.web.render` and `gl.nondet.exec_prompt` inside
`gl.eq_principle.prompt_comparative`; the consensus-bound fields are status,
risk level, and serial-conflict flag. The result is stored as the project's
current audit status.

## Workflow

```text
register_project (owner writes project + evidence)
  -> assess_project (any caller triggers live multi-validator reconciliation)
     -> verified
     -> remediation_required -> submit_remediation -> assess_project
     -> blocked (serial conflict / false identity)
```

Remediation is capped at three rounds. The contract has no escrow, settlement,
arbiter, payout, refund, or delivery-dispute lifecycle.

## Application client

`client/src/carbonProofClient.ts` is a real GenLayer client path. It uses
`readContract` for project dashboards and `writeContract` for registration,
assessment, and remediation. Set `VITE_CONTRACT_ADDRESS`, run `npm install`
inside `client`, and use the exported functions from a wallet-connected UI.

## Contract methods

| Method | Purpose |
| --- | --- |
| `register_project` | Stores a project identity and evidence sources. |
| `assess_project` | Fetches live sources and writes consensus status/risk. |
| `submit_remediation` | Replaces evidence after a failed/incomplete review. |
| `get_project` | Reads the complete audit record. |
| `list_project_ids` / `list_projects_for` | Reads project indexes. |

## Verification

```powershell
genvm-lint check contracts/carbon_proof.py
cd client
npm install
npm run typecheck
```
