import { NextResponse } from 'next/server';
import { accountTeams, AccountTeam } from '@/lib/reaper/accountTeams';

export async function GET() {
  const envVars = process.env;
  
  const processedTeams = accountTeams.map(team => {
    const missingVars = team.requiredEnvVars.filter(v => !envVars[v]);
    
    // Dynamic status determination based on Env Vars
    let currentStatus = team.status;
    if (team.requiredEnvVars.length > 0) {
      if (missingVars.length === 0) {
        currentStatus = 'CONNECTED';
      } else if (team.status !== 'OPTIONAL_LATER') {
        currentStatus = 'NEEDS_ACCOUNT';
      }
    }

    return {
      ...team,
      currentStatus,
      missingVars
    };
  });

  const allMissing = processedTeams.flatMap(t => t.missingVars);
  const allConnected = processedTeams.flatMap(t => t.requiredEnvVars.filter(v => !!envVars[v]));
  
  let nextBestAction = 'Create Vercel Account & Deploy';
  if (allConnected.includes('NEXT_PUBLIC_SITE_URL') && !allConnected.includes('DATABASE_URL')) {
    nextBestAction = 'Create Supabase Database';
  } else if (allConnected.includes('DATABASE_URL') && !allConnected.includes('NEXT_PUBLIC_ANALYTICS_ID')) {
    nextBestAction = 'Setup Analytics';
  }

  return NextResponse.json({
    success: true,
    teams: processedTeams,
    missingEnvVars: allMissing,
    connectedEnvVars: allConnected,
    nextBestAction
  });
}
