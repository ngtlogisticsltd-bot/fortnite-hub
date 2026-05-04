export type VaultStatus = {
  githubToken: boolean;
  vercelHook: boolean;
  supabaseUrl: boolean;
  analyticsId: boolean;
  adsId: boolean;
};

function exists(v?: string) { return !!(v && v.length > 0); }

export function getVaultStatus(): VaultStatus {
  return {
    githubToken: exists(process.env.GITHUB_TOKEN),
    vercelHook: exists(process.env.VERCEL_DEPLOY_HOOK_URL),
    supabaseUrl: exists(process.env.SUPABASE_URL),
    analyticsId: exists(process.env.NEXT_PUBLIC_ANALYTICS_ID),
    adsId: exists(process.env.NEXT_PUBLIC_ADS_ID),
  };
}

// NEVER expose tokens. Only expose masked/boolean info if needed.
export function getSafePublicConfig() {
  return {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "FortHub",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  };
}
