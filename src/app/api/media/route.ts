import { NextResponse } from 'next/server';
import { mediaTeam } from '@/lib/media/mediaTeam';
import { mediaItems } from '@/lib/media/mediaRegistry';

export async function GET() {
  return NextResponse.json({
    success: true,
    mediaTeam,
    mediaItems
  });
}
