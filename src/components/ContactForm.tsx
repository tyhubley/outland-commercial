'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'ok' | 'err';

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-ink mb-1.5">
      {children}
      {required && <span className="text-primary ml-0.5">*</span>}
    </label>
  );
}

function IconSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('loading');
    setError(null);
    const data = Object.fromEntries(new FormData(form).entries());
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
      form.reset();
      setStatus('ok');
      // Fire confetti celebration
      const confetti = (await import('canvas-confetti')).default;
      const colors = ['#FE4C02', '#FFB089', '#020817', '#F8FAFC'];
      confetti({
        particleCount: 80,
        spread: 65,
        startVelocity: 40,
        origin: { y: 0.55 },
        colors,
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors,
          disableForReducedMotion: true,
        });
      }, 220);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return <SuccessPanel />;
  }

  const inputBase =
    'block w-full rounded-lg border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15';

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>Name</Label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your full name" className={inputBase} />
        </div>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputBase} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(262) 555-0123" className={inputBase} />
        </div>
        <div>
          <Label htmlFor="address">Property address</Label>
          <input id="address" name="address" autoComplete="street-address" placeholder="Street, City" className={inputBase} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">How can we help?</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your property, services you're interested in, and your timeline."
          className={inputBase + ' resize-y min-h-[140px]'}
        />
      </div>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:bg-primary-hover active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <IconSpinner /> Sending…
          </>
        ) : (
          <>
            Request free estimate
            <span className="transition-transform group-hover:translate-x-0.5"><IconArrow /></span>
          </>
        )}
      </button>

      <p className="text-[12px] text-ink-subtle text-center">
        We typically respond within one business day. Your information stays private.
      </p>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-800">
          <strong className="font-semibold">Couldn&apos;t send.</strong> {error} Please try again or call <a href="tel:2628992035" className="underline font-semibold">(262) 899-2035</a>.
        </div>
      )}
    </form>
  );
}

function SuccessPanel() {
  return (
    <div className="text-center py-6">
      <div className="mx-auto w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-white ring-4 ring-primary-soft overflow-hidden flex items-center justify-center success-pop">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain"
          aria-hidden
        >
          <source src="/videos/outland-logo-anim.mp4" type="video/mp4" />
        </video>
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink fade-up">
        Message received
      </h3>
      <p className="mt-3 text-ink-muted max-w-sm mx-auto fade-up delay-1">
        Thanks for reaching out. A member of the OUTLAND team will be in touch within one business day.
      </p>
      <p className="mt-6 text-sm text-ink-subtle fade-up delay-2">
        Need a hand sooner? Call us at{' '}
        <a href="tel:2628992035" className="font-semibold text-primary hover:underline">(262) 899-2035</a>
      </p>
    </div>
  );
}
