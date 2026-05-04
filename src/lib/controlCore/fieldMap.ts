export interface IntakeField {
  id: string;
  label: string;
  section: string;
  type: 'text' | 'password' | 'checkbox' | 'url' | 'email';
  sensitive: boolean;
  dependency?: string[]; // Teams waiting for this field
}

export const INTAKE_FIELDS: IntakeField[] = [
  // SECTION 1 — Brand
  { id: 'siteName', label: 'Site Name', section: 'Brand', type: 'text', sensitive: false, dependency: ['Growth Engine', 'REAPER Assistant'] },
  { id: 'publicSiteUrl', label: 'Public Site URL', section: 'Brand', type: 'url', sensitive: false, dependency: ['SEO Engine', 'Sitemap'] },
  { id: 'tagline', label: 'Tagline', section: 'Brand', type: 'text', sensitive: false },
  { id: 'contactEmail', label: 'Contact Email', section: 'Brand', type: 'email', sensitive: false },
  { id: 'creatorCode', label: 'Creator Code', section: 'Brand', type: 'text', sensitive: false, dependency: ['Revenue Engine'] },
  { id: 'disclaimerConfirmed', label: 'Unofficial Fan Site Disclaimer Confirmed', section: 'Brand', type: 'checkbox', sensitive: false, dependency: ['Legal Team'] },

  // SECTION 2 — GitHub
  { id: 'githubUsername', label: 'GitHub Username', section: 'GitHub', type: 'text', sensitive: false },
  { id: 'githubRepoUrl', label: 'GitHub Repo URL', section: 'GitHub', type: 'url', sensitive: false, dependency: ['Deployment Team'] },
  { id: 'githubTokenExists', label: 'GitHub Token Configured', section: 'GitHub', type: 'checkbox', sensitive: true, dependency: ['Deployment Team'] },

  // SECTION 5 — Supabase
  { id: 'supabaseUrl', label: 'Supabase URL', section: 'Supabase', type: 'url', sensitive: false, dependency: ['Data Vault'] },
  { id: 'supabaseAnonKey', label: 'Supabase Anon Key', section: 'Supabase', type: 'password', sensitive: true, dependency: ['Data Vault'] },
  { id: 'supabaseServiceKey', label: 'Supabase Service Role Key', section: 'Supabase', type: 'password', sensitive: true, dependency: ['Data Vault'] },

  // SECTION 8 — Ads
  { id: 'adNetwork', label: 'Ad Network', section: 'Ads', type: 'text', sensitive: false, dependency: ['Revenue Engine'] },
  { id: 'adClientId', label: 'Publisher/Client ID', section: 'Ads', type: 'text', sensitive: false, dependency: ['Revenue Engine'] },
  { id: 'adsEnabled', label: 'Ads Enabled', section: 'Ads', type: 'checkbox', sensitive: false },

  // SECTION 10 — Social APIs
  { id: 'youtubeApiKey', label: 'YouTube API Key', section: 'Social APIs', type: 'password', sensitive: true, dependency: ['Media Engine'] },
  { id: 'discordWebhook', label: 'Discord Webhook URL', section: 'Social APIs', type: 'password', sensitive: true, dependency: ['Community Ops'] },
  
  // SECTION 11 — Creator/Media
  { id: 'noReuploadConfirmed', label: 'No Re-upload Policy Confirmed', section: 'Creator/Media', type: 'checkbox', sensitive: false, dependency: ['Legal Team'] },
];

export const MASK_CHAR = '•';

export function maskValue(value: string | undefined): string {
  if (!value) return '';
  return MASK_CHAR.repeat(Math.min(value.length, 12));
}
