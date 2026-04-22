'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed');
      }
      setStatus('ok');
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-xl bg-white p-6 border border-green-200 text-center">
        <div className="text-2xl">✅</div>
        <h3 className="mt-3 font-bold text-ink">Thanks — we&apos;ll be in touch shortly.</h3>
        <p className="mt-2 text-sm text-ink-muted">Your message has been sent. In the meantime, feel free to call us at (262) 899-2035.</p>
      </div>
    );
  }

  const input = 'block w-full rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">Name</label>
        <input id="name" name="name" required autoComplete="name" className={input + ' mt-1'} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={input + ' mt-1'} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={input + ' mt-1'} />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-ink">Full Address</label>
        <input id="address" name="address" autoComplete="street-address" className={input + ' mt-1'} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">Leave us a message</label>
        <textarea id="message" name="message" rows={5} className={input + ' mt-1 resize-y'} />
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button type="submit" disabled={status === 'loading'} className="btn btn-primary w-full">
        {status === 'loading' ? 'Sending…' : 'Submit'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
