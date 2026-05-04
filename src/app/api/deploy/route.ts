import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    return NextResponse.json({ ok: false, message: "Missing VERCEL_DEPLOY_HOOK_URL" }, { status: 400 });
  }

  // Require an approval header to prevent accidental triggers
  const approval = req.headers.get("x-reaper-approval");
  if (approval !== "true") {
    return NextResponse.json({ ok: false, message: "Approval header missing" }, { status: 403 });
  }

  try {
    const res = await fetch(hook, { method: "POST" });
    return NextResponse.json({ ok: res.ok, status: res.status });
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Fetch failed" }, { status: 500 });
  }
}
