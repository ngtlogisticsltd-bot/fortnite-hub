import { MaintenanceError, MaintenanceReport, MaintenanceStatus } from '../../maintenance/types';

let errorLog: MaintenanceError[] = [];
let resolvedLog: MaintenanceError[] = [];

export function getMaintenanceReport(): MaintenanceReport {
  const overallStatus: MaintenanceStatus = errorLog.length > 0 
    ? (errorLog.some(e => e.severity === 'critical') ? 'critical' : 'warning') 
    : 'healthy';

  return {
    timestamp: new Date().toISOString(),
    overallStatus,
    activeErrors: errorLog,
    resolvedErrors: resolvedLog,
    lastBuildStatus: 'success',
    uptime: '99.99%'
  };
}

export async function runMaintenanceCycle() {
  // 1. Scan for new issues (Mocked logic for common Next.js/Admin issues)
  const potentialIssues: Partial<MaintenanceError>[] = [
    { 
      source: 'Admin Routing', 
      message: 'Detected high latency in /admin/command-center', 
      severity: 'warning', 
      suggestedFix: 'Clear component cache', 
      risk: 'low' 
    },
    { 
      source: 'API Gateway', 
      message: 'Rate limit threshold approaching on Fortnite API', 
      severity: 'warning', 
      suggestedFix: 'Enable secondary API key', 
      risk: 'medium' 
    }
  ];

  // Randomly "discover" issues if the log is empty
  if (errorLog.length === 0 && Math.random() > 0.5) {
    const issue = potentialIssues[Math.floor(Math.random() * potentialIssues.length)];
    const newError: MaintenanceError = {
      id: Math.random().toString(36).substring(7),
      source: issue.source!,
      message: issue.message!,
      severity: issue.severity!,
      timestamp: new Date().toISOString(),
      suggestedFix: issue.suggestedFix!,
      risk: issue.risk!,
      status: 'pending'
    };
    errorLog.push(newError);
  }

  // 2. Auto-fix low risk issues
  for (let i = errorLog.length - 1; i >= 0; i--) {
    const error = errorLog[i];
    if (error.risk === 'low' && error.status === 'pending') {
      error.status = 'resolved';
      resolvedLog.unshift(errorLog.splice(i, 1)[0]);
    }
  }

  return getMaintenanceReport();
}

export async function resolveError(id: string) {
  const index = errorLog.findIndex(e => e.id === id);
  if (index !== -1) {
    const error = errorLog[index];
    error.status = 'resolved';
    resolvedLog.unshift(errorLog.splice(index, 1)[0]);
    return true;
  }
  return false;
}
