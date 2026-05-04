export type ITBotStatus = 'OK' | 'WARNING' | 'ERROR' | 'MANUAL' | 'NEEDS_ACTION' | 'LIVE';
export type ITRiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ITBot {
  id: string;
  name: string;
  purpose: string;
  status: ITBotStatus;
  riskLevel: ITRiskLevel;
  approvalRequired: boolean;
  checks: string[];
  nextActions: string[];
}

export interface ITDevTeam {
  id: string;
  name: string;
  purpose: string;
  bots: ITBot[];
}

export const itDevTeam: ITDevTeam = {
  id: 'it-dev-oversight',
  name: 'IT & Development Oversight Team',
  purpose: 'Keeps FortHub stable, fast, secure, deployable, and production-ready.',
  bots: [
    {
      id: 'build-watcher',
      name: 'Build Watcher Bot',
      purpose: 'Monitors npm build status and static generation integrity.',
      status: 'MANUAL',
      riskLevel: 'High',
      approvalRequired: false,
      checks: ['npm run build results', 'Static export warnings', 'Hydration error logs'],
      nextActions: ['Run local build before push', 'Check Vercel deployment logs']
    },
    {
      id: 'route-health',
      name: 'Route Health Bot',
      purpose: 'Tracks critical public and admin routes for availability.',
      status: 'OK',
      riskLevel: 'Medium',
      approvalRequired: false,
      checks: ['Public navigation paths', 'Admin panel accessibility', '404 page status'],
      nextActions: ['Scan /admin/nav-health periodically']
    },
    {
      id: 'api-health',
      name: 'API Health Bot',
      purpose: 'Verifies operational status of all backend endpoints.',
      status: 'OK',
      riskLevel: 'High',
      approvalRequired: false,
      checks: ['/api/health', '/api/reaper/status', '/api/data-dispatcher'],
      nextActions: ['Implement automated heartbeat check']
    },
    {
      id: 'nav-qa',
      name: 'Navigation QA Bot',
      purpose: 'Ensures dropdowns and menus meet accessibility and UX standards.',
      status: 'OK',
      riskLevel: 'Low',
      approvalRequired: false,
      checks: ['Dropdown hover/click logic', 'Keyboard accessibility', 'Mobile menu toggle'],
      nextActions: ['Manual UI audit once per release']
    },
    {
      id: 'security-guard',
      name: 'Security Guard Bot',
      purpose: 'Monitors admin authentication and sensitive endpoint protection.',
      status: 'WARNING',
      riskLevel: 'Critical',
      approvalRequired: true,
      checks: ['ADMIN_PASS strength', 'Middleware protection', 'CSRF headers'],
      nextActions: ['Update default secure123 password', 'Rotate API keys']
    },
    {
      id: 'env-auditor',
      name: 'Env Var Auditor Bot',
      purpose: 'Checks for missing or malformed environment variables.',
      status: 'NEEDS_ACTION',
      riskLevel: 'High',
      approvalRequired: true,
      checks: ['Control Core synchronization', '.env.example alignment', 'Vercel secret audit'],
      nextActions: ['Sync Control Core with .env.local']
    },
    {
      id: 'performance-watcher',
      name: 'Performance Watcher Bot',
      purpose: 'Flags heavy assets and identifies optimization opportunities.',
      status: 'OK',
      riskLevel: 'Medium',
      approvalRequired: false,
      checks: ['Bundle size', 'Image optimization', 'Cosmetics cache TTL'],
      nextActions: ['Audit Lucide icon imports for tree-shaking']
    },
    {
      id: 'legal-safety-dev',
      name: 'Legal Safety Dev Bot',
      purpose: 'Checks for trademark violations and missing disclaimers.',
      status: 'LIVE',
      riskLevel: 'High',
      approvalRequired: false,
      checks: ['Epic Games Fan Content Policy', 'Unofficial labeling', 'Affiliate disclosures'],
      nextActions: ['Review /disclosures page for compliance']
    },
    {
      id: 'error-log-bot',
      name: 'Error Log Bot',
      purpose: 'Aggregates and summarizes recent runtime and build errors.',
      status: 'OK',
      riskLevel: 'Medium',
      approvalRequired: false,
      checks: ['Server-side console logs', 'Client-side error boundaries'],
      nextActions: ['Check /api/reaper/logs if available']
    },
    {
      id: 'deploy-readiness',
      name: 'Deployment Readiness Bot',
      purpose: 'Tracks external service status (GitHub, Vercel, Supabase).',
      status: 'MANUAL',
      riskLevel: 'High',
      approvalRequired: true,
      checks: ['GitHub Repo status', 'Supabase schema sync', 'Domain DNS health'],
      nextActions: ['Verify Supabase connection strings']
    }
  ]
};
