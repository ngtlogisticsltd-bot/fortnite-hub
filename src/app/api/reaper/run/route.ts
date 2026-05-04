import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { orchestrator } from "@/lib/reaper/orchestrator";
import { runAutopilotCycle } from "@/lib/reaper/autopilot";
import { logEvent } from "@/lib/reaper/core/log";

export async function GET() {
  try {
    await orchestrator.executeSafeOrder();
    await runAutopilotCycle();

    logEvent({
      type: "REAPER_RUN",
      message: "Safe REAPER cycle executed from GET",
    });

    return NextResponse.json({
      success: true,
      message: "REAPER safe cycle executed",
      logs: orchestrator.getLogs?.() || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    if (body.mode === "daily-cycle" || body.teamId === "daily-loop") {
      const log = await orchestrator.executeTeam("daily-loop");

      logEvent({
        type: "DAILY_LOOP",
        message: "Daily loop team executed",
      });

      return NextResponse.json({
        success: true,
        log,
        logs: orchestrator.getLogs?.() || [],
      });
    }

    if (body.mode === "safe-cycle" || !body.teamId) {
      await orchestrator.executeSafeOrder();
      await runAutopilotCycle();

      logEvent({
        type: "SAFE_CYCLE",
        message: "REAPER safe cycle executed",
      });

      return NextResponse.json({
        success: true,
        message: "REAPER cycle executed",
        logs: orchestrator.getLogs?.() || [],
      });
    }

    if (body.teamId) {
      const log = await orchestrator.executeTeam(body.teamId);
      await runAutopilotCycle();

      logEvent({
        type: "TEAM_RUN",
        message: `Team executed: ${body.teamId}`,
      });

      return NextResponse.json({
        success: true,
        log,
        logs: orchestrator.getLogs?.() || [],
      });
    }

    return NextResponse.json({
      success: false,
      error: "No valid REAPER action provided",
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
