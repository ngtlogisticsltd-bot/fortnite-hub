import { NextResponse } from 'next/server';

export async function GET() {
  // Mock JSON configuration that the frontend AdSlot would pull from
  const ads = [
    {
      slot: 'banner',
      image: 'https://assets.mixkit.co/images/preview/mixkit-cyberpunk-city-at-night-211-large.jpg',
      url: 'https://epicgames.com',
      title: 'Mock Sponsor',
      active: true
    }
  ];
  return NextResponse.json(ads);
}
