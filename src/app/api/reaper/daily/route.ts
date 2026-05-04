import { NextResponse } from 'next/server';
import { dailyState } from '@/lib/reaper/teams/dailyLoop';

export async function GET() {
  return NextResponse.json(dailyState);
}
