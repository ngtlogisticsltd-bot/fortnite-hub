import { ReaperTeam, ReaperLog } from '../types';

export const team: ReaperTeam = {
  id: 'content-ideas',
  name: 'Content Ideas',
  purpose: 'Generates safe manual content ideas for guides and pages.',
  enabled: true,
  schedule: 'daily',
  riskLevel: 'medium',
  approvalRequired: true,
  run: async (): Promise<ReaperLog> => {
    // Stage ideas to the dashboard for human approval
    const ideas = [
      "Top 5 landing spots in the current season",
      "How to counter the new mythical weapons",
      "XP Maps: Best creative codes for fast leveling",
      "Complete guide to the new battle pass skins"
    ];
    
    return {
      teamId: 'content-ideas',
      timestamp: new Date().toISOString(),
      status: 'PENDING_APPROVAL',
      source: 'manual',
      message: `Generated ${ideas.length} safe content ideas. Awaiting admin approval.`
    };
  }
};
