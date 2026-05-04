export type LinkedSiteStatus = 'LIVE' | 'NEEDS_DOMAIN' | 'MOCK' | 'OPTIONAL_LATER';

export interface LinkedSite {
  id: string;
  name: string;
  type: string;
  url: string;
  status: LinkedSiteStatus;
  purpose: string;
  ownerActionRequired: string;
  requiredEnvVars: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
}

export const linkedSites: LinkedSite[] = [
  {
    id: 'forthub-main',
    name: 'FortHub Main Site',
    type: 'Primary Web Property',
    url: '/',
    status: 'NEEDS_DOMAIN',
    purpose: 'Core fan media portal, live item shop, news, and guides.',
    ownerActionRequired: 'Connect primary domain via Vercel.',
    requiredEnvVars: ['NEXT_PUBLIC_SITE_URL'],
    riskLevel: 'Low',
    notes: 'The flagship property.'
  },
  {
    id: 'media-kit',
    name: 'Media Kit Site',
    type: 'B2B Portal',
    url: '/media-kit',
    status: 'LIVE',
    purpose: 'Showcase traffic, audience demographics, and sponsor packages.',
    ownerActionRequired: 'Update with real traffic screenshots once Analytics is live.',
    requiredEnvVars: [],
    riskLevel: 'Low',
    notes: 'Crucial for direct ad sales.'
  },
  {
    id: 'sponsor-portal',
    name: 'Sponsor Portal',
    type: 'Internal Routing',
    url: '/admin/revenue',
    status: 'LIVE',
    purpose: 'Manage active sponsor campaigns and ad slots.',
    ownerActionRequired: 'Review incoming requests.',
    requiredEnvVars: [],
    riskLevel: 'High',
    notes: 'All active sponsor placements must be labeled correctly.'
  },
  {
    id: 'fan-submission',
    name: 'Fan Submission Portal',
    type: 'Public Tool',
    url: '/submit',
    status: 'LIVE',
    purpose: 'Gather PR-style contributions from the community.',
    ownerActionRequired: 'Monitor /admin/submissions.',
    requiredEnvVars: ['DATABASE_URL'],
    riskLevel: 'Medium',
    notes: 'A database is required to store submissions permanently.'
  },
  {
    id: 'newsletter-landing',
    name: 'Newsletter Landing Page',
    type: 'Conversion Funnel',
    url: '/community',
    status: 'LIVE',
    purpose: 'Capture fan emails for the daily drop.',
    ownerActionRequired: 'Connect email provider API.',
    requiredEnvVars: ['NEWSLETTER_API_KEY'],
    riskLevel: 'Medium',
    notes: 'Double opt-in recommended.'
  },
  {
    id: 'community-hub',
    name: 'Community Hub',
    type: 'External Platform',
    url: 'Discord Server',
    status: 'OPTIONAL_LATER',
    purpose: 'Real-time chat and LFG for readers.',
    ownerActionRequired: 'Create Discord server and webhook.',
    requiredEnvVars: ['DISCORD_WEBHOOK_URL'],
    riskLevel: 'High',
    notes: 'Requires active human moderation.'
  },
  {
    id: 'future-store',
    name: 'Future Storefront',
    type: 'E-commerce',
    url: 'store.forthub.com',
    status: 'OPTIONAL_LATER',
    purpose: 'Sell FortHub branded apparel (no Epic IP).',
    ownerActionRequired: 'Setup Shopify/Printful.',
    requiredEnvVars: [],
    riskLevel: 'High',
    notes: 'Never sell items resembling official Fortnite merchandise.'
  },
  {
    id: 'future-blogs',
    name: 'Future Blog Network',
    type: 'Satellite Sites',
    url: 'Various',
    status: 'OPTIONAL_LATER',
    purpose: 'Spin off niche content (e.g., specific game modes) into separate domains.',
    ownerActionRequired: 'Scale core site traffic first.',
    requiredEnvVars: [],
    riskLevel: 'Low',
    notes: 'Wait until Main Site exceeds 100k MAU.'
  },
  {
    id: 'shorts-hub',
    name: 'Shorts/Clips Hub',
    type: 'Video Network',
    url: 'YouTube / TikTok',
    status: 'OPTIONAL_LATER',
    purpose: 'Distribute daily item shop and update clips.',
    ownerActionRequired: 'Create accounts and authenticate APIs.',
    requiredEnvVars: ['YOUTUBE_API_KEY', 'TIKTOK_API_KEY'],
    riskLevel: 'Medium',
    notes: 'Video automation must not use copyrighted audio.'
  },
  {
    id: 'warlock-portal',
    name: 'WARLOCK / Operator Portal',
    type: 'Admin Control Center',
    url: '/admin',
    status: 'LIVE',
    purpose: 'The central nervous system for all properties.',
    ownerActionRequired: 'Keep credentials secure.',
    requiredEnvVars: ['ADMIN_USER', 'ADMIN_PASS'],
    riskLevel: 'High',
    notes: 'This entire dashboard system.'
  }
];
