export interface SetupLink {
  id: string;
  group: string;
  label: string;
  url: string;
  purpose: string;
  ownerActionRequired: boolean;
  relatedFields: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const SETUP_LINKS: SetupLink[] = [
  // GitHub
  {
    id: 'gh-new',
    group: 'GitHub',
    label: 'Create New Repository',
    url: 'https://github.com/new',
    purpose: 'Host your site code for Vercel deployment.',
    ownerActionRequired: true,
    relatedFields: ['githubRepoUrl'],
    riskLevel: 'low'
  },
  {
    id: 'gh-token',
    group: 'GitHub',
    label: 'GitHub Personal Access Tokens',
    url: 'https://github.com/settings/tokens',
    purpose: 'Generate a token for REAPER deployment tools.',
    ownerActionRequired: true,
    relatedFields: ['githubTokenExists'],
    riskLevel: 'medium'
  },
  
  // Vercel
  {
    id: 'vc-dash',
    group: 'Vercel',
    label: 'Vercel Dashboard',
    url: 'https://vercel.com/dashboard',
    purpose: 'Manage your live deployments and domains.',
    ownerActionRequired: true,
    relatedFields: ['vercelProject'],
    riskLevel: 'low'
  },
  {
    id: 'vc-new',
    group: 'Vercel',
    label: 'Import New Project',
    url: 'https://vercel.com/new',
    purpose: 'Connect your GitHub repo to Vercel.',
    ownerActionRequired: true,
    relatedFields: ['vercelProject'],
    riskLevel: 'low'
  },

  // Supabase
  {
    id: 'sb-dash',
    group: 'Supabase',
    label: 'Supabase Dashboard',
    url: 'https://supabase.com/dashboard',
    purpose: 'Manage your PostgreSQL database and auth.',
    ownerActionRequired: true,
    relatedFields: ['supabaseUrl', 'supabaseAnonKey'],
    riskLevel: 'medium'
  },

  // Ads/Affiliates
  {
    id: 'ads-sense',
    group: 'Ads',
    label: 'Google AdSense',
    url: 'https://www.google.com/adsense',
    purpose: 'Monetize your traffic with display ads.',
    ownerActionRequired: true,
    relatedFields: ['adClientId'],
    riskLevel: 'medium'
  },
  {
    id: 'epic-sac',
    group: 'Affiliates',
    label: 'Epic Support-A-Creator',
    url: 'https://www.fortnite.com/news/support-a-creator',
    purpose: 'Earn revenue from Fortnite in-game purchases.',
    ownerActionRequired: true,
    relatedFields: ['creatorCode'],
    riskLevel: 'low'
  },

  // Social APIs
  {
    id: 'yt-console',
    group: 'Social APIs',
    label: 'YouTube API Console',
    url: 'https://console.cloud.google.com/apis/library/youtube.googleapis.com',
    purpose: 'Enable YouTube creator embeds.',
    ownerActionRequired: true,
    relatedFields: ['youtubeApiKey'],
    riskLevel: 'medium'
  },
  {
    id: 'dc-dev',
    group: 'Social APIs',
    label: 'Discord Developer Portal',
    url: 'https://discord.com/developers/applications',
    purpose: 'Create webhooks for community alerts.',
    ownerActionRequired: true,
    relatedFields: ['discordWebhook'],
    riskLevel: 'low'
  }
];
