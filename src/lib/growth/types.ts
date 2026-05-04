import { CommandRisk } from "../reaper/commandTypes";

export type GrowthSource = "LIVE" | "MOCK" | "MANUAL" | "NEEDS_ACCOUNT" | "NEEDS_APPROVAL" | "NEEDS_OWNER_INPUT";
export type GrowthRisk = CommandRisk;

export interface GrowthKeyword {
  keyword: string;
  volume: string;
  difficulty: string;
  priority: number;
}

export interface StagedGrowthPage {
  title: string;
  slug: string;
  targetKeyword: string;
  intent: "informational" | "transactional" | "navigational";
  priority: "high" | "medium" | "low";
  approvalRequired: boolean;
  status: "staged" | "published";
}

export interface CreatorTarget {
  name: string;
  platform: string;
  profileUrl: string;
  embedUrl: string;
  commentaryAngle: string;
  status: GrowthSource;
}

export interface RevenueAction {
  type: "affiliate" | "sponsor" | "ads" | "media-kit";
  description: string;
  readiness: GrowthSource;
  action: string;
}

export interface GrowthReport {
  timestamp: string;
  keywords: GrowthKeyword[];
  stagedPages: StagedGrowthPage[];
  creatorTargets: CreatorTarget[];
  revenueActions: RevenueAction[];
  sponsorActions: string[];
  warnings: string[];
  nextBestActions: string[];
}
