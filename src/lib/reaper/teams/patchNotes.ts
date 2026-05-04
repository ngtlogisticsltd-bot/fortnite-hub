import { ReaperTeam, ReaperLog } from '../types';

export const team: ReaperTeam = {
  id: 'patch-notes',
  name: 'Patch Notes',
  purpose: 'Tracks game updates and summarizes changes.',
  enabled: true,
  schedule: 'weekly',
  riskLevel: 'low',
  approvalRequired: false,
  run: async (): Promise<ReaperLog> => {
    // fetch → validate → stage
    return { teamId: 'patch-notes', timestamp: new Date().toISOString(), status: 'SUCCESS', source: 'mock', message: 'MOCK: Simulated patch note detection.' };
  }
};
