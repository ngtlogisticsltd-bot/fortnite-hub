import { NextResponse } from "next/server";
import { runPlatformSync } from "@/lib/reaper/nextCrew/nextCrew";

export const dynamic = "force-dynamic";

export async function GET() {
  const report = await runPlatformSync();
  return NextResponse.json({
    success: true,
    report
  });
}
