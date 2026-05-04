import { NextRequest, NextResponse } from 'next/server';

// In-memory fallback if no DB is connected
let mockSubmissions = [
  { id: "PR-104", type: "correction", title: "Typo in Chapter 5 Map article", user: "fortniteLore", status: "pending", date: new Date().toISOString() },
  { id: "PR-103", type: "news-tip", title: "New encrypted PAK files found", user: "leaker99", status: "needs-review", date: new Date(Date.now() - 86400000).toISOString() }
];

export async function GET() {
  const hasDb = !!process.env.DATABASE_URL;
  
  if (!hasDb) {
    return NextResponse.json({
      success: true,
      submissions: mockSubmissions,
      dbStatus: 'NEEDS_DATABASE',
      message: 'Using in-memory mock fallback. Submissions will not be saved permanently.'
    });
  }

  // TODO: Add real Supabase query here
  return NextResponse.json({ success: true, submissions: mockSubmissions, dbStatus: 'CONNECTED' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hasDb = !!process.env.DATABASE_URL;

    const newSub = {
      id: `PR-${Math.floor(Math.random() * 1000) + 100}`,
      type: body.type || 'unknown',
      title: body.title || 'Untitled',
      user: body.credit || 'Anonymous',
      status: 'pending',
      date: new Date().toISOString()
    };

    if (!hasDb) {
      mockSubmissions = [newSub, ...mockSubmissions];
      return NextResponse.json({
        success: true,
        submission: newSub,
        dbStatus: 'NEEDS_DATABASE',
        message: 'Submission staged in memory. Will be lost on restart.'
      });
    }

    // TODO: Add real Supabase insert here
    return NextResponse.json({ success: true, submission: newSub, dbStatus: 'CONNECTED' });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
