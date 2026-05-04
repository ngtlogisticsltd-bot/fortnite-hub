import { ReaperCommand } from './commandTypes';

// NON-PERSISTENT UNTIL DATABASE CONNECTED
let commandQueue: ReaperCommand[] = [];

export function addCommand(command: ReaperCommand): ReaperCommand {
  commandQueue = [command, ...commandQueue].slice(0, 50); // Keep last 50
  return command;
}

export function updateCommandInQueue(command: ReaperCommand): ReaperCommand {
  commandQueue = commandQueue.map(c => c.id === command.id ? command : c);
  return command;
}

export function getCommands(): ReaperCommand[] {
  return commandQueue;
}

export function getCommandById(id: string): ReaperCommand | undefined {
  return commandQueue.find(c => c.id === id);
}

export function clearCompleted() {
  commandQueue = commandQueue.filter(c => c.status !== "completed");
}
