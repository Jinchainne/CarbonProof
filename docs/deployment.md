# CarbonProof Deployment Notes

## Intelligent Contract Decision

`verify_delivery` copies the stored criteria and proof URLs into local values. Inside `gl.eq_principle.prompt_comparative`, every validator renders each public URL through `gl.nondet.web.render` and asks an LLM whether evidence proves the agreed carbon-credit delivery. The `verified` boolean must match across validators, so settlement is controlled by a non-deterministic consensus result.

## Escrow Safety

- Only the buyer funds an order and only the assigned developer submits proof.
- `_settle` zeros the live escrow balance and persists the terminal status before transferring GEN.
- A settled order cannot be paid or refunded again.
- Buyer recovery is available after rejection or expiry.

## Test Checklist

1. Lint the source with `genvm-lint check contracts/carbon_proof.py`.
2. Deploy to GenLayer testnet.
3. Create a low-value order with clear registry, methodology, and quantity criteria.
4. Submit publicly accessible registry and verification URLs.
5. Call `verify_delivery`, then inspect `get_order` for the verdict and reasoning.
6. Test a rejection and the expiry refund path before using meaningful value.
