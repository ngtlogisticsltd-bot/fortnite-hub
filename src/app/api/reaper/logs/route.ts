import { NextResponse } from "next/server";
import { getLogs } from "@/lib/reaper/core/log";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    logs: await getLogs(),
  });
}
