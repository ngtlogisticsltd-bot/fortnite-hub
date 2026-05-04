export type TeamStatus = 'LIVE' | 'MOCK' | 'MANUAL' | 'NEEDS_ACCOUNT' | 'NEEDS_APPROVAL' | 'NEEDS_ACTION';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface OperationsTeam {
  id: string;
  name: string;
  purpose: string[];
  status: TeamStatus;
  riskLevel: RiskLevel;
  approvalRequired: boolean;
  requiredEnvVars: string[];
  routesOwned: string[];
  nextActions: string[];
  legalNotes: string;
}

export const operationsTeams: OperationsTeam[] = [
  {
    id: 'domain-team',
    name: 'Domain Team',
    purpose: ['Track domain setup', 'DNS checklist', 'SSL checklist', 'NEXT_PUBLIC_SITE_URL setup'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'Medium',
    approvalRequired: false,
    requiredEnvVars: ['NEXT_PUBLIC_SITE_URL'],
    routesOwned: [],
    nextActions: ['Buy domain', 'Configure DNS', 'Set Env Var'],
    legalNotes: 'Ensure domain does not infringe on Epic Games trademarks.'
  },
  {
    id: 'hosting-team',
    name: 'Hosting/Vercel Team',
    purpose: ['Deployment checklist', 'Vercel env variable checklist', 'Build command verification', 'Production URL checklist'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'Medium',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: [],
    nextActions: ['Connect GitHub to Vercel', 'Add production env vars'],
    legalNotes: 'None'
  },
  {
    id: 'admin-security-team',
    name: 'Admin Security Team',
    purpose: ['ADMIN_USER / ADMIN_PASS validation', 'Warn if password is secure123', 'Check /admin is protected'],
    status: 'NEEDS_ACTION',
    riskLevel: 'High',
    approvalRequired: false,
    requiredEnvVars: ['ADMIN_USER', 'ADMIN_PASS'],
    routesOwned: ['/admin/*'],
    nextActions: ['Change default secure123 password', 'Ensure robots.txt blocks /admin'],
    legalNotes: 'Admin panels must never be publicly indexable.'
  },
  {
    id: 'analytics-team',
    name: 'Analytics Team',
    purpose: ['Track analytics provider status', 'Support placeholder for Google Analytics', 'No fake traffic'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'Low',
    approvalRequired: false,
    requiredEnvVars: ['NEXT_PUBLIC_ANALYTICS_ID'],
    routesOwned: [],
    nextActions: ['Create GA4 Property', 'Add ID to Vercel'],
    legalNotes: 'Must include cookie consent for EU/GDPR compliance.'
  },
  {
    id: 'database-team',
    name: 'Database/Supabase Team',
    purpose: ['Prepare database schema', 'Show connection status', 'Store submissions and clicks'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'High',
    approvalRequired: false,
    requiredEnvVars: ['DATABASE_URL', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'],
    routesOwned: ['/api/submissions', '/api/tracking/click'],
    nextActions: ['Create Supabase Project', 'Run schema.sql'],
    legalNotes: 'Ensure PII (emails) are stored securely.'
  },
  {
    id: 'newsletter-team',
    name: 'Newsletter Team',
    purpose: ['Newsletter signup placeholder', 'Email provider checklist', 'Store pending subscribers'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'Medium',
    approvalRequired: false,
    requiredEnvVars: ['NEWSLETTER_API_KEY'],
    routesOwned: ['/community'],
    nextActions: ['Choose provider (Resend/Mailchimp)', 'Connect API key'],
    legalNotes: 'Must include CAN-SPAM compliant unsubscribe links.'
  },
  {
    id: 'ad-network-team',
    name: 'Ad Network Team',
    purpose: ['AdSense readiness checklist', 'Original content checklist', 'Policy-safe ad placement'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: ['NEXT_PUBLIC_ADSENSE_ID'],
    routesOwned: ['/admin/ads'],
    nextActions: ['Publish 15 original guides', 'Apply for AdSense'],
    legalNotes: 'AdSense requires high-quality original content and strict policy adherence.'
  },
  {
    id: 'affiliate-team',
    name: 'Affiliate Team',
    purpose: ['Affiliate account checklist', 'Affiliate disclosure enforcement', 'Track affiliate clicks'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'Medium',
    approvalRequired: true,
    requiredEnvVars: ['NEXT_PUBLIC_CREATOR_CODE'],
    routesOwned: ['/admin/revenue'],
    nextActions: ['Apply for Support-A-Creator', 'Add Amazon Associates'],
    legalNotes: 'FTC Disclosures must be clearly visible on pages containing affiliate links.'
  },
  {
    id: 'sponsor-team',
    name: 'Sponsor / Media Kit Team',
    purpose: ['Maintain /media-kit', 'Sponsor inquiry flow', 'Direct ad campaign checklist'],
    status: 'MANUAL',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/media-kit'],
    nextActions: ['Finalize media kit pricing', 'Open submissions'],
    legalNotes: 'Sponsored content must be explicitly labeled as "Sponsored".'
  },
  {
    id: 'social-team',
    name: 'Social Platform Team',
    purpose: ['Track API integration status', 'Generate manual posts', 'Do not auto-post without permissions'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: ['YOUTUBE_API_KEY', 'REDDIT_CLIENT_ID', 'TIKTOK_API_KEY', 'X_API_KEY', 'DISCORD_WEBHOOK_URL'],
    routesOwned: [],
    nextActions: ['Create platform developer accounts', 'Configure webhooks'],
    legalNotes: 'Auto-posting bots must abide by platform-specific TOS/spam rules.'
  },
  {
    id: 'live-item-shop',
    name: 'Live Item Shop Team',
    purpose: ['Live item shop API data', '/item-shop', '/fortnite-item-shop-today'],
    status: 'LIVE',
    riskLevel: 'Low',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['/item-shop', '/fortnite-item-shop-today'],
    nextActions: [],
    legalNotes: 'Must attribute data to unofficial public APIs.'
  },
  {
    id: 'live-news',
    name: 'Live News Team',
    purpose: ['Live Fortnite news API', '/news', '/fortnite-update-today'],
    status: 'LIVE',
    riskLevel: 'Low',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['/news', '/fortnite-update-today'],
    nextActions: [],
    legalNotes: 'Must not scrape private Epic endpoints.'
  },
  {
    id: 'live-skins',
    name: 'Live Skins/Cosmetics Team',
    purpose: ['Live cosmetics API', '/skins', 'limited fetch for performance'],
    status: 'LIVE',
    riskLevel: 'Low',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['/skins'],
    nextActions: [],
    legalNotes: 'Cosmetic images belong to Epic Games. Fair use context only.'
  },
  {
    id: 'seo-pages',
    name: 'SEO Pages Team',
    purpose: ['sitemap', 'robots', 'metadata', 'SEO page templates'],
    status: 'LIVE',
    riskLevel: 'Low',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['/sitemap.xml', '/robots.txt'],
    nextActions: [],
    legalNotes: 'Ensure /admin and /api are disallowed in robots.txt.'
  },
  {
    id: 'submit-team',
    name: 'Submit/Fan Contribution Team',
    purpose: ['/submit', '/admin/submissions', 'news tip/guide suggestions'],
    status: 'NEEDS_APPROVAL',
    riskLevel: 'Medium',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/submit', '/admin/submissions'],
    nextActions: ['Review pending queue daily'],
    legalNotes: 'User generated content must be reviewed for TOS violations.'
  },
  {
    id: 'legal-protection',
    name: 'Legal Protection Team',
    purpose: ['Disclaimers', 'Privacy', 'Terms', 'Fan site policy warnings'],
    status: 'LIVE',
    riskLevel: 'High',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['/disclosures', '/privacy', '/terms', '/cookie-policy'],
    nextActions: [],
    legalNotes: 'Must state: "Unofficial fan site. Not affiliated with Epic Games."'
  },
  {
    id: 'daily-engine',
    name: 'Daily Engine Team',
    purpose: ['/admin/daily', 'generate daily site tasks', 'stage content'],
    status: 'MANUAL',
    riskLevel: 'Medium',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/admin/daily'],
    nextActions: ['Run daily cycle'],
    legalNotes: 'Do not auto-post generated content without review.'
  },
  {
    id: 'content-quality',
    name: 'Content Quality Team',
    purpose: ['Original guide checker', 'Thin content warnings', 'No AI spam warnings'],
    status: 'NEEDS_APPROVAL',
    riskLevel: 'Medium',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/guides'],
    nextActions: ['Write human-readable summaries'],
    legalNotes: 'AI content must be heavily edited to provide real value.'
  },
  {
    id: 'revenue-ops',
    name: 'Revenue Ops Team',
    purpose: ['/admin/revenue', 'ad slot readiness', 'click tracking'],
    status: 'NEEDS_ACCOUNT',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/admin/revenue'],
    nextActions: ['Connect analytics tracking'],
    legalNotes: 'No fake revenue claims or click fraud.'
  },
  {
    id: 'shutdown-protection',
    name: 'Shutdown Protection Team',
    purpose: ['scan for risky claims', 'scan for official-brand confusion', 'scan for scraping'],
    status: 'LIVE',
    riskLevel: 'High',
    approvalRequired: false,
    requiredEnvVars: [],
    routesOwned: ['*'],
    nextActions: [],
    legalNotes: 'Strict adherence to Epic Games Fan Content Policy.'
  },
  {
    id: 'data-dispatcher',
    name: 'Data Dispatcher Team',
    purpose: ['Pull data from APIs', 'Normalize data schema', 'Route to feed/pages', 'Risk check content'],
    status: 'MANUAL',
    riskLevel: 'Medium',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/api/data-dispatcher', '/live-feed'],
    nextActions: ['Run first dispatch cycle', 'Review routed content'],
    legalNotes: 'Ensure source attribution is always present.'
  },
  {
    id: 'community-chat-team',
    name: 'Community Chat Team',
    purpose: ['Moderate public chat', 'Filter spam/profanity', 'Manage pending queue', 'Fan safety warnings'],
    status: 'NEEDS_APPROVAL',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/community/chat', '/admin/community-chat'],
    nextActions: ['Moderate pending messages', 'Connect Supabase for persistence'],
    legalNotes: 'Must comply with privacy laws regarding user data.'
  },
  {
    id: 'weekly-draw-team',
    name: 'Weekly Draw Team',
    purpose: ['Hype waitlist collection', 'Collect early access fans', 'Legal rules preparation', 'Milestone tracking'],
    status: 'MANUAL',
    riskLevel: 'High',
    approvalRequired: true,
    requiredEnvVars: [],
    routesOwned: ['/weekly-draw', '/admin/weekly-draw'],
    nextActions: ['Monitor waitlist growth', 'Finalize legal prize pool', 'Verify milestone rewards'],
    legalNotes: 'Mode: WAITLIST. Strictly NO PURCHASE NECESSARY. Not affiliated with Epic Games.'
  },
  {
    id: 'it-dev-oversight',
    name: 'IT & Development Oversight Team',
    purpose: ['Site health monitoring', 'Route availability', 'API operational status', 'Security auditing'],
    status: 'LIVE',
    riskLevel: 'High',
    approvalRequired: false,
    requiredEnvVars: ['ADMIN_PASS'],
    routesOwned: ['/admin/it-dev', '/admin/nav-health', '/api/it-dev/*'],
    nextActions: ['Run IT & Dev health check before deployment', 'Audit Admin security'],
    legalNotes: 'Ensures system integrity and Fan Content Policy adherence at a code level.'
  }
];
