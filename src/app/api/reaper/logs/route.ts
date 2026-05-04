import { NextResponse } from "next/server";
import { getLogs } from "@/lib/reaper/core/log";

export async function GET() {
  return NextResponse.json({
    success: true,
    logs: getLogs(),
  });
}
