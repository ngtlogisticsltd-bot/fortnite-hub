import { RevenueAction } from './types';

export function getRevenueReadiness(): RevenueAction[] {
  return [
    {
      type: "affiliate",
      description: "Epic Games Creator Code & Amazon Affiliate Blocks",
      readiness: "NEEDS_ACCOUNT",
      action: "Enter Creator Code in Control Core"
    },
    {
      type: "ads",
      description: "Google AdSense / Ezoic / NitroPay Ad Slots",
      readiness: "NEEDS_ACCOUNT",
      action: "Enter Publisher ID in Control Core"
    },
    {
      type: "sponsor",
      description: "Dedicated Sponsor Banners & Direct Deals",
      readiness: "MANUAL",
      action: "Upload Sponsor Media Assets"
    },
    {
      type: "media-kit",
      description: "FortHub Traffic & Reach Stats for Sponsors",
      readiness: "NEEDS_APPROVAL",
      action: "Review and Publish Media Kit"
    }
  ];
}

export function createMediaKitChecklist() {
  return [
    "Monthly Page Views (GA4)",
    "Unique Monthly Visitors",
    "Engagement Rate",
    "Demographics (Age/Geo)",
    "Sponsorship Slots Available"
  ];
}
