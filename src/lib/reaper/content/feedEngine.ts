import { approvedSources } from "./sources";
import { logEvent } from "@/lib/reaper/core/log";
import { supabase } from "@/lib/supabase";

export type FeedItem = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  type: string;
  status: "LIVE" | "MANUAL" | "NEEDS_REVIEW" | "NEEDS_ACCOUNT" | "NEEDS_DATABASE";
  createdAt: string;
};

let feedItems: FeedItem[] = [];

export async function runFeedOps() {
  const now = new Date().toISOString();

  const generated: FeedItem[] = approvedSources.map((source) => {
    const status =
      source.publishMode === "manual-review"
        ? "NEEDS_REVIEW"
        : source.publishMode === "embed"
          ? "MANUAL"
          : "LIVE";

    return {
      id: `${source.id}-${Date.now()}`,
      title: `${source.name} checked`,
      summary:
        source.publishMode === "manual-review"
          ? `Queued for manual review. FortHub can reference this source with attribution, but should not copy full content.`
          : source.publishMode === "embed"
            ? `Ready for approved embed-only creator content with clear attribution.`
            : `Approved source checked and ready for FortHub summaries, links, and public feed updates.`,
      sourceName: source.name,
      sourceUrl: source.url,
      type: source.type,
      status,
      createdAt: now,
    };
  });

  feedItems = [...generated, ...feedItems].slice(0, 100);

  // Persist to Supabase
  if (process.env.SUPABASE_URL) {
    try {
      await supabase.from('feed_items').insert(generated.map(item => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        source_name: item.sourceName,
        source_url: item.sourceUrl,
        type: item.type,
        status: item.status
      })));
    } catch (err) {
      console.error("Supabase Feed Error:", err);
    }
  }

  logEvent({
    type: "FEED_OPS",
    message: `Feed Ops checked ${generated.length} approved Fortnite sources.`,
    count: generated.length,
  });

  return generated;
}

export function getFeedItems() {
  return feedItems;
}

export async function addManualFeedItem(item: Omit<FeedItem, "id" | "createdAt">) {
  const created: FeedItem = {
    id: `manual-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...item,
  };

  feedItems = [created, ...feedItems].slice(0, 100);

  if (process.env.SUPABASE_URL) {
    await supabase.from('feed_items').insert([{
      id: created.id,
      title: created.title,
      summary: created.summary,
      source_name: created.sourceName,
      source_url: created.sourceUrl,
      type: created.type,
      status: created.status
    }]);
  }

  logEvent({
    type: "MANUAL_FEED_ITEM",
    message: `Manual feed item added: ${created.title}`,
  });

  return created;
}
