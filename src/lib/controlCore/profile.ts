import { getVaultStatus } from "../vault/envVault";

type Profile = {
  githubRepo?: string;
  vercelProject?: string;
  domain?: string;
  notes?: string;
};

let profile: Profile = {};

export function setProfile(data: Partial<Profile>) {
  profile = { ...profile, ...data };
}

export function getProfile() {
  return profile;
}

export function getNextStep(status: ReturnType<typeof getVaultStatus>) {
  if (!profile.githubRepo) return "Add GitHub repo (owner)";
  if (!profile.vercelProject) return "Import project on Vercel (owner)";
  if (!status.vercelHook) return "Add Vercel Deploy Hook (owner)";
  if (!profile.domain) return "Add custom domain (owner)";
  if (!status.supabaseUrl) return "Connect Supabase (owner)";
  if (!status.analyticsId) return "Add Analytics ID (owner)";
  if (!status.adsId) return "Add Ads ID (owner)";
  return "System connected. Start traffic & content.";
}
