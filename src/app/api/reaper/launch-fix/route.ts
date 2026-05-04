import { NextRequest, NextResponse } from "next/server";
import {
  addClip,
  getAffiliateItems,
  getClips,
  getNews,
  runLaunchFixTeam,
} from "@/lib/reaper/launch/launchFixTeam";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    clips: getClips(),
    news: getNews(),
    affiliateItems: getAffiliateItems(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (body.action === "add-clip") {
    const clip = addClip({
      title: body.title,
      creator: body.creator,
      youtubeUrl: body.youtubeUrl,
      viewsLabel: body.viewsLabel,
    });

    return NextResponse.json({
      success: true,
      action: "add-clip",
      clip,
    });
  }

  const result = runLaunchFixTeam();

  return NextResponse.json(result);
}
