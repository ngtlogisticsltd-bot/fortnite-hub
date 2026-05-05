import { NextResponse } from 'next/server';
import { orchestrator } from '@/lib/reaper/orchestrator';

export async function GET() {
  try {
    const logs = orchestrator.getLogs();

    console.log("API LOGS:", logs.length);

    return NextResponse.json({
      success: true,
      logs: logs || [],
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      logs: [],
    });
  }
}
