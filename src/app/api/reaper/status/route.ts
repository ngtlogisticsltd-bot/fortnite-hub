import { NextResponse } from 'next/server';
import { orchestrator, allTeams } from '@/lib/reaper/orchestrator';

export async function GET() {
  return NextResponse.json({
    teams: allTeams.map(t => ({
      id: t.id,
      name: t.name,
      purpose: t.purpose,
      schedule: t.schedule,
      enabled: t.enabled,
      riskLevel: t.riskLevel,
      approvalRequired: t.approvalRequired
    })),
    logs: orchestrator.getLogs()
  });
}
