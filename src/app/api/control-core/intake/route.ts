import { NextResponse } from 'next/server';
import { getMaskedIntake, saveIntakeData } from '@/lib/controlCore/masterIntake';
import { calculateIntakeCompletion, getIntakeTeamStatus, getNextBestIntakeAction } from '@/lib/controlCore/intakeTeams';

export async function GET() {
  const masked = getMaskedIntake();
  const completion = calculateIntakeCompletion();
  const teams = getIntakeTeamStatus();
  const next = getNextBestIntakeAction();

  return NextResponse.json({
    success: true,
    intake: masked,
    completion,
    teams,
    next
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    saveIntakeData(body);
    
    const masked = getMaskedIntake();
    const completion = calculateIntakeCompletion();
    const teams = getIntakeTeamStatus();
    const next = getNextBestIntakeAction();

    return NextResponse.json({
      success: true,
      intake: masked,
      completion,
      teams,
      next
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Save failed" }, { status: 400 });
  }
}
