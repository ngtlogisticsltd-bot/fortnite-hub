export type MaintenanceStatus = 'healthy' | 'warning' | 'critical';
export type FixRisk = 'low' | 'medium' | 'high';

export interface MaintenanceError {
  id: string;
  source: string;
  message: string;
  severity: MaintenanceStatus;
  timestamp: string;
  suggestedFix: string;
  risk: FixRisk;
  status: 'pending' | 'fixing' | 'resolved' | 'failed';
}

export interface MaintenanceReport {
  timestamp: string;
  overallStatus: MaintenanceStatus;
  activeErrors: MaintenanceError[];
  resolvedErrors: MaintenanceError[];
  lastBuildStatus: 'success' | 'failure';
  uptime: string;
}
