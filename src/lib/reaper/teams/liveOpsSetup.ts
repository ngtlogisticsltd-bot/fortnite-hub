import { CommandRisk } from '../commandTypes';

export interface LiveOpsBot {
  id: string;
  name: string;
  purpose: string;
  status: 'OK' | 'ISSUE' | 'WAITING' | 'NEEDS_OWNER_ACTION';
  ownerActionRequired: string | null;
  riskLevel: CommandRisk;
  nextActions: string[];
}

export interface LiveOpsReport {
  teamName: string;
  bots: LiveOpsBot[];
  overallReadiness: number;
}

export async function runLiveOpsCheck(): Promise<LiveOpsReport> {
  const bots: LiveOpsBot[] = [
    {
      id: 'domain-guide',
      name: 'Domain Setup Guide Bot',
      purpose: 'Guides the owner through custom domain connection.',
      status: 'NEEDS_OWNER_ACTION',
      ownerActionRequired: 'Attach custom domain in Vercel settings.',
      riskLevel: 'low',
      nextActions: ['Visit Vercel Domains']
    },
    {
      id: 'dns-verify',
      name: 'DNS Verification Guide Bot',
      purpose: 'Checks if DNS records are correctly mapped to Vercel.',
      status: 'WAITING',
      ownerActionRequired: 'Update A and CNAME records at your registrar.',
      riskLevel: 'low',
      nextActions: ['Copy DNS values from setup page']
    },
    {
      id: 'env-var-guide',
      name: 'Env Var Guide Bot',
      purpose: 'Ensures essential production variables are configured.',
      status: 'NEEDS_OWNER_ACTION',
      ownerActionRequired: 'Add ADMIN_PASS and SITE_URL to Vercel secrets.',
      riskLevel: 'medium',
      nextActions: ['Open Env Setup page']
    },
    {
      id: 'redeploy-guide',
      name: 'Vercel Redeploy Guide Bot',
      purpose: 'Reminds owner to redeploy after config changes.',
      status: 'WAITING',
      ownerActionRequired: 'Trigger a manual redeploy in Vercel.',
      riskLevel: 'low',
      nextActions: ['Visit Vercel Deployments']
    },
    {
      id: 'security-check',
      name: 'Admin Security Check Bot',
      purpose: 'Verifies admin routes are protected by production auth.',
      status: 'OK',
      ownerActionRequired: null,
      riskLevel: 'high',
      nextActions: []
    }
  ];

  const okCount = bots.filter(b => b.status === 'OK').length;
  const readiness = Math.round((okCount / bots.length) * 100);

  return {
    teamName: 'Live Ops Setup Team',
    bots,
    overallReadiness: readiness
  };
}
