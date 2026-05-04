export type SourceType =
  | "official"
  | "status"
  | "tracker"
  | "news"
  | "social"
  | "youtube"
  | "community"
  | "tools";

export type ApprovedSource = {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  trust: "official" | "high" | "medium" | "manual";
  publishMode: "link" | "summary" | "embed" | "manual-review";
};

export const approvedSources: ApprovedSource[] = [
  {
    id: "fortnite-news",
    name: "Official Fortnite News",
    type: "official",
    url: "https://www.fortnite.com/news",
    trust: "official",
    publishMode: "summary",
  },
  {
    id: "epic-status",
    name: "Epic Games Public Status",
    type: "status",
    url: "https://status.epicgames.com/",
    trust: "official",
    publishMode: "link",
  },
  {
    id: "fortnite-trello",
    name: "Fortnite Trello Board",
    type: "official",
    url: "https://trello.com/b/Bs7hgkma/fortnite-community-issues",
    trust: "official",
    publishMode: "link",
  },
  {
    id: "fortnite-help",
    name: "Fortnite Help Center",
    type: "official",
    url: "https://www.epicgames.com/help/en-US/c-Category_Fortnite",
    trust: "official",
    publishMode: "link",
  },
  {
    id: "fortnite-competitive",
    name: "Fortnite Competitive News",
    type: "official",
    url: "https://www.fortnite.com/competitive/news",
    trust: "official",
    publishMode: "summary",
  },
  {
    id: "fortnite-ranked",
    name: "Fortnite Ranked Leaderboard",
    type: "tracker",
    url: "https://www.fortnite.com/ranked/leaderboard",
    trust: "official",
    publishMode: "link",
  },
  {
    id: "epic-newsroom",
    name: "Epic Newsroom",
    type: "official",
    url: "https://www.epicgames.com/site/en-US/news",
    trust: "official",
    publishMode: "summary",
  },
  {
    id: "fortnite-tracker",
    name: "Fortnite Tracker",
    type: "tracker",
    url: "https://fortnitetracker.com/",
    trust: "high",
    publishMode: "link",
  },
  {
    id: "fortnite-gg",
    name: "Fortnite.gg",
    type: "tracker",
    url: "https://fortnite.gg/",
    trust: "high",
    publishMode: "link",
  },
  {
    id: "blitz-gg",
    name: "Blitz.gg Fortnite",
    type: "tools",
    url: "https://blitz.gg/fortnite",
    trust: "high",
    publishMode: "link",
  },
  {
    id: "prosettings-fortnite",
    name: "ProSettings.net Fortnite",
    type: "tools",
    url: "https://prosettings.net/lists/fortnite/",
    trust: "high",
    publishMode: "link",
  },
  {
    id: "dexerto-fortnite",
    name: "Dexerto Fortnite",
    type: "news",
    url: "https://www.dexerto.com/fortnite/",
    trust: "high",
    publishMode: "manual-review",
  },
  {
    id: "ign-fortnite",
    name: "IGN Fortnite Wiki",
    type: "news",
    url: "https://www.ign.com/wikis/fortnite",
    trust: "high",
    publishMode: "link",
  },
  {
    id: "reddit-fortnitebr",
    name: "Reddit r/FortNiteBR",
    type: "community",
    url: "https://www.reddit.com/r/FortNiteBR/",
    trust: "manual",
    publishMode: "manual-review",
  },
  {
    id: "reddit-competitive",
    name: "Reddit r/FortniteCompetitive",
    type: "community",
    url: "https://www.reddit.com/r/FortniteCompetitive/",
    trust: "manual",
    publishMode: "manual-review",
  },
  {
    id: "youtube-manual-clips",
    name: "YouTube Creator Clip Queue",
    type: "youtube",
    url: "https://www.youtube.com/",
    trust: "manual",
    publishMode: "embed",
  },
];
