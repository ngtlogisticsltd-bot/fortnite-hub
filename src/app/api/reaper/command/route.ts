import { NextResponse } from 'next/server';
import { routeCommand } from '@/lib/reaper/commandRouter';
import { executeCommand } from '@/lib/reaper/actionEngine';
import { addCommand, getCommands, updateCommandInQueue } from '@/lib/reaper/commandQueue';
import { runAutopilotCycle, getAutopilotHistory } from '@/lib/reaper/autopilot';

export async function GET() {
  const commands = getCommands();
  const autopilot = getAutopilotHistory()[0];
  return NextResponse.json({ success: true, commands, autopilot });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

    // 1. Route natural language to command
    let command = routeCommand(message);
    addCommand(command);

    // 2. Try to execute if low risk, otherwise stage
    command = await executeCommand(command);
    updateCommandInQueue(command);

    // 3. Trigger autopilot review
    const autopilot = await runAutopilotCycle();

    return NextResponse.json({ 
      success: true, 
      command,
      autopilot,
      assistantResponse: command.resultMessage || `Command received for ${command.targetTeam}.`
    });
  } catch (error) {
    console.error('REAPER Command Error:', error);
    return NextResponse.json({ error: 'Internal system error' }, { status: 500 });
  }
}
