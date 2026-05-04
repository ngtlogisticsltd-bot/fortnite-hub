import { DispatchItem, DispatchResult } from './types';

// In-memory cache for the dispatcher in dev/fallback mode
let dispatchCache: DispatchItem[] = [];

export async function dispatchData(): Promise<DispatchResult> {
  const errors: string[] = [];
  const timestamp = new Date().toISOString();

  // MOCK Pulling logic - in a real app, this would fetch from various APIs
  const rawItems: Partial<DispatchItem>[] = [
    {
      id: `shop-${Date.now()}`,
      title: 'Item Shop Updated',
      type: 'SHOP',
      source: 'Fortnite API',
      sourceLabel: 'LIVE',
      category: 'Store',
      priority: 'HIGH',
      routeTarget: 'item-shop',
      legalStatus: 'UNOFFICIAL',
      summary: 'New Marvel and Icon Series skins added to the shop.'
    },
    {
      id: `news-${Date.now()}`,
      title: 'New Hotfix v30.15',
      type: 'NEWS',
      source: 'X (FortniteStatus)',
      sourceLabel: 'MANUAL',
      category: 'Patch Notes',
      priority: 'CRITICAL',
      routeTarget: 'patch-notes',
      legalStatus: 'UNOFFICIAL',
      summary: 'Tactical Shotgun headshot multiplier slightly reduced.'
    },
    {
      id: `draw-${Date.now()}`,
      title: 'Fan Giveaway Coming Soon',
      type: 'DRAW',
      source: 'FortHub Ops',
      sourceLabel: 'MANUAL',
      category: 'Community',
      priority: 'HIGH',
      routeTarget: 'weekly-draw',
      legalStatus: 'UNOFFICIAL',
      summary: 'Join the waitlist for the first ever FortHub fan giveaway.'
    }
  ];

  const processedItems: DispatchItem[] = rawItems.map(item => ({
    id: item.id || Math.random().toString(36),
    title: item.title || 'Untitled Update',
    type: item.type || 'NEWS',
    source: item.source || 'FortHub Internal',
    sourceLabel: item.sourceLabel || 'MOCK',
    category: item.category || 'General',
    priority: item.priority || 'LOW',
    routeTarget: item.routeTarget || 'homepage',
    legalStatus: item.legalStatus || 'UNOFFICIAL',
    timestamp,
    summary: item.summary || 'No summary provided.'
  }));

  dispatchCache = [...processedItems, ...dispatchCache].slice(0, 50);

  return {
    pulledCount: rawItems.length,
    routedCount: processedItems.length,
    errors,
    items: processedItems
  };
}

export function getLatestDispatchedItems(): DispatchItem[] {
  return dispatchCache;
}
