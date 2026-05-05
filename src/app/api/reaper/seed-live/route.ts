import { NextResponse } from "next/server";
import { logEvent } from "@/lib/reaper/core/log";

export const dynamic = "force-dynamic";

const seedEvents = [
  {
    type: "SYSTEM",
    message: "FortHub live feed connected.",
  },
  {
    type: "REAPER",
    message: "REAPER backend is online and ready.",
  },
  {
    type: "MEDIA",
    message: "Media queue ready for approved YouTube embeds.",
  },
  {
    type: "NEWS",
    message: "News feed ready for official Fortnite source updates.",
  },
  {
    type: "MONEY",
    message: "Affiliate click tracking route is active.",
  },
];

export async function GET() {
  for (const event of seedEvents) {
    await logEvent(event);
  }

  return NextResponse.json({
    success: true,
    message: "Live feed seeded.",
    created: seedEvents.length,
    events: seedEvents,
  });
}
