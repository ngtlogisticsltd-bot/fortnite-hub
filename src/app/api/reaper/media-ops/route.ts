import { NextResponse } from 'next/server';
import { runMediaOpsCycle } from '@/lib/reaper/teams/allFormatsMedia';

export async function GET() {
  const report = await runMediaOpsCycle();
  return NextResponse.json({ success: true, report });
}

export async function POST() {
  try {
    const report = await runMediaOpsCycle();
    // In a real app, we would persist these to Supabase
    return NextResponse.json({ 
      success: true, 
      message: "Media planning cycle completed.",
      report
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Media cycle failed" }, { status: 500 });
  }
}
