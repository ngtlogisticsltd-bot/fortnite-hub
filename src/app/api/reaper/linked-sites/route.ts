import { NextResponse } from 'next/server';
import { linkedSites } from '@/lib/reaper/linkedSites';

export async function GET() {
  const envVars = process.env;

  const processedSites = linkedSites.map(site => {
    let currentStatus = site.status;

    // Dynamically update status based on environment
    if (site.id === 'forthub-main' && envVars.NEXT_PUBLIC_SITE_URL) {
      currentStatus = 'LIVE';
    }

    return {
      ...site,
      currentStatus
    };
  });

  return NextResponse.json({
    success: true,
    sites: processedSites
  });
}
