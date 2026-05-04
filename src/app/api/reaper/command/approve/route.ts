import { NextResponse } from 'next/server';
import { getCommandById, updateCommandInQueue } from '@/lib/reaper/commandQueue';
import { executeCommand } from '@/lib/reaper/actionEngine';

export async function POST(req: Request) {
  try {
    const { commandId, decision } = await req.json();
    if (!commandId || !decision) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const command = getCommandById(commandId);
    if (!command) return NextResponse.json({ error: 'Command not found' }, { status: 404 });

    if (decision === 'reject') {
      command.status = 'blocked';
      command.resultMessage = 'Action rejected by owner.';
      updateCommandInQueue(command);
      return NextResponse.json({ success: true, command });
    }

    if (decision === 'approve') {
      // Set to planned then run through action engine
      command.status = 'planned';
      const executed = await executeCommand(command);
      updateCommandInQueue(executed);
      return NextResponse.json({ success: true, command: executed });
    }

    return NextResponse.json({ error: 'Invalid decision' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal system error' }, { status: 500 });
  }
}
