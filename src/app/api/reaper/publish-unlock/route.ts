import { NextResponse } from "next/server";
import { runPublishUnlockCrew } from "@/lib/reaper/publishUnlock/publishUnlockCrew";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const report = await runPublishUnlockCrew();
    return NextResponse.json({
      success: true,
      report
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
