import { NextResponse } from 'next/server';
import { generateAiClipPlan } from '@/lib/media/aiClipPlanner';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: 'Topic required' }, { status: 400 });

    const plan = generateAiClipPlan(topic);
    return NextResponse.json({ success: true, plan });
  } catch {
    return NextResponse.json({ error: 'Failed to generate clip plan' }, { status: 500 });
  }
}
