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
  const clips = await getClips();
  const news = await getNews();
  return NextResponse.json({
    success: true,
    clips,
    news,
    affiliateItems: getAffiliateItems(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (body.action === "add-clip") {
    const clip = await addClip({
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

  const result = await runLaunchFixTeam();

  return NextResponse.json(result);
}
