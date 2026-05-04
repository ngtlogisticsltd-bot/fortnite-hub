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
    id: 'yt-ch5-s2-trailer',
    title: 'Fortnite Chapter 5 Season 2 | Official Trailer',
    platform: 'youtube',
    sourceType: 'embed',
    originalUrl: 'https://www.youtube.com/watch?v=5UfP1qj6pG0',
    embedUrl: 'https://www.youtube.com/embed/5UfP1qj6pG0',
    creatorName: 'Fortnite Official',
    attributionText: 'Video by Fortnite. Embedded via YouTube official embed.',
    fortHubCommentary: 'FortHub analysis: Myths & Mortals has officially arrived. This trailer showcases the new Greek mythology theme and the introduction of the Wings of Icarus.',
    legalStatus: 'SAFE',
    riskLevel: 'low',
    approvalRequired: false,
    monetizationAllowed: true,
    notes: 'Official Fortnite content is safe for embedding with attribution.'
  },
  {
    id: 'twitch-clip-example',
    title: 'Advanced Waterbending Techniques',
    platform: 'twitch',
    sourceType: 'embed',
    originalUrl: 'https://www.twitch.tv/fortnite/clip/BraveAnimatedTofuUnicorn-PLACEHOLDER',
    embedUrl: 'https://clips.twitch.tv/embed?clip=BraveAnimatedTofuUnicorn-PLACEHOLDER&parent=forthub.com',
    creatorName: 'Fortnite Professional',
    attributionText: 'Clip via Twitch official embed.',
    fortHubCommentary: 'FortHub breakdown: The current meta favors the Avatar mythics. This clip demonstrates perfect timing for the Waterbending ability.',
    legalStatus: 'SAFE',
    riskLevel: 'low',
    approvalRequired: false,
    monetizationAllowed: true,
    notes: 'Use Twitch official embed code only.'
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
