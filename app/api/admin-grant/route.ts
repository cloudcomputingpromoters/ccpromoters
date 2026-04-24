import { NextRequest, NextResponse } from 'next/server';

// Validates the secret — the client then calls setProfile({ role: 'admin' }) itself
export async function POST(req: NextRequest) {
  const setupSecret = process.env.ADMIN_SETUP_SECRET;
  if (!setupSecret) {
    return NextResponse.json({ error: 'ADMIN_SETUP_SECRET not configured on server' }, { status: 503 });
  }

  const { secret } = await req.json();
  if (!secret || secret !== setupSecret) {
    return NextResponse.json({ error: 'Invalid secret token' }, { status: 403 });
  }

  return NextResponse.json({ ok: true });
}
