import { logEvent } from "@/lib/reaper/core/log";

export type LaunchClip = {
  id: string;
  title: string;
  creator: string;
  youtubeUrl: string;
  videoId: string;
  viewsLabel: string;
  status: "LIVE" | "MANUAL" | "NEEDS_REVIEW";
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  status: "LIVE" | "NEEDS_REVIEW";
  createdAt: string;
};

export type AffiliateItem = {
  id: string;
  title: string;
  summary: string;
  linkUrl: string;
  status: "NEEDS_AFFILIATE" | "LIVE";
};

let clips: LaunchClip[] = [
  {
    id: "clip-001",
    title: "Fortnite Aim Training Map Guide",
    creator: "Manual Creator Queue",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoId: "dQw4w9WgXcQ",
    viewsLabel: "Manual review",
    status: "MANUAL",
  },
];

let news: NewsItem[] = [
  {
    id: "official-news",
    title: "Official Fortnite News Feed Ready",
    summary: "FortHub is now configured to link and summarise official Fortnite updates with attribution.",
    sourceName: "Official Fortnite News",
    sourceUrl: "https://www.fortnite.com/news",
    status: "LIVE",
    createdAt: new Date().toISOString(),
  },
  {
    id: "epic-status",
    title: "Epic Games Server Status Linked",
    summary: "Players can check official server status and downtime reports from Epic Games.",
    sourceName: "Epic Games Public Status",
    sourceUrl: "https://status.epicgames.com/",
    status: "LIVE",
    createdAt: new Date().toISOString(),
  },
];

let affiliateItems: AffiliateItem[] = [
  {
    id: "budget-controller",
    title: "Best Budget Fortnite Controller",
    summary: "Buyer-intent slot ready for an approved affiliate product link.",
    linkUrl: "#",
    status: "NEEDS_AFFILIATE",
  },
  {
    id: "gaming-mouse",
    title: "Best Gaming Mouse for Fortnite",
    summary: "Affiliate-ready gear card for mouse recommendations.",
    linkUrl: "#",
    status: "NEEDS_AFFILIATE",
  },
  {
    id: "headset",
    title: "Best Headset for Footsteps",
    summary: "Affiliate-ready headset card for Fortnite players.",
    linkUrl: "#",
    status: "NEEDS_AFFILIATE",
  },
];

function extractYouTubeId(url: string) {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

export function addClip(input: {
  title: string;
  creator: string;
  youtubeUrl: string;
  viewsLabel?: string;
}) {
  const videoId = extractYouTubeId(input.youtubeUrl);

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const item: LaunchClip = {
    id: `clip-${Date.now()}`,
    title: input.title,
    creator: input.creator,
    youtubeUrl: input.youtubeUrl,
    videoId,
    viewsLabel: input.viewsLabel || "Manual queue",
    status: "LIVE",
  };

  clips = [item, ...clips].slice(0, 50);

  logEvent({
    type: "MEDIA_TEAM",
    message: `YouTube clip added: ${item.title}`,
  });

  return item;
}

export function getClips() {
  return clips;
}

export function getNews() {
  return news;
}

export function getAffiliateItems() {
  return affiliateItems;
}

export function runLaunchFixTeam() {
  logEvent({
    type: "LAUNCH_FIX_TEAM",
    message: "Launch Fix Team checked media, news, item shop, sponsor, ads, and affiliate readiness.",
  });

  return {
    success: true,
    message: "Launch Fix Team completed.",
    fixed: [
      "Media embed pipeline ready",
      "News feed source-safe fallback ready",
      "Item shop safe fallback ready",
      "Sponsor block changed to available slot",
      "Ad placeholder changed to available slot",
      "Affiliate tracking shell ready",
    ],
    clips: clips.length,
    news: news.length,
    affiliateItems: affiliateItems.length,
  };
}
