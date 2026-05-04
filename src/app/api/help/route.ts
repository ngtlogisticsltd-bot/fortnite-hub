import { NextResponse } from 'next/server';
import { getHelpBotResponse, HelpBotMode } from '@/lib/help/helpBot';
import { SETUP_LINKS } from '@/lib/help/setupLinks';

export async function POST(req: Request) {
  try {
    const { mode, message } = await req.json();
    if (!mode || !message) {
      return NextResponse.json({ error: 'Mode and message are required' }, { status: 400 });
    }
    
    const response = getHelpBotResponse(mode as HelpBotMode, message);
    return NextResponse.json({ success: true, response });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
  }
}

export async function GET() {
  const groups = Array.from(new Set(SETUP_LINKS.map(l => l.group)));
  return NextResponse.json({
    commands: [
      "what is missing?",
      "how do I deploy?",
      "connect github",
      "connect vercel",
      "connect supabase",
      "add domain",
      "setup ads",
      "setup affiliates"
    ],
    linkGroups: groups
  });
}
