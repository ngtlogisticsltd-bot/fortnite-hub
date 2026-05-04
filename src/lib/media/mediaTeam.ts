export type MediaSourceType = 'embed' | 'ai_original' | 'manual_review' | 'needs_permission' | 'blocked';
export type MediaPlatform = 'youtube' | 'twitch' | 'x' | 'tiktok' | 'instagram' | 'local_ai' | 'manual';
export type MediaRisk = 'low' | 'medium' | 'high';
export type MediaBotStatus = 'LIVE' | 'MANUAL' | 'MANUAL_REVIEW' | 'NEEDS_APPROVAL' | 'BLOCKED';

export interface MediaBot {
  id: string;
  name: string;
  purpose: string;
  status: MediaBotStatus;
  riskLevel: MediaRisk;
  approvalRequired: boolean;
  allowedActions: string[];
  blockedActions: string[];
}

export const mediaTeam = {
  id: 'media-rights-team',
  name: 'Media Rights & AI Clips Team',
  purpose: 'Handles creator embeds, commentary, attribution, AI-original media planning, and legal media workflows.',
  bots: [
    {
      id: 'embed-compliance',
      name: 'Embed Compliance Bot',
      purpose: 'Verifies that all embedded media uses official platform embed codes only.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'low' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Verify embed URLs', 'Check platform embed format', 'Flag non-embed links'],
      blockedActions: ['Download videos', 'Re-upload content', 'Mirror streams']
    },
    {
      id: 'attribution',
      name: 'Attribution Bot',
      purpose: 'Ensures every embedded item has visible creator credit and a link to the original source.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'low' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Add creator name', 'Add source link', 'Generate attribution text'],
      blockedActions: ['Remove credit', 'Claim ownership', 'Alter creator branding']
    },
    {
      id: 'commentary-writer',
      name: 'Commentary Writer Bot',
      purpose: 'Drafts original FortHub commentary, analysis, and context around embedded media.',
      status: 'MANUAL' as MediaBotStatus,
      riskLevel: 'medium' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Draft commentary', 'Suggest analysis angles', 'Generate summaries'],
      blockedActions: ['Copy creator scripts', 'Plagiarize descriptions', 'Fabricate quotes']
    },
    {
      id: 'creator-credit',
      name: 'Creator Credit Bot',
      purpose: 'Manages the creator database and ensures proper linking on all media pages.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'low' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Store creator profiles', 'Link to socials', 'Display credit badges'],
      blockedActions: ['Impersonate creators', 'Fake partnerships', 'Send unauthorized DMs']
    },
    {
      id: 'rights-risk-scanner',
      name: 'Rights Risk Scanner Bot',
      purpose: 'Scans media queue entries for potential copyright or licensing risks.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'high' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Flag risky content', 'Check embed legality', 'Recommend BLOCKED status'],
      blockedActions: ['Auto-approve risky content', 'Override manual blocks']
    },
    {
      id: 'ai-clip-planner',
      name: 'AI Clip Planner Bot',
      purpose: 'Generates safe, original script/storyboard plans for AI-made videos.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'medium' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Generate scripts', 'Plan scenes', 'Suggest thumbnails', 'Write captions'],
      blockedActions: ['Use copyrighted footage', 'Use creator footage', 'Use Epic trailers without embed']
    },
    {
      id: 'ai-video-script',
      name: 'AI Video Script Bot',
      purpose: 'Writes voiceover scripts for original FortHub video content.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'medium' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Write original scripts', 'Generate hooks', 'Plan video structure'],
      blockedActions: ['Copy other creators\' scripts', 'Impersonate Epic Games', 'Use leaked content']
    },
    {
      id: 'thumbnail-concept',
      name: 'Thumbnail Concept Bot',
      purpose: 'Generates text prompts for AI-generated or designed thumbnails.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'low' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Generate thumbnail text prompts', 'Suggest color palettes', 'Recommend layouts'],
      blockedActions: ['Use official Fortnite key art without license', 'Copy creator thumbnails']
    },
    {
      id: 'shorts-caption',
      name: 'Shorts Caption Bot',
      purpose: 'Generates captions, hashtags, and hooks for short-form video posts.',
      status: 'LIVE' as MediaBotStatus,
      riskLevel: 'low' as MediaRisk,
      approvalRequired: false,
      allowedActions: ['Generate captions', 'Suggest hashtags', 'Write hooks'],
      blockedActions: ['Auto-post to platforms', 'Spam hashtags', 'Use misleading titles']
    },
    {
      id: 'media-publish-gate',
      name: 'Media Publish Gate Bot',
      purpose: 'Final approval gate before any media content goes live on FortHub.',
      status: 'MANUAL_REVIEW' as MediaBotStatus,
      riskLevel: 'high' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Hold content for review', 'Release approved content', 'Reject risky items'],
      blockedActions: ['Auto-publish without review', 'Bypass rights checks']
    },
    {
      id: 'creator-outreach',
      name: 'Creator Outreach Bot',
      purpose: 'Drafts outreach messages to creators for feature permission or collaboration.',
      status: 'MANUAL' as MediaBotStatus,
      riskLevel: 'medium' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Draft outreach templates', 'Track outreach status', 'Log responses'],
      blockedActions: ['Send automated DMs', 'Impersonate FortHub staff', 'Promise compensation without approval']
    },
    {
      id: 'media-monetization',
      name: 'Media Monetization Bot',
      purpose: 'Ensures monetization rules are respected for embedded vs original content.',
      status: 'NEEDS_APPROVAL' as MediaBotStatus,
      riskLevel: 'high' as MediaRisk,
      approvalRequired: true,
      allowedActions: ['Check monetization eligibility', 'Flag ad placement near embeds', 'Verify original content status'],
      blockedActions: ['Claim ownership of embedded content', 'Place ads inside embeds', 'Monetize without rights']
    }
  ] as MediaBot[]
};
