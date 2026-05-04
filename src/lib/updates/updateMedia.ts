export interface UpdateMediaItem {
  id: string;
  title: string;
  date: string;
  category: 'Gameplay' | 'Cosmetics' | 'Map' | 'LTM' | 'Technical';
  imageUrl: string;
  embedUrl?: string;
  sourceType: 'live' | 'embed' | 'manual' | 'placeholder';
  attribution: string;
  summary: string;
  fortHubCommentary: string;
  riskLevel: 'low' | 'medium' | 'high';
  legalStatus: 'LIVE' | 'EMBED' | 'MANUAL_REVIEW' | 'PLACEHOLDER';
}

export const updateMedia: UpdateMediaItem[] = [
  {
    id: 'placeholder-latest',
    title: 'New Season Update Tracker',
    date: 'May 2026',
    category: 'Gameplay',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    sourceType: 'placeholder',
    attribution: 'Placeholder via Unsplash',
    summary: 'Awaiting the latest official patch notes from Fortnite servers.',
    fortHubCommentary: 'FortHub will update this card as soon as the next major version is pushed to the staging environment.',
    riskLevel: 'low',
    legalStatus: 'PLACEHOLDER'
  },
  {
    id: 'embed-yt-v30-00',
    title: 'Chapter 5 Season 3 Overview',
    date: 'May 24, 2024',
    category: 'Gameplay',
    imageUrl: 'https://img.youtube.com/vi/6jK74YfNBy8/maxresdefault.jpg',
    embedUrl: 'https://www.youtube.com/embed/6jK74YfNBy8',
    sourceType: 'embed',
    attribution: 'Official Fortnite YouTube Channel',
    summary: 'A look at the Wrecked season mechanics and vehicles.',
    fortHubCommentary: 'Vehicle combat is the core focus this season. Upgrading your car with a machine gun turret is highly recommended for survival.',
    riskLevel: 'low',
    legalStatus: 'EMBED'
  }
];
