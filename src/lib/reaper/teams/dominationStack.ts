import { GrowthReport } from '../../growth/types';
import { getPriorityKeywords, generateSeoPageIdeas } from '../../growth/seoEngine';
import { createContentQueue } from '../../growth/contentEngine';
import { getCreatorTargets } from '../../growth/creatorEngine';
import { getRevenueReadiness } from '../../growth/revenueEngine';

export async function runDominationStack(): Promise<GrowthReport> {
  const timestamp = new Date().toISOString();
  
  const keywords = getPriorityKeywords();
  const stagedPages = createContentQueue(); // Using queue as primary staged pages
  const seoIdeas = generateSeoPageIdeas();
  const creatorTargets = getCreatorTargets();
  const revenueActions = getRevenueReadiness();

  return {
    timestamp,
    keywords,
    stagedPages: [...stagedPages, ...seoIdeas.slice(0, 5)], // Top 5 SEO ideas staged
    creatorTargets,
    revenueActions,
    sponsorActions: ["Front-page Header Banner", "Article Sidebar Slot"],
    warnings: [
      "No real Creator Code connected.",
      "Analytics ID missing in Control Core."
    ],
    nextBestActions: [
      "Connect Supabase for persistent content storage.",
      "Approve Top 5 SEO pages for publication.",
      "Verify Creator Embeds for legal safety."
    ]
  };
}
