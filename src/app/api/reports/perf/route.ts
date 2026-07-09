import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE, SITE as _siteRef } from '@/data/site';

export const runtime = 'nodejs';
// Fluid Compute default (300s) is plenty — PSI usually responds in 10-30s.
export const maxDuration = 60;

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const SITE_URL = 'https://www.outlandmanagement.com';

type Strategy = 'mobile' | 'desktop';
type Score = { category: string; value: number };
type StrategyResult = { strategy: Strategy; scores: Score[]; metrics: Record<string, string> };

async function fetchPSI(url: string, strategy: Strategy): Promise<StrategyResult | null> {
  const params = new URLSearchParams({
    url,
    strategy,
    category: 'performance',
  });
  ['accessibility', 'best-practices', 'seo'].forEach(c => params.append('category', c));
  const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
    // Give it plenty of time — PSI is not fast.
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const cats = data?.lighthouseResult?.categories ?? {};
  const audits = data?.lighthouseResult?.audits ?? {};
  return {
    strategy,
    scores: Object.entries(cats).map(([id, c]: [string, unknown]) => ({
      category: id,
      value: Math.round(((c as { score?: number }).score || 0) * 100),
    })),
    metrics: {
      LCP: audits['largest-contentful-paint']?.displayValue ?? '—',
      TBT: audits['total-blocking-time']?.displayValue ?? '—',
      CLS: audits['cumulative-layout-shift']?.displayValue ?? '—',
      FCP: audits['first-contentful-paint']?.displayValue ?? '—',
      SI: audits['speed-index']?.displayValue ?? '—',
    },
  };
}

function scoreColor(v: number) {
  if (v >= 90) return '#10b981';
  if (v >= 50) return '#f59e0b';
  return '#ef4444';
}

function renderHTML(mobile: StrategyResult | null, desktop: StrategyResult | null) {
  const scoreCard = (label: string, value: number | undefined) => `
    <div style="flex:1;text-align:center;padding:16px 8px;border-radius:12px;background:#f8fafc;">
      <div style="font-size:32px;font-weight:700;color:${scoreColor(value ?? 0)};">${value ?? '?'}</div>
      <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;">${label}</div>
    </div>`;

  const strategyBlock = (r: StrategyResult | null, label: string) => {
    if (!r) return `<p>${label}: unavailable</p>`;
    const s = Object.fromEntries(r.scores.map(x => [x.category, x.value]));
    return `
      <h2 style="margin:24px 0 8px;font-size:18px;">${label}</h2>
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        ${scoreCard('Performance', s['performance'])}
        ${scoreCard('Accessibility', s['accessibility'])}
        ${scoreCard('Best Practices', s['best-practices'])}
        ${scoreCard('SEO', s['seo'])}
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          ${['LCP','FCP','TBT','SI','CLS'].map(k => `
            <tr>
              <td style="padding:8px 0;color:#64748b;">${k}</td>
              <td style="padding:8px 0;text-align:right;font-weight:600;color:#0f172a;">${r.metrics[k]}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  };

  return `<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;padding:24px;color:#0f172a;">
  <div style="max-width:640px;margin:auto;background:white;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <h1 style="margin:0;font-size:22px;">Bi-Weekly Performance Report</h1>
      <span style="font-size:12px;color:#64748b;">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
    </div>
    <p style="margin:0 0 20px;color:#475569;font-size:14px;">
      Automated Lighthouse audit of <a href="${SITE_URL}" style="color:#FE4C02;text-decoration:none;">${SITE_URL}</a> via Google PageSpeed Insights.
    </p>
    ${strategyBlock(desktop, 'Desktop')}
    ${strategyBlock(mobile, 'Mobile')}
    <p style="margin-top:32px;font-size:12px;color:#64748b;">
      Any category scoring below 90 is worth investigating — reply to this email and we'll take a look.
    </p>
  </div>
</body></html>`;
}

export async function GET(req: Request) {
  // Cron auth: Vercel Cron sends this header. Also allow manual runs with our secret.
  const authHeader = req.headers.get('authorization');
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isVercelInternal = req.headers.get('x-vercel-cron') === '1';
  if (!isVercelCron && !isVercelInternal && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 });
  }

  const [mobile, desktop] = await Promise.all([
    fetchPSI(SITE_URL, 'mobile'),
    fetchPSI(SITE_URL, 'desktop'),
  ]);

  const html = renderHTML(mobile, desktop);
  const to = (process.env.REPORT_TO || SITE.email).split(',').map(s => s.trim()).filter(Boolean);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || 'OUTLAND Website <noreply@outlandmanagement.com>',
    to,
    subject: `Bi-weekly performance report — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
    html,
  });
  if (error) {
    return NextResponse.json({ error: String(error) }, { status: 502 });
  }
  return NextResponse.json({ ok: true, recipients: to, mobile: mobile?.scores, desktop: desktop?.scores });
}
