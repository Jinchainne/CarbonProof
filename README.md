# CarbonProof

A carbon-credit delivery escrow Intelligent Contract for GenLayer.

A buyer escrows GEN for a carbon project developer. The developer submits public registry records, third-party verification reports, and project documentation. GenLayer validators fetch the live proof and reach consensus on whether it meets the delivery criteria, including methodology, registry evidence, and claimed quantity. Verified delivery pays the developer; rejected or expired orders can be refunded to the buyer.

## Lifecycle

```text
create_order (buyer funds GEN)
  -> submit_delivery_proof (developer)
  -> verify_delivery (permissionless validator consensus)
     -> verified: developer paid
     -> rejected: buyer refunds
  -> expired: buyer refunds
```

## Contract

Source: `contracts/carbon_proof.py`

| Method | Caller | Purpose |
| --- | --- | --- |
| `create_order` | Buyer, payable | Defines carbon-credit criteria and funds escrow. |
| `submit_delivery_proof` | Developer | Submits one to eight public proof URLs. |
| `verify_delivery` | Anyone | Runs live-web AI consensus and records the verdict. |
| `refund_rejected_order` | Buyer | Refunds a rejected order. |
| `refund_expired_order` | Anyone | Refunds an unresolved order after its deadline. |

## Verify and Deploy

```powershell
genvm-lint check contracts/carbon_proof.py
```

Deploy `contracts/carbon_proof.py` through GenLayer Studio or the CLI. It has no constructor parameters. Begin on testnet with a small GEN amount and publicly accessible registry or verification URLs.

See [deployment notes](docs/deployment.md) for consensus and escrow-safety details.
