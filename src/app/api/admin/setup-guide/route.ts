import { NextRequest, NextResponse } from "next/server";
import { getAdminSetupStatus, markStep, addCreatorLink, addAffiliateProgram } from "@/lib/reaper/adminSetup/adminSetupGuide";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getAdminSetupStatus();
  return NextResponse.json({ success: true, status });
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const body = await req.json().catch(() => ({}));

  if (action === "mark-step") {
    await markStep(body.step, body.value);
    return NextResponse.json({ success: true, message: "Step updated" });
  }

  if (action === "add-creator-link") {
    await addCreatorLink(body);
    return NextResponse.json({ success: true, message: "Creator link added" });
  }

  if (action === "add-affiliate-program") {
    await addAffiliateProgram(body);
    return NextResponse.json({ success: true, message: "Affiliate program added" });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}
