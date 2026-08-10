import { createClient } from 'genlayer-js'
import { testnetBradbury } from 'genlayer-js/chains'

export const CONTRACT = '0xa544fF6D28aD72151a29ADaDCAEeB1821431DD74'
const RPC = 'https://rpc-bradbury.genlayer.com'
const reader = () => createClient({ chain: testnetBradbury, endpoint: RPC })
const writer = async () => {
  const provider = (window as any).ethereum
  if (!provider) throw new Error('Connect MetaMask or another EIP-1193 wallet first.')
  const [account] = await provider.request({ method: 'eth_requestAccounts' })
  return createClient({ chain: testnetBradbury, endpoint: RPC, account, provider })
}
export const orders = () => reader().readContract({ address: CONTRACT as any, functionName: 'list_order_ids', args: [] })
export const order = (id: number) => reader().readContract({ address: CONTRACT as any, functionName: 'get_order', args: [id] })
export async function genlayerWrite(method: string, args: unknown[], value = 0n) {
  const client = await writer()
  return client.writeContract({ address: CONTRACT as any, functionName: method, args: args as any, value })
}
export const write = genlayerWrite
