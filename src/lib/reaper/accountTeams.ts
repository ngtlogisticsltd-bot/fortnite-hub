export type AccountStatus = 'LIVE' | 'MOCK' | 'MANUAL' | 'NEEDS_ACCOUNT' | 'NEEDS_OWNER_ACTION' | 'CONNECTED' | 'ERROR' | 'OPTIONAL_LATER';

export interface AccountTeam {
  id: string;
  name: string;
  status: AccountStatus;
  purpose: string;
  ownerActionRequired: string;
  requiredEnvVars: string[];
  setupSteps: string[];
  whatThisUnlocks: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
}

export const accountTeams: AccountTeam[] = [
  {
    id: 'domain-setup',
    name: 'Domain Setup Team',
    status: 'NEEDS_ACCOUNT',
    purpose: 'Manage custom domain routing and SSL.',
    ownerActionRequired: 'Buy domain and link DNS.',
    requiredEnvVars: ['NEXT_PUBLIC_SITE_URL'],
    setupSteps: ['Purchase domain', 'Add domain to Vercel', 'Configure DNS A/CNAME records'],
    whatThisUnlocks: 'SEO indexing and professional branding.',
    riskLevel: 'High',
    notes: 'Do not use Epic Games trademarks in the domain.'
  },
  {
    id: 'vercel-deployment',
    name: 'Vercel Deployment Team',
    status: 'NEEDS_ACCOUNT',
    purpose: 'Production hosting and edge caching.',
    ownerActionRequired: 'Connect GitHub repo to Vercel.',
    requiredEnvVars: [],
    setupSteps: ['Create Vercel account', 'Import GitHub repo', 'Paste all production Env Vars', 'Deploy'],
    whatThisUnlocks: 'Live public access to FortHub.',
    riskLevel: 'High',
    notes: 'Free tier is sufficient for launch.'
  },
  {
    id: 'supabase-db',
    name: 'Supabase Database Team',
    status: 'NEEDS_ACCOUNT',
    purpose: 'Persistent storage for submissions and traffic.',
    ownerActionRequired: 'Create Supabase project.',
    requiredEnvVars: ['DATABASE_URL', 'SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
    setupSteps: ['Create project', 'Run schema.sql', 'Copy keys to Env'],
    whatThisUnlocks: 'Fan submissions, click tracking, and sponsor logging.',
    riskLevel: 'High',
    notes: 'Keep Service Role Key absolutely private.'
  },
  {
    id: 'analytics',
    name: 'Analytics Team',
    status: 'NEEDS_ACCOUNT',
    purpose: 'Track real user traffic.',
    ownerActionRequired: 'Create Google Analytics 4 property.',
    requiredEnvVars: ['NEXT_PUBLIC_ANALYTICS_ID'],
    setupSteps: ['Create GA4', 'Copy Measurement ID', 'Update Env'],
    whatThisUnlocks: 'Traffic dashboards and monetization metrics.',
    riskLevel: 'Low',
    notes: 'No fake traffic allowed.'
  },
  {
    id: 'newsletter',
    name: 'Newsletter Team',
    status: 'OPTIONAL_LATER',
    purpose: 'Manage daily email blasts to fans.',
    ownerActionRequired: 'Choose provider (Resend/Mailchimp).',
    requiredEnvVars: ['NEWSLETTER_API_KEY'],
    setupSteps: ['Create account', 'Verify sending domain', 'Copy API Key'],
    whatThisUnlocks: 'Direct audience retention channel.',
    riskLevel: 'Medium',
    notes: 'Requires CAN-SPAM compliance.'
  },
  {
    id: 'ad-network',
    name: 'Ad Network Team',
    status: 'OPTIONAL_LATER',
    purpose: 'Display programmatic ads.',
    ownerActionRequired: 'Apply to Google AdSense.',
    requiredEnvVars: ['NEXT_PUBLIC_ADSENSE_ID'],
    setupSteps: ['Publish 15+ original guides', 'Apply for AdSense', 'Paste Publisher ID'],
    whatThisUnlocks: 'Passive revenue generation.',
    riskLevel: 'High',
    notes: 'AdSense requires strict adherence to original content policies.'
  },
  {
    id: 'affiliate',
    name: 'Affiliate Team',
    status: 'OPTIONAL_LATER',
    purpose: 'Support-A-Creator & Amazon links.',
    ownerActionRequired: 'Apply for Epic SAC program.',
    requiredEnvVars: ['NEXT_PUBLIC_CREATOR_CODE'],
    setupSteps: ['Reach 1k followers on a social channel', 'Apply for SAC', 'Add code to Env'],
    whatThisUnlocks: 'In-game cosmetic commission.',
    riskLevel: 'Medium',
    notes: 'Must clearly disclose affiliate status on UI.'
  },
  {
    id: 'social-api',
    name: 'Social/API Team',
    status: 'OPTIONAL_LATER',
    purpose: 'Auto-posting to external platforms.',
    ownerActionRequired: 'Create developer accounts per platform.',
    requiredEnvVars: ['DISCORD_WEBHOOK_URL', 'YOUTUBE_API_KEY', 'REDDIT_CLIENT_ID', 'TIKTOK_API_KEY', 'X_API_KEY'],
    setupSteps: ['Create Discord webhook', 'Apply for YouTube API quota', 'Create Reddit app'],
    whatThisUnlocks: 'Automated traffic generation bots.',
    riskLevel: 'High',
    notes: 'Auto-posting risks spam bans. Keep manual until proven.'
  },
  {
    id: 'github-launch',
    name: 'GitHub Repository Team',
    status: 'NEEDS_OWNER_ACTION',
    purpose: 'Version control and automated deployment via Vercel.',
    ownerActionRequired: 'Initialize Git, commit code, and push to remote origin.',
    requiredEnvVars: ['GITHUB_REPO_URL'],
    setupSteps: ['Create GitHub account', 'Create empty repository', 'Run git init, commit, and push', 'Import into Vercel'],
    whatThisUnlocks: 'Continuous Integration and Deployment (CI/CD).',
    riskLevel: 'High',
    notes: 'Never commit .env files containing live keys.'
  }
];
