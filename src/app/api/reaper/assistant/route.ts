import { NextResponse } from 'next/server';
import { processAssistantCommand } from '@/lib/reaper/assistant';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

    const response = processAssistantCommand(message, process.env);
    
    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process command' }, { status: 500 });
  }
}

export async function GET() {
  const isEnvConnected = !!process.env.NEXT_PUBLIC_SITE_URL && !!process.env.DATABASE_URL;
  
  let nextBestAction = 'Create GitHub Repository';
  if (process.env.GITHUB_REPO_URL && !process.env.NEXT_PUBLIC_SITE_URL) nextBestAction = 'Deploy to Vercel';
  if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.DATABASE_URL) nextBestAction = 'Connect Supabase';
  if (isEnvConnected) nextBestAction = 'Publish 15 Guides for AdSense';

  return NextResponse.json({
    status: "online",
    nextBestAction,
    commands: [
      "status", "next", "deploy", "domain", "github", 
      "supabase", "ads", "traffic", "daily", "revenue", 
      "legal", "help"
    ]
  });
}
