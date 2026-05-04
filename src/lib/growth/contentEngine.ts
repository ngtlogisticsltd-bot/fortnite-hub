import { StagedGrowthPage } from './types';

export function createContentQueue(): StagedGrowthPage[] {
  return [
    { title: "Best Fortnite Settings", slug: "fortnite-best-settings", targetKeyword: "best fortnite settings", intent: "informational", priority: "high", approvalRequired: true, status: "staged" },
    { title: "Fortnite XP Maps", slug: "fortnite-xp-maps", targetKeyword: "fortnite xp maps", intent: "informational", priority: "high", approvalRequired: true, status: "staged" },
    { title: "Fortnite Item Shop Today", slug: "fortnite-item-shop-today", targetKeyword: "fortnite item shop today", intent: "transactional", priority: "high", approvalRequired: true, status: "staged" },
    { title: "Fortnite Update Today", slug: "fortnite-update-today", targetKeyword: "fortnite update today", intent: "informational", priority: "high", approvalRequired: true, status: "staged" },
    { title: "Fortnite Beginner Guide", slug: "fortnite-beginner-guide", targetKeyword: "fortnite beginner guide", intent: "informational", priority: "medium", approvalRequired: true, status: "staged" },
    { title: "Best Fortnite Loadouts", slug: "best-fortnite-loadouts", targetKeyword: "best fortnite loadouts", intent: "informational", priority: "medium", approvalRequired: true, status: "staged" },
    { title: "Fortnite Pro Gear", slug: "pro-gear", targetKeyword: "fortnite pro settings", intent: "transactional", priority: "medium", approvalRequired: true, status: "staged" },
    { title: "Fortnite Creator Tracker", slug: "top-creators", targetKeyword: "fortnite creator tracker", intent: "navigational", priority: "medium", approvalRequired: true, status: "staged" },
    { title: "Fortnite Weekly Recap", slug: "weekly-recap", targetKeyword: "fortnite news", intent: "informational", priority: "low", approvalRequired: true, status: "staged" },
    { title: "Fortnite Patch Notes Explained", slug: "patch-notes", targetKeyword: "fortnite patch notes", intent: "informational", priority: "high", approvalRequired: true, status: "staged" },
  ];
}

export function createGuideTemplate(title: string) {
  return `
    # ${title}
    [STAGED CONTENT]
    - Commentary: Original FortHub analysis.
    - Official Embeds: YouTube/Twitch source.
    - SEO: Optimized for ${title}.
  `;
}
