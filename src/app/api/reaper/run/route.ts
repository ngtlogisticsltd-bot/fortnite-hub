import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/reaper/orchestrator';
import { runAutopilotCycle } from '@/lib/reaper/autopilot';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    
    if (body.mode === 'daily-cycle' || body.teamId === 'daily-loop') {
      const log = await orchestrator.executeTeam('daily-loop');
      return NextResponse.json({ success: true, log, logs: orchestrator.getLogs() });
    } else if (body.mode === 'safe-cycle' || !body.teamId) {
      await orchestrator.executeSafeOrder();
      return NextResponse.json({ success: true, message: 'REAPER cycle executed', logs: orchestrator.getLogs() });
    } else if (body.teamId) {
      const log = await orchestrator.executeTeam(body.teamId);
      await runAutopilotCycle();
      return NextResponse.json({ success: true, log, logs: orchestrator.getLogs() });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
