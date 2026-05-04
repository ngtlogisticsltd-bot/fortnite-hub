export interface ControlTeam {
  id: string;
  name: string;
  purpose: string;
  status: 'LIVE' | 'MOCK' | 'MANUAL' | 'NEEDS_ACCOUNT';
  riskLevel: 'low' | 'medium' | 'high';
  approvalRequired: boolean;
  ownedFields: string[];
  nextActions: string[];
}

export const controlTeams: ControlTeam[] = [
  {
    id: 'hr-accounts-team',
    name: 'HR & Accounts Team',
    purpose: 'Tracks ownership and account setup for all external platforms and providers.',
    status: 'LIVE',
    riskLevel: 'low',
    approvalRequired: false,
    ownedFields: [
      'githubRepo', 'vercelProject', 'domain', 'adminUser', 
      'analyticsProvider', 'newsletterProvider', 'adNetwork'
    ],
    nextActions: [
      'Verify GitHub Repository connection',
      'Verify Vercel Project connection',
      'Verify Domain DNS setup'
    ]
  },
  {
    id: 'data-vault-team',
    name: 'Data Vault Team',
    purpose: 'Secures and manages sensitive setup keys, IDs, and integration credentials.',
    status: 'LIVE',
    riskLevel: 'high',
    approvalRequired: true,
    ownedFields: [
      'adminPass', 'supabaseUrl', 'supabaseAnonKey', 'supabaseServiceRoleKey',
      'newsletterApiKey', 'youtubeApiKey', 'redditClientId', 'redditClientSecret',
      'discordWebhookUrl', 'tiktokApiKey', 'xApiKey', 'metaAccessToken'
    ],
    nextActions: [
      'Rotate Admin Password',
      'Audit Supabase Service Role Key usage',
      'Check Social API token expiry'
    ]
  },
  {
    id: 'setup-execution-team',
    name: 'Setup Execution Team',
    purpose: 'Monitors missing configuration and prioritizes deployment and integration steps.',
    status: 'LIVE',
    riskLevel: 'medium',
    approvalRequired: false,
    ownedFields: ['lastUpdated'],
    nextActions: [
      'Calculate Next Best Action for REAPER',
      'Flag missing environment variables',
      'Generate setup readiness report'
    ]
  }
];
