import { NextResponse } from "next/server";

async function callLocal(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      path,
      error: error?.message || String(error),
    };
  }
}

export async function GET() {
  const results = {
    run: await callLocal("/api/reaper/run"),
    feedOps: await callLocal("/api/reaper/feed-ops"),
  };

  return NextResponse.json({
    success: true,
    message: "REAPER HIVE cycle complete",
    results,
    timestamp: new Date().toISOString(),
  });
}
