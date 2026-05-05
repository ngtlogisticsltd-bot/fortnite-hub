import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/reaper/core/log";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  logEvent({
    type: "AFFILIATE_CLICK",
    message: `Tracked click: ${body.itemId || "unknown"}`,
    itemId: body.itemId || "unknown",
    url: body.url || "",
  });

  if (process.env.SUPABASE_URL) {
    try {
      await supabase.from('click_events').insert([{
        element_id: body.itemId || "unknown",
        url: body.url || "",
        source_page: body.sourcePage || "unknown"
      }]);
    } catch (err) {
      console.error("Supabase Click Tracking Error:", err);
    }
  }

  return NextResponse.json({
    success: true,
    tracked: true,
  });
}
