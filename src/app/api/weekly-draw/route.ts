import { NextResponse } from 'next/server';
import { getDrawEntries, addDrawEntry, updateEntryStatus, pickWinner, getDrawMode, setDrawMode } from '@/lib/draws/weeklyDraw';

export async function GET() {
  const entries = getDrawEntries();
  const mode = getDrawMode();
  return NextResponse.json({ success: true, entries, mode });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entry = addDrawEntry(body);
    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    
    if (body.mode) {
      setDrawMode(body.mode);
      return NextResponse.json({ success: true, mode: body.mode });
    }

    if (body.id && body.status) {
      updateEntryStatus(body.id, body.status);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT() {
  const mode = getDrawMode();
  if (mode === 'waitlist') {
    return NextResponse.json({ error: 'Cannot pick winner in waitlist mode' }, { status: 400 });
  }
  const winner = pickWinner();
  return NextResponse.json({ success: true, winner });
}
