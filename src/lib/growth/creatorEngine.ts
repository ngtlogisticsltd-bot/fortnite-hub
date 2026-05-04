import { CreatorTarget } from './types';

export function getCreatorTargets(): CreatorTarget[] {
  return [
    {
      name: "Top Fortnite Streamer",
      platform: "Twitch",
      profileUrl: "https://twitch.tv/placeholder",
      embedUrl: "https://player.twitch.tv/?channel=placeholder",
      commentaryAngle: "Daily gameplay breakdown and loadout analysis.",
      status: "NEEDS_OWNER_INPUT"
    },
    {
      name: "Pro Build Strategist",
      platform: "YouTube",
      profileUrl: "https://youtube.com/placeholder",
      embedUrl: "https://www.youtube.com/embed/placeholder",
      commentaryAngle: "Advanced building techniques and competitive meta.",
      status: "NEEDS_OWNER_INPUT"
    }
  ];
}

export function createCreatorEmbedPlan(creator: CreatorTarget) {
  return {
    action: "Embed Video",
    attribution: `Content by ${creator.name} via ${creator.platform}`,
    link: creator.profileUrl,
    commentary: `FortHub Analysis: ${creator.commentaryAngle}`
  };
}
