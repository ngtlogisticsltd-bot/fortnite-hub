export interface UpdateEmbed {
  id: string;
  title: string;
  creatorName: string;
  platform: 'YouTube' | 'Twitch' | 'X' | 'TikTok';
  embedUrl: string;
  originalUrl: string;
  commentary: string;
  status: 'embed' | 'needs_permission' | 'blocked';
}

export const updateEmbeds: UpdateEmbed[] = [
  {
    id: 'yt-wrecked-trailer',
    title: 'Fortnite Wrecked Gameplay Trailer',
    creatorName: 'Fortnite',
    platform: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/6jK74YfNBy8',
    originalUrl: 'https://www.youtube.com/watch?v=6jK74YfNBy8',
    commentary: 'The Wrecked trailer highlights the new Wasteland biome and vehicle modding system.',
    status: 'embed'
  }
];
