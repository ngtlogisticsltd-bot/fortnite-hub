import { NextResponse } from 'next/server';
import { getMaintenanceReport, runMaintenanceCycle, resolveError } from '@/lib/reaper/teams/errorMaintenance';

export async function GET() {
  const report = getMaintenanceReport();
  return NextResponse.json({ success: true, report });
}

export async function POST(req: Request) {
  try {
    const { action, errorId } = await req.json();
    
    if (action === 'run-cycle') {
      const report = await runMaintenanceCycle();
      return NextResponse.json({ success: true, report });
    }
    
    if (action === 'resolve' && errorId) {
      const success = await resolveError(errorId);
      return NextResponse.json({ success, report: getMaintenanceReport() });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Maintenance cycle failed' }, { status: 500 });
  }
}
