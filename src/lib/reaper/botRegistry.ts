export type BotSource = "live" | "mock" | "manual";
export type BotRisk = "low" | "medium" | "high";

export type ReaperBot = {
  id: string;
  team: string;
  name: string;
  purpose: string;
  enabled: boolean;
  riskLevel: BotRisk;
  source: BotSource;
  approvalRequired: boolean;
};

const teams = [
  "Executive Control",
  "Legal Compliance",
  "Live Fortnite Data",
  "Original Content",
  "SEO",
  "Traffic Growth",
  "Monetization",
  "Sponsor Sales",
  "Analytics",
  "Community",
  "Social Media",
  "Newsletter",
  "Design",
  "UX",
  "DevOps",
  "Security",
  "Performance",
  "Database",
  "Admin Control",
  "Content Approval",
  "Affiliate",
  "Ad Operations",
  "Testing",
  "Deployment",
  "Revenue Intelligence",
];

const mediaBots: ReaperBot[] = [
  {
    id: "media-001",
    team: "Media Rights & AI Clips",
    name: "Embed Compliance Bot",
    purpose: "Checks that media uses official embeds, attribution, and source links only.",
    enabled: true,
    riskLevel: "low",
    source: "manual",
    approvalRequired: false,
  },
  {
    id: "media-002",
    team: "Media Rights & AI Clips",
    name: "Attribution Bot",
    purpose: "Ensures embedded creator media includes clear credit and original source links.",
    enabled: true,
    riskLevel: "low",
    source: "manual",
    approvalRequired: false,
  },
  {
    id: "media-003",
    team: "Media Rights & AI Clips",
    name: "AI Clip Planner Bot",
    purpose: "Creates original script/storyboard ideas without using copyrighted footage.",
    enabled: true,
    riskLevel: "medium",
    source: "manual",
    approvalRequired: true,
  },
  {
    id: "media-004",
    team: "Media Rights & AI Clips",
    name: "Media Publish Gate Bot",
    purpose: "Blocks risky media from publishing until reviewed.",
    enabled: true,
    riskLevel: "high",
    source: "manual",
    approvalRequired: true,
  },
];

const generatedBots: ReaperBot[] = Array.from({ length: 500 }, (_, i) => {
  const num = i + 1;
  const id = `bot-${String(num).padStart(3, "0")}`;
  const team = teams[i % teams.length];

  let riskLevel: BotRisk = "low";
  let source: BotSource = "mock";
  let approvalRequired = false;

  if (team === "Live Fortnite Data") source = "live";
  if (team === "Admin Control" || team === "Content Approval") source = "manual";

  if (["Legal Compliance", "Monetization", "Sponsor Sales", "Security"].includes(team)) {
    riskLevel = "high";
  } else if (
    ["Original Content", "Traffic Growth", "Social Media", "Affiliate", "Ad Operations"].includes(team)
  ) {
    riskLevel = "medium";
  }

  if (
    [
      "Legal Compliance",
      "Monetization",
      "Sponsor Sales",
      "Original Content",
      "Traffic Growth",
      "Social Media",
      "Affiliate",
      "Ad Operations",
      "Content Approval",
    ].includes(team)
  ) {
    approvalRequired = true;
  }

  return {
    id,
    team,
    name: `${team} Node ${String(num).padStart(3, "0")}`,
    purpose: `Automated processing unit for ${team} operations.`,
    enabled: true,
    riskLevel,
    source,
    approvalRequired,
  };
});

export const botRegistry: ReaperBot[] = [...generatedBots, ...mediaBots];

export function getBotsByTeam(team: string): ReaperBot[] {
  return botRegistry.filter((bot) => bot.team === team);
}

export function getEnabledBots(): ReaperBot[] {
  return botRegistry.filter((bot) => bot.enabled);
}

export function getBotSummary() {
  return {
    total: botRegistry.length,
    enabled: botRegistry.filter((bot) => bot.enabled).length,
    live: botRegistry.filter((bot) => bot.source === "live").length,
    mock: botRegistry.filter((bot) => bot.source === "mock").length,
    manual: botRegistry.filter((bot) => bot.source === "manual").length,
    approvalRequired: botRegistry.filter((bot) => bot.approvalRequired).length,
  };
}
