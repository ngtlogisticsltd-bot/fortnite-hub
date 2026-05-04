export type IntakeData = Record<string, any>;

let intakeStore: IntakeData = {
  siteName: "FortHub",
  publicSiteUrl: "http://localhost:3000",
  disclaimerConfirmed: true,
  noReuploadConfirmed: true,
  drawMode: "coming-soon"
};

export function getIntakeData(): IntakeData {
  return { ...intakeStore };
}

export function saveIntakeData(data: IntakeData) {
  intakeStore = { ...intakeStore, ...data };
}

export function getMaskedIntake(): IntakeData {
  const masked: IntakeData = {};
  for (const [key, value] of Object.entries(intakeStore)) {
    if (typeof value === 'string' && value.length > 0 && isSensitive(key)) {
      masked[key] = '••••••••••••';
    } else {
      masked[key] = value;
    }
  }
  return masked;
}

function isSensitive(key: string): boolean {
  const sensitiveKeys = ['supabaseAnonKey', 'supabaseServiceKey', 'youtubeApiKey', 'discordWebhook', 'githubTokenExists', 'xApiKey', 'metaAccessToken', 'redditClientSecret'];
  return sensitiveKeys.includes(key);
}
