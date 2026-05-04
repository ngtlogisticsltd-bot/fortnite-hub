import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/reaper/core/log";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  logEvent({
    type: "AFFILIATE_CLICK",
    message: `Tracked click: ${body.itemId || "unknown"}`,
    itemId: body.itemId || "unknown",
    url: body.url || "",
  });

  return NextResponse.json({
    success: true,
    tracked: true,
  });
}
