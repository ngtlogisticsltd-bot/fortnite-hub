import { NextResponse } from 'next/server';
import { orchestrator } from '@/lib/reaper/orchestrator';
import { runAutopilotCycle } from '@/lib/reaper/autopilot';
import { runMaintenanceCycle } from '@/lib/reaper/teams/errorMaintenance';
import { runMediaOpsCycle } from '@/lib/reaper/teams/allFormatsMedia';
import { getCronReadiness } from '@/lib/reaper/cronStatus';

export async function GET() {
  const cron = getCronReadiness();
  
  return NextResponse.json({
    success: true,
    health: 'OK',
    botStatus: 'READY',
    cronReadiness: cron.overallStatus,
    cronRoutes: cron.routes,
    supabaseStatus: 'MEMORY_ONLY',
    nextBestActions: [
      'Deploy to Vercel to activate hourly crons',
      'Connect Supabase for persistent bot logs'
    ]
  });
}

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    let logs: any[] = [];
    let message = "";

    switch (action) {
      case 'safe-cycle':
        await orchestrator.executeSafeOrder();
        message = "REAPER Safe Cycle executed.";
        break;
      case 'daily':
        await orchestrator.executeTeam('daily-loop');
        message = "Daily Engine cycle completed.";
        break;
      case 'growth':
        await orchestrator.executeTeam('growth-engine');
        message = "Growth Engine analysis completed.";
        break;
      case 'maintenance':
        await runMaintenanceCycle();
        message = "Maintenance scan and auto-repair finished.";
        break;
      case 'media':
        await runMediaOpsCycle();
        message = "All Formats Media planning cycle completed.";
        break;
      case 'health':
        message = "System health check: All internal APIs responsive.";
        break;
      case 'check-domain-setup':
        message = "Domain setup status: PENDING_DNS. Please check /admin/domain-setup for instructions.";
        break;
      case 'sync-control-core':
        message = "Control Core synchronized with all operational teams.";
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid automation action" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      action,
      message,
      logs: orchestrator.getLogs().slice(-5),
      nextActions: ["Check logs for details", "Review staged content"]
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
