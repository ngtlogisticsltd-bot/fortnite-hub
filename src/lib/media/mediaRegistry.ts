import { MediaSourceType, MediaPlatform, MediaRisk } from './mediaTeam';

export interface MediaItem {
  id: string;
  title: string;
  platform: MediaPlatform;
  sourceType: MediaSourceType;
  originalUrl: string;
  embedUrl: string;
  creatorName: string;
  attributionText: string;
  fortHubCommentary: string;
  legalStatus: 'SAFE' | 'REVIEW_NEEDED' | 'BLOCKED';
  riskLevel: MediaRisk;
  approvalRequired: boolean;
  monetizationAllowed: boolean;
  notes: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: 'yt-embed-placeholder',
    title: 'Featured YouTube Creator Embed',
    platform: 'youtube',
    sourceType: 'embed',
    originalUrl: 'https://www.youtube.com/watch?v=PLACEHOLDER',
    embedUrl: 'https://www.youtube.com/embed/PLACEHOLDER',
    creatorName: 'Creator Name (Replace)',
    attributionText: 'Video by Creator Name. Embedded via YouTube official embed.',
    fortHubCommentary: 'FortHub analysis: This video showcases key gameplay strategies for the current season. Our take — the loadout featured here is highly competitive in ranked play.',
    legalStatus: 'SAFE',
    riskLevel: 'low',
    approvalRequired: false,
    monetizationAllowed: true,
    notes: 'Monetization is allowed around the page (ads, sponsors) but NOT claiming ownership of the embedded video itself.'
  },
  {
    id: 'twitch-embed-placeholder',
    title: 'Featured Twitch Clip Embed',
    platform: 'twitch',
    sourceType: 'embed',
    originalUrl: 'https://www.twitch.tv/PLACEHOLDER/clip/PLACEHOLDER',
    embedUrl: 'https://clips.twitch.tv/embed?clip=PLACEHOLDER&parent=forthub.com',
    creatorName: 'Streamer Name (Replace)',
    attributionText: 'Clip by Streamer Name. Embedded via Twitch official embed.',
    fortHubCommentary: 'FortHub breakdown: This clip demonstrates an advanced editing technique that has been gaining popularity among competitive players.',
    legalStatus: 'SAFE',
    riskLevel: 'low',
    approvalRequired: false,
    monetizationAllowed: true,
    notes: 'Use Twitch official embed code only. Never download or re-host clips.'
  },
  {
    id: 'ai-commentary-video',
    title: 'AI-Original: Daily Item Shop Commentary',
    platform: 'local_ai',
    sourceType: 'ai_original',
    originalUrl: '',
    embedUrl: '',
    creatorName: 'FortHub Original',
    attributionText: 'Original content by FortHub. AI-assisted script, original voiceover.',
    fortHubCommentary: 'A daily recap video using AI-generated scripts and royalty-free visuals to break down item shop rotations, rarity analysis, and community reactions.',
    legalStatus: 'SAFE',
    riskLevel: 'medium',
    approvalRequired: true,
    monetizationAllowed: true,
    notes: 'Must use royalty-free or self-owned assets. No copyrighted Fortnite footage unless embedded from official source.'
  },
  {
    id: 'ai-short-script',
    title: 'AI-Original: 30-Second XP Maps Short',
    platform: 'local_ai',
    sourceType: 'ai_original',
    originalUrl: '',
    embedUrl: '',
    creatorName: 'FortHub Original',
    attributionText: 'Original short-form content by FortHub.',
    fortHubCommentary: 'A quick vertical video script covering the top 3 XP maps of the week with map codes, XP rates, and community ratings.',
    legalStatus: 'SAFE',
    riskLevel: 'medium',
    approvalRequired: true,
    monetizationAllowed: true,
    notes: 'Script and visuals must be original or royalty-free. No creator footage.'
  },
  {
    id: 'creator-feature-article',
    title: 'Creator Feature: Rising Fortnite Streamers',
    platform: 'manual',
    sourceType: 'manual_review',
    originalUrl: '',
    embedUrl: '',
    creatorName: 'Multiple Creators',
    attributionText: 'Featured creators are credited individually with links to their channels.',
    fortHubCommentary: 'A curated editorial featuring up-and-coming Fortnite content creators with embedded clips, channel links, and FortHub\'s original analysis of their playstyles.',
    legalStatus: 'REVIEW_NEEDED',
    riskLevel: 'medium',
    approvalRequired: true,
    monetizationAllowed: true,
    notes: 'Each creator featured must be linked and credited. Consider reaching out for permission before publishing feature articles.'
  }
];
