export type RiskLevel = 'low' | 'medium' | 'high';

export interface ReaperTeam {
  id: string;
  name: string;
  purpose: string;
  enabled: boolean;
  schedule: string;
  riskLevel: RiskLevel;
  approvalRequired: boolean;
  run: () => Promise<ReaperLog>;
}

export interface ReaperLog {
  teamId: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING_APPROVAL';
  source: 'live' | 'mock' | 'manual';
  message: string;
  details?: any;
}
