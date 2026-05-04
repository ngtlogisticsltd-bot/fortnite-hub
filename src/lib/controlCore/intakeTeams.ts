import { getIntakeData } from './masterIntake';
import { INTAKE_FIELDS } from './fieldMap';

export interface IntakeTeamStatus {
  teamName: string;
  status: 'READY' | 'WAITING' | 'NEEDS_OWNER_ACTION';
  waitingOn: string[];
}

export function calculateIntakeCompletion() {
  const data = getIntakeData();
  const total = INTAKE_FIELDS.length;
  const filled = INTAKE_FIELDS.filter(f => {
    const val = data[f.id];
    return val !== undefined && val !== "" && val !== false;
  }).length;

  return {
    percentage: Math.round((filled / total) * 100),
    missingFields: INTAKE_FIELDS.filter(f => {
      const val = data[f.id];
      return val === undefined || val === "" || val === false;
    }).map(f => f.label)
  };
}

export function getIntakeTeamStatus(): IntakeTeamStatus[] {
  const data = getIntakeData();
  const teams = [
    "Owner Intake Team",
    "Credential Mapping Team",
    "Auto-Fill Dispatch Team",
    "Setup Completion Team",
    "Vault Safety Team",
    "REAPER Sync Team"
  ];

  return teams.map(team => {
    const waitingOn = INTAKE_FIELDS.filter(f => {
      const val = data[f.id];
      return (val === undefined || val === "" || val === false) && f.dependency?.includes(team);
    }).map(f => f.label);

    return {
      teamName: team,
      status: waitingOn.length === 0 ? 'READY' : 'NEEDS_OWNER_ACTION',
      waitingOn
    };
  });
}

export function getNextBestIntakeAction(): string {
  const { missingFields } = calculateIntakeCompletion();
  if (missingFields.length === 0) return "All systems connected. Run final deployment.";
  return `Fill missing field: ${missingFields[0]}`;
}
