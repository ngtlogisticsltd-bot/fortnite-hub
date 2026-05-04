export type SourceLabel = 'LIVE' | 'MOCK' | 'MANUAL' | 'NEEDS_REVIEW';
export type LegalStatus = 'UNOFFICIAL' | 'EMBED' | 'MANUAL_REVIEW' | 'APPROVED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface DispatchItem {
  id: string;
  title: string;
  type: 'NEWS' | 'SHOP' | 'SKINS' | 'UPDATE' | 'MEDIA' | 'SUBMISSION' | 'AD' | 'DRAW';
  source: string;
  sourceLabel: SourceLabel;
  category: string;
  priority: Priority;
  routeTarget: string;
  legalStatus: LegalStatus;
  timestamp: string;
  summary: string;
}

export interface DispatchResult {
  pulledCount: number;
  routedCount: number;
  errors: string[];
  items: DispatchItem[];
}
