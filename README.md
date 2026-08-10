# CarbonProof

A carbon-credit delivery escrow Intelligent Contract for GenLayer.

A buyer escrows GEN for a carbon project developer and names an independent arbiter. The developer submits public registry records, third-party verification reports, and project documentation. GenLayer validators fetch the live proof and reach consensus on whether it meets the delivery criteria, including methodology, registry evidence, and claimed quantity. The verdict can verify payment, request a revision, or reject the order.

## Lifecycle

```text
create_order (buyer funds GEN)
  -> submit_delivery_proof (developer)
  -> verify_delivery (permissionless validator consensus)
     -> verified: developer paid
     -> needs revision: developer resubmits, up to three times
     -> rejected: buyer refunds or either party disputes
  -> disputed: arbiter approves/rejects, then timeout refunds buyer
  -> expired: buyer refunds
```

## Contract

Source: `contracts/carbon_proof.py`

| Method | Caller | Purpose |
| --- | --- | --- |
| `create_order` | Buyer, payable | Names developer/arbiter, defines criteria, and funds escrow. |
| `submit_delivery_proof` | Developer | Submits one to eight public proof URLs. |
| `verify_delivery` | Anyone | Runs live-web AI consensus and records the verdict. |
| `refund_rejected_order` | Buyer | Refunds a rejected order. |
| `raise_dispute` / `resolve_dispute` | Party / arbiter | Freezes a live order and gives the named arbiter a binding resolution. |
| `refund_expired_order` | Anyone | Refunds an unresolved order after its deadline. |
| `force_default_resolution` | Anyone | Refunds a disputed order after the arbiter grace period. |

## Verify and Deploy

```powershell
genvm-lint check contracts/carbon_proof.py
```

Deploy `contracts/carbon_proof.py` through GenLayer Studio or the CLI. It has no constructor parameters. Begin on testnet with a small GEN amount and publicly accessible registry or verification URLs.

## Live Deployment

- Network: GenLayer Bradbury Testnet (chain ID `4221`)
- Contract: [`0xa05880Ab5139eA05C1936ccbeEF67A15c7eBF789`](https://explorer-bradbury.genlayer.com/address/0xa05880Ab5139eA05C1936ccbeEF67A15c7eBF789)
- Deploy transaction: [`0x6b4b683e8347f3b9b8d31c60451e66b135ac82b867c97fb33d4b350fcef46dd0`](https://explorer-bradbury.genlayer.com/tx/0x6b4b683e8347f3b9b8d31c60451e66b135ac82b867c97fb33d4b350fcef46dd0)

See [deployment notes](docs/deployment.md) for consensus and escrow-safety details.
