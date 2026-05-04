export interface AutoFillTeam {
  id: string;
  name: string;
  context: string;
  purpose: string;
  fieldsUsed: string[];
  status: 'LIVE' | 'MOCK' | 'MANUAL';
  riskLevel: 'low' | 'medium' | 'high';
  nextActions: string[];
}

export const autoFillTeams: AutoFillTeam[] = [
  {
    id: 'github-autofill',
    name: 'GitHub Auto-Fill Team',
    context: 'github',
    purpose: 'Automatically identifies and pre-fills GitHub repository details.',
    fieldsUsed: ['githubRepo'],
    status: 'LIVE',
    riskLevel: 'low',
    nextActions: ['Connect GitHub repo', 'Check remote origin']
  },
  {
    id: 'domain-autofill',
    name: 'Domain Auto-Fill Team',
    context: 'domain',
    purpose: 'Identifies primary domain and environment URLs for setup.',
    fieldsUsed: ['domain'],
    status: 'LIVE',
    riskLevel: 'low',
    nextActions: ['Verify DNS', 'Check SSL status']
  },
  {
    id: 'vercel-autofill',
    name: 'Vercel Auto-Fill Team',
    context: 'vercel',
    purpose: 'Pre-fills Vercel project details for deployment linking.',
    fieldsUsed: ['vercelProject', 'githubRepo', 'domain'],
    status: 'LIVE',
    riskLevel: 'low',
    nextActions: ['Link Vercel project', 'Sync env vars']
  },
  {
    id: 'supabase-autofill',
    name: 'Supabase Auto-Fill Team',
    context: 'supabase',
    purpose: 'Handles database connection strings and security key auto-filling.',
    fieldsUsed: ['supabaseUrl', 'supabaseAnonKey', 'supabaseServiceRoleKey'],
    status: 'LIVE',
    riskLevel: 'high',
    nextActions: ['Test DB connection', 'Audit keys']
  },
  {
    id: 'analytics-autofill',
    name: 'Analytics Auto-Fill Team',
    context: 'analytics',
    purpose: 'Auto-fills tracking IDs and provider types.',
    fieldsUsed: ['analyticsProvider', 'analyticsId'],
    status: 'LIVE',
    riskLevel: 'low',
    nextActions: ['Check tracking status', 'Verify data flow']
  },
  {
    id: 'newsletter-autofill',
    name: 'Newsletter Auto-Fill Team',
    context: 'newsletter',
    purpose: 'Pre-fills email marketing and newsletter platform keys.',
    fieldsUsed: ['newsletterProvider', 'newsletterApiKey'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Test API key', 'Check list ID']
  },
  {
    id: 'ads-autofill',
    name: 'Ads Auto-Fill Team',
    context: 'ads',
    purpose: 'Handles ad network client IDs and publisher codes.',
    fieldsUsed: ['adNetwork', 'adClientId', 'creatorCode'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Verify ad placement', 'Check ads.txt']
  },
  {
    id: 'affiliate-autofill',
    name: 'Affiliate Auto-Fill Team',
    context: 'affiliate',
    purpose: 'Pre-fills Amazon and Epic creator codes for monetization.',
    fieldsUsed: ['affiliateAmazon', 'affiliateEpic', 'creatorCode'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Check affiliate links', 'Verify SAC status']
  },
  {
    id: 'social-autofill',
    name: 'Social API Auto-Fill Team',
    context: 'social',
    purpose: 'Handles multi-platform social API keys and webhook URLs.',
    fieldsUsed: ['youtubeApiKey', 'redditClientId', 'redditClientSecret', 'discordWebhookUrl', 'tiktokApiKey', 'xApiKey', 'metaAccessToken'],
    status: 'LIVE',
    riskLevel: 'high',
    nextActions: ['Audit API usage', 'Check rate limits']
  },
  {
    id: 'revenue-autofill',
    name: 'Revenue Auto-Fill Team',
    context: 'revenue',
    purpose: 'Consolidates all monetization fields for the revenue hub.',
    fieldsUsed: ['adNetwork', 'adClientId', 'affiliateAmazon', 'affiliateEpic', 'creatorCode'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Generate earnings report', 'Verify payments']
  },
  {
    id: 'media-autofill',
    name: 'Media Auto-Fill Team',
    context: 'media',
    purpose: 'Handles YouTube API and creator attribution fields.',
    fieldsUsed: ['youtubeApiKey', 'creatorCode', 'domain'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Verify video embeds', 'Check attribution']
  },
  {
    id: 'setup-autofill',
    name: 'Setup Auto-Fill Team',
    context: 'setup',
    purpose: 'Comprehensive auto-fill for the global setup checklist.',
    fieldsUsed: ['adminUser', 'adminPass', 'githubRepo', 'vercelProject', 'domain', 'supabaseUrl', 'analyticsId', 'newsletterApiKey', 'adClientId', 'affiliateAmazon', 'affiliateEpic'],
    status: 'LIVE',
    riskLevel: 'medium',
    nextActions: ['Complete checklist', 'Finalize production']
  }
];
