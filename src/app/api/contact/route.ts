import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * OUTLAND has been sold. The site now runs as a portfolio piece for
 * Garten (gartenhq.com). Contact submissions are disabled so nobody
 * ever thinks they reached a business that can take their call.
 * Return 410 Gone with a message pointing at Garten.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "This site is a portfolio piece. OUTLAND Commercial has been sold. To reach the founder or see the platform that built this site, visit gartenhq.com.",
    },
    { status: 410 },
  );
}
