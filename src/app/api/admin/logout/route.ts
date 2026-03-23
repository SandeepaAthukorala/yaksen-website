import { NextRequest, NextResponse } from 'next/server';
import { deleteSessionCookie } from '@/lib/session';

export async function POST(request: NextRequest) {
    await deleteSessionCookie();
    return NextResponse.json({ success: true });
}
