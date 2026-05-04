import { NextResponse } from 'next/server';
import { itDevTeam } from '@/lib/itDev/itDevTeam';

export async function GET() {
  const securityWarnings = itDevTeam.bots
    .filter(b => b.status === 'WARNING' || b.status === 'ERROR')
    .map(b => `${b.name}: ${b.purpose}`);

  const nextBestActions = itDevTeam.bots
    .flatMap(b => b.nextActions)
    .slice(0, 5);

  return NextResponse.json({
    success: true,
    team: itDevTeam.name,
    bots: itDevTeam.bots,
    securityWarnings,
    nextBestActions,
    systemUptime: '99.9%', // Placeholder
    lastBuildStatus: 'Success', // Placeholder
  });
}
