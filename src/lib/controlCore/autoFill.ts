import { getControlData, maskSecret } from './store';

export interface AutoFillResult {
  context: string;
  availableFields: Record<string, string>;
  missingFields: string[];
  maskedFields: string[];
  warnings: string[];
  nextActions: string[];
}

const contextMappings: Record<string, string[]> = {
  github: ['githubRepo'],
  domain: ['domain'],
  vercel: ['vercelProject', 'githubRepo', 'domain'],
  supabase: ['supabaseUrl', 'supabaseAnonKey', 'supabaseServiceRoleKey'],
  analytics: ['analyticsProvider', 'analyticsId'],
  newsletter: ['newsletterProvider', 'newsletterApiKey'],
  ads: ['adNetwork', 'adClientId', 'creatorCode'],
  affiliate: ['affiliateAmazon', 'affiliateEpic', 'creatorCode'],
  social: ['youtubeApiKey', 'redditClientId', 'redditClientSecret', 'discordWebhookUrl', 'tiktokApiKey', 'xApiKey', 'metaAccessToken'],
  revenue: ['adNetwork', 'adClientId', 'affiliateAmazon', 'affiliateEpic', 'creatorCode'],
  integrations: ['youtubeApiKey', 'redditClientId', 'redditClientSecret', 'discordWebhookUrl', 'tiktokApiKey', 'xApiKey', 'metaAccessToken', 'newsletterApiKey'],
  accounts: ['adminUser', 'githubRepo', 'vercelProject', 'domain', 'analyticsProvider', 'newsletterProvider'],
  submissions: ['adminUser', 'domain'],
  media: ['youtubeApiKey', 'creatorCode', 'domain'],
  deploy: ['githubRepo', 'vercelProject', 'domain', 'supabaseUrl'],
  setup: ['adminUser', 'adminPass', 'githubRepo', 'vercelProject', 'domain', 'supabaseUrl', 'analyticsId', 'newsletterApiKey', 'adClientId', 'affiliateAmazon', 'affiliateEpic'],
};

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

export function getAutoFillData(context: string): AutoFillResult {
  const data = getControlData();
  const fieldsToUse = contextMappings[context] || [];
  
  const availableFields: Record<string, string> = {};
  const missingFields: string[] = [];
  const maskedFields: string[] = [];
  const warnings: string[] = [];
  const nextActions: string[] = [];

  fieldsToUse.forEach(field => {
    const value = (data as any)[field];
    if (value) {
      if (secretFields.includes(field)) {
        availableFields[field] = maskSecret(value);
        maskedFields.push(field);
      } else {
        availableFields[field] = value;
      }
    } else {
      missingFields.push(field);
    }
  });

  // Context-specific logic
  if (context === 'github' && !data.githubRepo) {
    warnings.push('GitHub repository URL is not configured.');
    nextActions.push('Create a GitHub repository and add its URL to Control Core.');
  }

  if (context === 'deploy' && (!data.githubRepo || !data.vercelProject)) {
    warnings.push('Deployment requires both GitHub and Vercel configuration.');
    nextActions.push('Complete GitHub and Vercel setup in Control Core.');
  }

  if (secretFields.some(f => fieldsToUse.includes(f) && (data as any)[f])) {
    warnings.push('This context contains sensitive keys. Values are masked for security.');
  }

  return {
    context,
    availableFields,
    missingFields,
    maskedFields,
    warnings,
    nextActions
  };
}
