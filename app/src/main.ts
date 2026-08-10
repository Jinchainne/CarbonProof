import { CONTRACT, order, orders, write } from './contract'

const root = document.querySelector<HTMLDivElement>('#app')!
root.innerHTML = `<main><h1>CarbonProof</h1><p>Live GenLayer v2 contract: <code>${CONTRACT}</code></p>
<section><h2>Create escrow</h2><form id="create"><input name="developer" placeholder="Developer address" required><input name="arbiter" placeholder="Arbiter address" required><input name="project" placeholder="Project description" required><input name="criteria" placeholder="Registry, methodology, quantity criteria" required><input name="gen" type="number" min="0.000000000000000001" step="any" placeholder="GEN escrow" required><input name="deadline" type="datetime-local" required><button>Create on chain</button></form></section>
<section><h2>Submit and verify</h2><form id="submit"><input name="id" type="number" min="1" placeholder="Order ID" required><input name="urls" placeholder="Public registry/proof URLs, comma separated" required><button>Submit proof</button></form><form id="verify"><input name="id" type="number" min="1" placeholder="Order ID" required><button>Run validator consensus</button></form></section>
<section><button id="reload">Load on-chain orders</button><pre id="result"></pre></section></main><style>body{max-width:760px;margin:3rem auto;font:16px system-ui;background:#eef5f0;color:#133029}section{background:#fff;padding:1rem;margin:1rem 0;border:1px solid #bdd5c6;border-radius:8px}input,button{padding:.6rem;margin:.25rem;width:calc(100% - .5rem)}button{background:#17624a;color:white;border:0;border-radius:4px;cursor:pointer}code,pre{white-space:pre-wrap;overflow-wrap:anywhere}</style>`
const result = document.querySelector<HTMLPreElement>('#result')!
const form = (id: string) => new FormData(document.querySelector<HTMLFormElement>(id)!)
const show = (value: unknown) => { result.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2) }
let latest_state: unknown
async function refresh() { const ids = await orders() as number[]; latest_state = await Promise.all(ids.map(id => order(Number(id)))); show(latest_state); return latest_state }
async function execute(method: string, args: unknown[], value = 0n) { const transaction = await write(method, args, value); latest_state = await refresh(); show({ transaction, latest_state }) }
document.querySelector('#reload')!.addEventListener('click', () => refresh().catch(error => show(String(error))))
document.querySelector('#create')!.addEventListener('submit', async event => { event.preventDefault(); const f = form('#create'); const deadline = Math.floor(new Date(String(f.get('deadline'))).getTime() / 1000); const value = BigInt(Math.round(Number(f.get('gen')) * 1e18)); execute('create_order', [f.get('developer'), f.get('arbiter'), f.get('project'), f.get('criteria'), deadline], value).catch(error => show(String(error))) })
document.querySelector('#submit')!.addEventListener('submit', async event => { event.preventDefault(); const f = form('#submit'); execute('submit_delivery_proof', [Number(f.get('id')), String(f.get('urls')).split(',').map(v => v.trim())]).catch(error => show(String(error))) })
document.querySelector('#verify')!.addEventListener('submit', async event => { event.preventDefault(); const f = form('#verify'); execute('verify_delivery', [Number(f.get('id'))]).catch(error => show(String(error))) })
refresh().catch(error => show(String(error)))
