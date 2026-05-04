import { NextResponse } from 'next/server';
import { runDominationStack } from '@/lib/reaper/teams/dominationStack';

export async function GET() {
  const report = await runDominationStack();
  return NextResponse.json({ success: true, report });
}

export async function POST() {
  try {
    const report = await runDominationStack();
    // In a real app, we would store this in the DB
    return NextResponse.json({ 
      success: true, 
      report,
      message: "Domination Stack cycle completed successfully."
    });
  } catch (error) {
    return NextResponse.json({ error: 'Domination Stack failed' }, { status: 500 });
  }
}
