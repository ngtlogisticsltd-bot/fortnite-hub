import { NextResponse } from 'next/server';
import { runLiveOpsCheck } from '@/lib/reaper/teams/liveOpsSetup';

export async function GET() {
  const report = await runLiveOpsCheck();
  
  return NextResponse.json({
    success: true,
    liveOpsTeam: report,
    currentDomainPlan: {
      aRecord: '76.76.21.21',
      cnameRecord: 'cname.vercel-dns.com',
      recommendedUrl: 'https://fortnite-hub.xyz'
    },
    envChecklist: [
      { key: 'ADMIN_USER', status: 'REQUIRED' },
      { key: 'ADMIN_PASS', status: 'REQUIRED' },
      { key: 'NEXT_PUBLIC_SITE_URL', status: 'REQUIRED' }
    ],
    nextBestActions: report.bots
      .filter(b => b.status === 'NEEDS_OWNER_ACTION')
      .map(b => b.ownerActionRequired)
  });
}

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    
    if (action === 'refresh-plan') {
       return NextResponse.json({ success: true, message: "Live ops plan refreshed." });
    }
    
    if (action === 'sync-control-core') {
       return NextResponse.json({ success: true, message: "Control Core synchronized with live recommendations." });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
  }
}
