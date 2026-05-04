export interface ControlCoreData {
  githubRepo: string;
  vercelProject: string;
  domain: string;

  adminUser: string;
  adminPass: string;

  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;

  analyticsProvider: string;
  analyticsId: string;

  newsletterProvider: string;
  newsletterApiKey: string;

  adNetwork: string;
  adClientId: string;

  affiliateAmazon: string;
  affiliateEpic: string;

  creatorCode: string;

  youtubeApiKey: string;
  redditClientId: string;
  redditClientSecret: string;
  discordWebhookUrl: string;
  tiktokApiKey: string;
  xApiKey: string;
  metaAccessToken: string;

  lastUpdated: string;
}

// In a real app, this would be in a database or encrypted storage.
// For now, we'll read from process.env and provide a way to "update" (mocked).
let mockStore: ControlCoreData = {
  githubRepo: process.env.GITHUB_REPO_URL || '',
  vercelProject: process.env.VERCEL_PROJECT_ID || '',
  domain: process.env.NEXT_PUBLIC_SITE_URL || '',

  adminUser: process.env.ADMIN_USER || '',
  adminPass: process.env.ADMIN_PASS || '',

  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  analyticsProvider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || '',
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',

  newsletterProvider: 'Mailchimp', // Example default
  newsletterApiKey: process.env.NEWSLETTER_API_KEY || '',

  adNetwork: 'AdSense',
  adClientId: process.env.NEXT_PUBLIC_ADSENSE_ID || '',

  affiliateAmazon: process.env.AMAZON_AFFILIATE_ID || '',
  affiliateEpic: process.env.EPIC_CREATOR_CODE || '',

  creatorCode: process.env.NEXT_PUBLIC_CREATOR_CODE || '',

  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  redditClientId: process.env.REDDIT_CLIENT_ID || '',
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET || '',
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
  tiktokApiKey: process.env.TIKTOK_API_KEY || '',
  xApiKey: process.env.X_API_KEY || '',
  metaAccessToken: process.env.META_ACCESS_TOKEN || '',

  lastUpdated: new Date().toISOString(),
};

export function getControlData(): ControlCoreData {
  return { ...mockStore };
}

export function updateControlData(updates: Partial<ControlCoreData>): ControlCoreData {
  mockStore = {
    ...mockStore,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  return { ...mockStore };
}

export function maskSecret(value: string): string {
  if (!value) return '';
  if (value.length <= 8) return '********';
  return `${value.substring(0, 4)}********${value.substring(value.length - 4)}`;
}

export function getMaskedControlData() {
  const data = getControlData();
  const masked: any = { ...data };

  // List of fields to mask
  const secretFields = [
    'adminPass',
    'supabaseAnonKey',
    'supabaseServiceRoleKey',
    'newsletterApiKey',
    'youtubeApiKey',
    'redditClientSecret',
    'tiktokApiKey',
    'xApiKey',
    'metaAccessToken',
    'discordWebhookUrl'
  ];

  secretFields.forEach(field => {
    if (masked[field]) {
      masked[field] = maskSecret(masked[field]);
    }
  });

  return masked;
}

export function getControlSummary() {
  const data = getControlData();
  const fields = Object.keys(data).filter(k => k !== 'lastUpdated');
  const filled = fields.filter(k => !!(data as any)[k]);
  
  return {
    totalFields: fields.length,
    filledFields: filled.length,
    percentComplete: Math.round((filled.length / fields.length) * 100),
    lastUpdated: data.lastUpdated,
  };
}
