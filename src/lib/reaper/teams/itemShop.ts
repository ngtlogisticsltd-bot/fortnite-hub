import { ReaperTeam, ReaperLog } from '../types';
import { getItemShop } from '@/lib/fortnite/api';

export const team: ReaperTeam = {
  id: 'item-shop',
  name: 'Item Shop',
  purpose: 'Updates daily shop via API safely.',
  enabled: true,
  schedule: 'daily',
  riskLevel: 'low',
  approvalRequired: false,
  run: async (): Promise<ReaperLog> => {
    try {
      const shopItems = await getItemShop();
      return { 
        teamId: 'item-shop', 
        timestamp: new Date().toISOString(), 
        status: 'SUCCESS', 
        source: 'live',
        message: `Item shop data synced. Found ${shopItems.length} items.` 
      };
    } catch (error: any) {
      return { 
        teamId: 'item-shop', 
        timestamp: new Date().toISOString(), 
        status: 'FAILED', 
        source: 'live',
        message: `Failed to fetch item shop: ${error.message}` 
      };
    }
  }
};
