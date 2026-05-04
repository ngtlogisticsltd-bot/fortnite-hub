import { NextResponse } from 'next/server';
import { getChatMessages, addChatMessage, moderateMessage } from '@/lib/community/chatStore';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const messages = getChatMessages(status);
  return NextResponse.json({ success: true, messages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const msg = addChatMessage(body);
    return NextResponse.json({ success: true, message: msg });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, note } = await req.json();
    moderateMessage(id, status, note);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
