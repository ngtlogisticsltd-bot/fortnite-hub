export type CommandRisk = "low" | "medium" | "high";
export type CommandStatus = "received" | "planned" | "running" | "completed" | "needs_approval" | "blocked" | "failed";
export type CommandSource = "assistant" | "manual" | "system";

export interface ReaperCommand {
  id: string;
  input: string;
  intent: string;
  targetTeam: string;
  riskLevel: CommandRisk;
  status: CommandStatus;
  createdAt: string;
  updatedAt: string;
  approvalRequired: boolean;
  source: CommandSource;
  description?: string;
  requiredAction?: string;
  actions: string[];
  resultMessage: string;
  warnings: string[];
}
