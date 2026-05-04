import { NextResponse } from 'next/server';
import { dispatchData, getLatestDispatchedItems } from '@/lib/dataDispatcher/dispatcher';

export async function GET() {
  const items = getLatestDispatchedItems();
  return NextResponse.json({
    success: true,
    items
  });
}

export async function POST() {
  const result = await dispatchData();
  return NextResponse.json(result);
}
