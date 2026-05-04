import { NextRequest, NextResponse } from "next/server";
import { addManualFeedItem, getFeedItems, runFeedOps } from "@/lib/reaper/content/feedEngine";

export async function GET() {
  return NextResponse.json({
    success: true,
    items: getFeedItems(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (body?.title && body?.sourceUrl) {
    const item = addManualFeedItem({
      title: body.title,
      summary: body.summary || "Manual FortHub feed item added for review.",
      sourceName: body.sourceName || "Manual Source",
      sourceUrl: body.sourceUrl,
      type: body.type || "manual",
      status: body.status || "NEEDS_REVIEW",
    });

    return NextResponse.json({
      success: true,
      mode: "manual",
      item,
    });
  }

  const items = await runFeedOps();

  return NextResponse.json({
    success: true,
    mode: "scan",
    created: items.length,
    items,
  });
}
