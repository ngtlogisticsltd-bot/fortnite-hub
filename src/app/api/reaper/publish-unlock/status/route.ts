import { NextResponse } from "next/server";
import { runPublishUnlockTeam, runFrontendSyncTeam, runSafeFallbackTeam, runMonetisationGateTeam, runCreatorMediaGateTeam } from "@/lib/reaper/publishUnlock/publishUnlockCrew";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const unlock = await runPublishUnlockTeam();
    const sync = await runFrontendSyncTeam();
    const fallback = await runSafeFallbackTeam();
    const monetisation = await runMonetisationGateTeam();
    const media = await runCreatorMediaGateTeam();

    return NextResponse.json({
      success: true,
      status: {
        unlock,
        sync,
        fallback,
        monetisation,
        media
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
