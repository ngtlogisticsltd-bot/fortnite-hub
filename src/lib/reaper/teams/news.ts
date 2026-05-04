import { ReaperTeam, ReaperLog } from '../types';
import { getNews } from '@/lib/fortnite/api';

export const team: ReaperTeam = {
  id: 'news',
  name: 'News',
  purpose: 'Pulls official Fortnite news and reputable feeds hourly.',
  enabled: true,
  schedule: 'hourly',
  riskLevel: 'low',
  approvalRequired: false,
  run: async (): Promise<ReaperLog> => {
    try {
      const newsItems = await getNews();
      return { 
        teamId: 'news', 
        timestamp: new Date().toISOString(), 
        status: 'SUCCESS', 
        source: 'live',
        message: `Fetched ${newsItems.length} official news items.` 
      };
    } catch (error: any) {
      return { 
        teamId: 'news', 
        timestamp: new Date().toISOString(), 
        status: 'FAILED', 
        source: 'live',
        message: `Failed to fetch news: ${error.message}` 
      };
    }
  }
};
