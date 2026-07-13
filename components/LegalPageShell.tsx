import type { ReactNode } from 'react';
import Link from 'next/link';

export function LegalPageShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <div className="rounded-3xl border border-[#e8e0d0] bg-gradient-to-br from-[#0B2548] to-[#16396a] px-6 py-10 text-white shadow-card sm:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C4A053]">Divine Simparna Pvt. Ltd.</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">{subtitle}</p>
        <p className="mt-4 text-sm text-white/60">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="rounded-3xl border border-[#e8e0d0] bg-white p-6 shadow-card sm:p-10">
        <div className="mb-8 rounded-2xl border border-[#C4A053]/30 bg-[#F8F5EF] p-5 text-sm text-[#0B2548]">
          <p className="font-semibold text-[#0B2548]">Company details</p>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Company</dt>
              <dd className="font-medium">Divine Simparna Pvt. Ltd.</dd>
            </div>
            <div>
              <dt className="text-slate-500">GST</dt>
              <dd className="font-medium">06AAMCD0334P1ZF</dd>
            </div>
            <div>
              <dt className="text-slate-500">CIN</dt>
              <dd className="font-medium">U52291HR2025PTC136386</dd>
            </div>
            <div>
              <dt className="text-slate-500">PAN</dt>
              <dd className="font-medium">AAMCD0334P</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium">
                <a href="mailto:info@divinesimparna.com" className="text-[#0B2548] underline decoration-[#C4A053]/60 underline-offset-2 hover:text-[#C4A053]">
                  info@divinesimparna.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="legal-content space-y-8 text-[15px] leading-relaxed text-slate-700">{children}</div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-[#e8e0d0] pt-6 text-sm">
          <Link href="/privacy" className="font-medium text-[#0B2548] hover:text-[#C4A053]">
            Privacy Policy
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/terms" className="font-medium text-[#0B2548] hover:text-[#C4A053]">
            Terms &amp; Conditions
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/" className="font-medium text-[#0B2548] hover:text-[#C4A053]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-xl font-semibold text-[#0B2548]">{title}</h2>
      <div className="mt-2 h-1 w-10 rounded-full bg-[#C4A053]" />
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
