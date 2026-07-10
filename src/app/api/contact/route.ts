import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * OUTLAND has been sold. Contact submissions are permanently disabled.
 * Return 410 Gone so any stale form embeds, bots, or crawlers know
 * this endpoint is not accepting anything.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'This business has been sold. New inquiries are not accepted.' },
    { status: 410 },
  );
}
