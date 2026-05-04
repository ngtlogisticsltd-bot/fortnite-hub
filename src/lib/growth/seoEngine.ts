import { GrowthKeyword, StagedGrowthPage } from './types';

export function getPriorityKeywords(): GrowthKeyword[] {
  return [
    { keyword: "fortnite item shop today", volume: "1.2M", difficulty: "High", priority: 1 },
    { keyword: "fortnite update today", volume: "800K", difficulty: "Medium", priority: 1 },
    { keyword: "fortnite xp maps", volume: "450K", difficulty: "Medium", priority: 2 },
    { keyword: "best fortnite settings", volume: "300K", difficulty: "High", priority: 2 },
    { keyword: "fortnite patch notes", volume: "250K", difficulty: "Low", priority: 1 },
    { keyword: "fortnite skins today", volume: "200K", difficulty: "Medium", priority: 3 },
    { keyword: "best fortnite loadouts", volume: "150K", difficulty: "Medium", priority: 3 },
    { keyword: "fortnite beginner guide", volume: "100K", difficulty: "Low", priority: 4 },
    { keyword: "fortnite pro settings", volume: "80K", difficulty: "High", priority: 4 },
    { keyword: "fortnite live events", volume: "1M+", difficulty: "High", priority: 1 },
  ];
}

export function generateSeoPageIdeas(): StagedGrowthPage[] {
  const keywords = getPriorityKeywords();
  const ideas: StagedGrowthPage[] = [];

  // Generate 50 ideas
  for (let i = 1; i <= 50; i++) {
    const kw = keywords[i % keywords.length];
    ideas.push({
      title: `${kw.keyword.charAt(0).toUpperCase() + kw.keyword.slice(1)} - Full Guide #${i}`,
      slug: `${kw.keyword.replace(/\s+/g, '-')}-guide-${i}`,
      targetKeyword: kw.keyword,
      intent: i % 3 === 0 ? "transactional" : "informational",
      priority: i < 10 ? "high" : "medium",
      approvalRequired: true,
      status: "staged"
    });
  }

  return ideas;
}

export function generateInternalLinkMap() {
  return [
    { from: "/news", to: "/fortnite-update-today", anchor: "Latest Fortnite Update" },
    { from: "/skins", to: "/fortnite-item-shop-today", anchor: "Item Shop Daily" },
    { from: "/guides", to: "/fortnite-best-settings", anchor: "Optimized Settings" },
    { from: "/", to: "/fortnite-xp-maps", anchor: "Level Up Fast" }
  ];
}
