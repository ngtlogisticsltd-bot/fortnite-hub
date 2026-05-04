import { NextResponse } from 'next/server';
import { runAdminUxAudit } from '@/lib/reaper/teams/adminUxDesign';

export async function GET() {
  const audit = await runAdminUxAudit();
  
  return NextResponse.json({
    success: true,
    groups: ['Launch', 'Bots', 'Content', 'Revenue', 'System', 'Help'],
    toolCount: 12,
    clutterWarnings: audit.status === 'CLUTTERED' ? 1 : 0,
    recommendedFavorites: ['Bot Automation', 'Control Core', 'REAPER Fleet'],
    audit
  });
}
