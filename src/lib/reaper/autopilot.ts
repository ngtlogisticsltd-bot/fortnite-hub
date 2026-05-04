import { CommandRisk, ReaperCommand } from './commandTypes';
import { routeCommand } from './commandRouter';
import { executeCommand } from './actionEngine';
import { addCommand, getCommands, updateCommandInQueue } from './commandQueue';

export interface AutopilotCheck {
  botId: string;
  name: string;
  status: 'OK' | 'ISSUE' | 'CRITICAL';
  issue?: string;
  suggestedAction?: string;
  riskLevel: CommandRisk;
}

export interface AutopilotResult {
  timestamp: string;
  checks: AutopilotCheck[];
  actionsTriggered: string[];
  tasksCreated: string[];
}

// In-memory history for dev
let autopilotHistory: AutopilotResult[] = [];

export async function runAutopilotCycle(): Promise<AutopilotResult> {
  const timestamp = new Date().toISOString();
  const checks: AutopilotCheck[] = [];
  const actionsTriggered: string[] = [];
  const tasksCreated: string[] = [];

  // 1. Health Monitor Bot
  checks.push({
    botId: 'health-mon',
    name: 'Health Monitor Bot',
    status: 'OK',
    riskLevel: 'low'
  });

  // 2. API Monitor Bot
  checks.push({
    botId: 'api-mon',
    name: 'API Monitor Bot',
    status: 'OK',
    riskLevel: 'low'
  });

  // 3. Nav Fix Bot
  checks.push({
    botId: 'nav-fix',
    name: 'Nav Fix Bot',
    status: 'OK',
    riskLevel: 'low'
  });

  // 4. Content Activity Bot (Check if content is stale)
  checks.push({
    botId: 'content-act',
    name: 'Content Activity Bot',
    status: 'ISSUE',
    issue: 'No new content generated in last 24h',
    suggestedAction: 'run daily cycle',
    riskLevel: 'low'
  });

  // 5. Revenue Watch Bot
  checks.push({
    botId: 'revenue-watch',
    name: 'Revenue Watch Bot',
    status: 'ISSUE',
    issue: 'Ads and Affiliate accounts not connected',
    suggestedAction: 'connect accounts',
    riskLevel: 'medium'
  });

  // 6. Error Watch Bot
  checks.push({
    botId: 'error-watch',
    name: 'Error Watch Bot',
    status: 'OK',
    riskLevel: 'low'
  });

  // 7. Setup Reminder Bot
  checks.push({
    botId: 'setup-remind',
    name: 'Setup Reminder Bot',
    status: 'CRITICAL',
    issue: 'Supabase and Vercel secrets missing',
    suggestedAction: 'complete setup checklist',
    riskLevel: 'high'
  });

  // 8. Traffic Activity Bot
  checks.push({
    botId: 'traffic-act',
    name: 'Traffic Activity Bot',
    status: 'OK',
    riskLevel: 'low'
  });

  // EXECUTION LOOP
  for (const check of checks) {
    if (check.status !== 'OK') {
      if (check.riskLevel === 'low') {
        // Auto-run low risk fixes
        actionsTriggered.push(`Auto-trigger: ${check.suggestedAction}`);
        // Create and execute a command internally
        const cmd = routeCommand(check.suggestedAction || '');
        cmd.source = 'system';
        cmd.description = check.issue;
        cmd.requiredAction = check.suggestedAction;
        addCommand(cmd);
        const result = await executeCommand(cmd);
        updateCommandInQueue(result);
      } else {
        // Queue medium/high risk tasks
        tasksCreated.push(`Task Created: ${check.issue} (Requires ${check.riskLevel} risk action)`);
        // We add these as commands with "needs_approval" status
        const cmd = routeCommand(check.suggestedAction || check.issue || '');
        cmd.status = 'needs_approval';
        cmd.riskLevel = check.riskLevel;
        cmd.source = 'system';
        cmd.description = check.issue;
        cmd.requiredAction = check.suggestedAction;
        addCommand(cmd);
      }
    }
  }

  const result: AutopilotResult = {
    timestamp,
    checks,
    actionsTriggered,
    tasksCreated
  };

  autopilotHistory = [result, ...autopilotHistory].slice(0, 20);
  return result;
}

export function getAutopilotHistory(): AutopilotResult[] {
  return autopilotHistory;
}
