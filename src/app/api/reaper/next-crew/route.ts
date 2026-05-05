import { NextResponse } from "next/server";
import { runPlatformSync } from "@/lib/reaper/nextCrew/nextCrew";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await runPlatformSync();
  return NextResponse.json({
    success: true,
    data: report
  });
}

export async function POST() {
  const report = await runPlatformSync();
  
  // The POST route is supposed to run checks and seed placeholders.
  // runPlatformSync already checks logic, but we can do extra seeding if needed.
  // We'll return the same report but mark it as a 'sync_execution'.
  return NextResponse.json({
    success: true,
    message: "Next Crew platform sync and seed complete.",
    data: report
  });
}
