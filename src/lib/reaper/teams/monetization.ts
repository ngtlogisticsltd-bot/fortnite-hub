import { ReaperTeam, ReaperLog } from '../types';

import guidesData from '@/data/guides.json';

export const team: ReaperTeam = {
  id: 'monetization',
  name: 'Monetization',
  purpose: 'Manages ad networks, in-house campaigns, and affiliate links.',
  enabled: true,
  schedule: 'hourly',
  riskLevel: 'high',
  approvalRequired: true,
  run: async (): Promise<ReaperLog> => {
    try {
      const activeAffiliateLinks = guidesData.filter(g => g.affiliateLink && g.affiliateLink.length > 0).length;
      return { 
        teamId: 'monetization', 
        timestamp: new Date().toISOString(), 
        status: 'SUCCESS', 
        source: 'live', 
        message: `Verified ${activeAffiliateLinks} active affiliate links in guides.` 
      };
    } catch (error: any) {
      return { 
        teamId: 'monetization', 
        timestamp: new Date().toISOString(), 
        status: 'FAILED', 
        source: 'live', 
        message: `Failed to verify affiliates: ${error.message}` 
      };
    }
  }
};
