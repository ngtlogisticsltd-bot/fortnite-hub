import { NextResponse } from 'next/server';
import { botRegistry, getBotSummary } from '@/lib/reaper/botRegistry';

export async function GET() {
  try {
    const summary = getBotSummary();
    return NextResponse.json({ summary, bots: botRegistry });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
