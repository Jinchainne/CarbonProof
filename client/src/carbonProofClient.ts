import { createClient } from 'genlayer-js'
import { testnetBradbury } from 'genlayer-js/chains'
import { parseEther } from 'viem'

export const CONTRACT_ADDRESS = (import.meta as any).env?.VITE_CONTRACT_ADDRESS as string
export const RPC_URL = 'https://rpc-bradbury.genlayer.com'

function readClient() {
  return createClient({ chain: testnetBradbury, endpoint: RPC_URL })
}

function writeClient(account: string) {
  const provider = (globalThis as any).ethereum
  if (!provider) throw new Error('Connect a wallet before writing')
  return createClient({ chain: testnetBradbury, account: account as any, provider, endpoint: RPC_URL })
}

export async function getProject(projectId: number) {
  return readClient().readContract({ address: CONTRACT_ADDRESS as any, functionName: 'get_project', args: [projectId] })
}

export async function listProjectsFor(owner: string) {
  return readClient().readContract({ address: CONTRACT_ADDRESS as any, functionName: 'list_projects_for', args: [owner] })
}

export async function registerProject(account: string, projectKey: string, methodology: string,
  claimedCredits: number, evidenceUrls: string[], reviewDeadline: number) {
  return writeClient(account).writeContract({
    address: CONTRACT_ADDRESS as any, functionName: 'register_project',
    args: [projectKey, methodology, claimedCredits, evidenceUrls, reviewDeadline], value: parseEther('0')
  })
}

export async function assessProject(account: string, projectId: number) {
  return writeClient(account).writeContract({ address: CONTRACT_ADDRESS as any, functionName: 'assess_project', args: [projectId], value: 0n })
}

export async function waitForAssessment(txHash: Parameters<ReturnType<typeof readClient>['waitForTransactionReceipt']>[0]['hash']) {
  return readClient().waitForTransactionReceipt({ hash: txHash })
}

export async function submitRemediation(account: string, projectId: number, evidenceUrls: string[], note: string) {
  return writeClient(account).writeContract({ address: CONTRACT_ADDRESS as any, functionName: 'submit_remediation', args: [projectId, evidenceUrls, note], value: 0n })
}
