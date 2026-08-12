import {
  getProject,
  listProjectsFor,
  registerProject,
  assessProject,
  submitRemediation,
  waitForAssessment,
} from '../client/src/carbonProofClient'

// These handlers are intended for a wallet-connected dashboard.
export async function loadProjectDashboard(owner: string, projectId: number) {
  const projectIds = await listProjectsFor(owner)
  const project = await getProject(projectId)
  return { projectIds, project }
}

export async function registerAndRefresh(account: string, projectKey: string, methodology: string,
  claimedCredits: number, urls: string[], deadline: number) {
  const txHash = await registerProject(account, projectKey, methodology, claimedCredits, urls, deadline)
  return { txHash, walletConnected: true }
}

export async function assessAndPersist(account: string, projectId: number) {
  const txHash = await assessProject(account, projectId)
  const receipt = await waitForAssessment(txHash as `0x${string}`)
  const project = await getProject(projectId)
  return { receipt, project, policyBoundToExecution: project }
}

export async function remediateAndRefresh(account: string, projectId: number, urls: string[], note: string) {
  const txHash = await submitRemediation(account, projectId, urls, note)
  return { txHash, nextAction: 'assess_project' }
}
