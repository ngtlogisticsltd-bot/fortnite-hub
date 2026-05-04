import { NextResponse } from 'next/server';
import { getControlData, getMaskedControlData, getControlSummary, updateControlData, ControlCoreData } from '@/lib/controlCore/store';
import { controlTeams } from '@/lib/controlCore/teams';

export async function GET() {
  const data = getControlData();
  const maskedData = getMaskedControlData();
  const summary = getControlSummary();
  
  const fields = Object.keys(data).filter(k => k !== 'lastUpdated');
  const missingFields = fields.filter(k => !!(data as any)[k] === false);

  const nextBestActions = [];
  if (!data.adminPass || data.adminPass === 'admin123') nextBestActions.push('Change default admin password');
  if (!data.githubRepo) nextBestActions.push('Create and connect GitHub repository');
  if (!data.vercelProject) nextBestActions.push('Deploy to Vercel');
  if (!data.domain) nextBestActions.push('Connect custom domain');
  if (!data.supabaseUrl) nextBestActions.push('Connect Supabase database');
  if (!data.analyticsId) nextBestActions.push('Add Analytics tracking ID');
  if (!data.newsletterApiKey) nextBestActions.push('Add Newsletter API key');
  if (!data.adClientId) nextBestActions.push('Add Ad Network client ID');

  return NextResponse.json({
    success: true,
    summary,
    maskedData,
    teams: controlTeams,
    missingFields,
    nextBestActions: nextBestActions.length > 0 ? nextBestActions : ['All core systems connected! Ready for traffic growth.']
  });
}

export async function POST(req: Request) {
  try {
    const updates = await req.json();
    const updatedData = updateControlData(updates);
    const maskedData = getMaskedControlData();
    const summary = getControlSummary();

    return NextResponse.json({
      success: true,
      summary,
      maskedData
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update control data' }, { status: 500 });
  }
}
