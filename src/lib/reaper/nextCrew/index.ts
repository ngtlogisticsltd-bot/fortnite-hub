import { logEvent } from "@/lib/reaper/core/log";
import { supabase } from "@/lib/supabase";
import { gearItems } from "@/lib/monetization/gearRegistry";
import { addClip, getClips } from "@/lib/reaper/launch/launchFixTeam";
import { approvedSources } from "@/lib/reaper/content/sources";

export async function checkRevenueReadiness() {
  const missingLinks = gearItems.filter(item => !item.affiliateUrl || item.status === "NEEDS_AFFILIATE");
  return {
    status: missingLinks.length > 0 ? "NEEDS_LINK" : "READY",
    missing: missingLinks.map(i => i.title),
    trackedClicks: "Via /api/tracking/click"
  };
}

export async function checkDnsWatch() {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "fortnite-hub.xyz";
  // In a real environment, we'd use `dns` module, but edge doesn't support it well.
  // We'll simulate the status report.
  return {
    status: "PENDING_VERIFICATION",
    domain: domain,
    action: `Verify A record (216.198.79.1) and CNAME (cname.vercel-dns.com) for ${domain} at your registrar.`
  };
}

export async function checkSupabaseSync() {
  const hasUrl = !!process.env.SUPABASE_URL || !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const status = (hasUrl && (hasAnon || hasService)) ? "LIVE" : "MEMORY_ONLY";
  
  if (status === "LIVE" && hasService) {
    // Check if tables exist by doing a soft query
    try {
      await supabase.from("bot_runs").select("id").limit(1);
    } catch (e) {
      return { status: "NEEDS_TABLES", env: "OK", action: "Run schema.sql" };
    }
  }

  return {
    status,
    env: { SUPABASE_URL: hasUrl, SUPABASE_ANON_KEY: hasAnon, SUPABASE_SERVICE_ROLE_KEY: hasService }
  };
}

export async function checkItemShopSource() {
  const fallbackItems = [
    { name: "Safe Item Shop Slot", link: "https://www.fortnite.com/item-shop", apiStatus: "NEEDS_API" },
    { name: "Fortnite.gg Shop Reference", link: "https://fortnite.gg/shop", apiStatus: "NEEDS_API" }
  ];
  return {
    status: "SAFE_FALLBACK",
    items: fallbackItems,
    action: "Connect unofficial API or embed widget"
  };
}

export async function checkCreatorClip() {
  const currentClips = await getClips();
  const needed = Math.max(0, 5 - currentClips.length);
  
  const generatedSlots = [];
  for(let i=0; i<needed; i++) {
    const slotId = `placeholder-clip-${i}`;
    generatedSlots.push({ id: slotId, status: "NEEDS_APPROVED_LINK" });
  }

  return {
    status: needed > 0 ? "NEEDS_APPROVED_LINK" : "LIVE",
    seededSlots: needed,
    action: "Provide 5 manual approved YouTube URLs"
  };
}

export async function checkNewsSource() {
  const riskySources = approvedSources.filter(s => s.trust !== "official" && s.trust !== "high");
  
  return {
    status: "LIVE",
    sourceSafeCards: approvedSources.length,
    riskySources: riskySources.map(s => s.name),
    action: "Ensure non-official feeds summarize and attribute"
  };
}

export async function runPlatformSync() {
  logEvent({ type: "NEXT_CREW", message: "Starting Platform Sync Team checks." });

  const rev = await checkRevenueReadiness();
  const dns = await checkDnsWatch();
  const db = await checkSupabaseSync();
  const shop = await checkItemShopSource();
  const clips = await checkCreatorClip();
  const news = await checkNewsSource();

  let overall = "LIVE";
  let nextAction = "READY_TO_MONETISE";

  if (db.status !== "LIVE") {
    overall = "NEEDS_ENV";
    nextAction = "Connect Supabase for persistence";
  } else if (dns.status === "PENDING_VERIFICATION") {
    overall = "NEEDS_DNS";
    nextAction = "Verify DNS records at registrar";
  } else if (clips.status === "NEEDS_APPROVED_LINK") {
    overall = "NEEDS_APPROVAL";
    nextAction = "Approve placeholder creator clips";
  } else if (rev.status === "NEEDS_LINK") {
    overall = "READY_TO_MONETISE";
    nextAction = "Add affiliate links to gear registry";
  } else if (shop.status === "SAFE_FALLBACK") {
    overall = "NEEDS_API";
    nextAction = "Connect live item shop API when safe";
  }

  const report = {
    overallStatus: overall,
    nextRequiredAction: nextAction,
    revenue: rev,
    dns: dns,
    supabase: db,
    itemShop: shop,
    clips: clips,
    news: news
  };

  logEvent({ type: "NEXT_CREW", message: `Platform Sync complete. Status: ${overall}. Action: ${nextAction}` });

  return report;
}
