import { NextResponse } from 'next/server';
import { getAutoFillData } from '@/lib/controlCore/autoFill';
import { autoFillTeams } from '@/lib/controlCore/autoFillTeams';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const context = searchParams.get('context');

  if (!context) {
    return NextResponse.json({ error: 'Context required' }, { status: 400 });
  }

  const result = getAutoFillData(context);
  const relevantTeams = autoFillTeams.filter(t => t.context === context);

  return NextResponse.json({
    success: true,
    context,
    result,
    teams: relevantTeams
  });
}

export async function POST(req: Request) {
  try {
    const { context } = await req.json();
    if (!context) return NextResponse.json({ error: 'Context required' }, { status: 400 });

    const result = getAutoFillData(context);
    const relevantTeams = autoFillTeams.filter(t => t.context === context);

    return NextResponse.json({
      success: true,
      context,
      result,
      teams: relevantTeams
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
