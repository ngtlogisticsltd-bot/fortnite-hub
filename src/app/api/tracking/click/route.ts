import { NextResponse } from 'next/server';

// In-memory mock store
const mockClicks: any[] = [];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Log the click into memory (non-persistent until DB is connected)
    mockClicks.push({
      ...data,
      serverTime: new Date().toISOString()
    });

    console.log(`[TRACKING API] Recorded click: ${data.type} - ${data.label}`);

    return NextResponse.json({ success: true, message: "Click recorded (MOCK)" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Data is currently stored in-memory. Database connection required.",
    mockClicks 
  });
}
