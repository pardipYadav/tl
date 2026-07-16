'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

const leftNavLinks: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/destinations/dubai' as Route, label: 'Destinations' },
  { href: '/packages', label: 'Packages' }
];

const rightNavLinks: { href: Route; label: string }[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/booking', label: 'Book Now' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_10px_40px_rgba(11,37,72,0.08)]">
      {/* Top strip */}
      <div className="bg-[#0B2548] text-white">
        <div className="container-max flex h-10 items-center justify-between text-[12px] sm:text-[13px]">
          <p className="hidden font-medium tracking-[0.08em] text-white/90 sm:block">
            <span className="font-semibold text-[#C4A053]">TRAVELING</span>
            <span className="mx-2 text-[#C4A053]/50">·</span>
            {/* IMPORTER */}
            <span className="mx-2 text-[#C4A053]/50">·</span>
            {/* EXPORTER */}
          </p>
          <p className="font-medium text-[#C4A053] sm:hidden">Divine Simparna</p>
          <a
            href="tel:+918284879420"
            className="inline-flex items-center gap-2 font-medium text-white transition hover:text-[#C4A053]"
          >
            <Phone className="h-3.5 w-3.5 text-[#C4A053]" />
            +91 82848 79420
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b-2 border-[#C4A053]/40 bg-white">
        <div className="container-max flex min-h-[108px] items-center justify-between gap-3 py-2 lg:min-h-[120px]">
          {/* Left nav */}
          <nav className="hidden flex-1 items-center gap-1 md:flex">
            {leftNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-[14px] font-semibold tracking-wide transition lg:px-4
                    ${active ? 'bg-[#F3EEE3] text-[#0B2548]' : 'text-[#334155] hover:bg-[#F3EEE3] hover:text-[#0B2548]'}`}
                >
                  {link.label}
                  {active && <span className="mt-1 block h-0.5 w-full rounded-full bg-[#C4A053]" />}
                </Link>
              );
            })}
          </nav>

          {/* Center logo */}
          <div className="flex flex-1 items-center justify-center md:flex-none">
            <BrandLogo variant="header" />
          </div>

          {/* Right nav */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/blog"
                className={`rounded-md px-3 py-2 text-[14px] font-semibold tracking-wide transition lg:px-4
                  ${isActive('/blog') ? 'bg-[#F3EEE3] text-[#0B2548]' : 'text-[#334155] hover:bg-[#F3EEE3] hover:text-[#0B2548]'}`}
              >
                Blog
              </Link>
              <Link
                href="/booking"
                className="ml-2 inline-flex items-center rounded-full bg-[#C4A053] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0B2548] shadow-sm transition hover:bg-[#d4b36a]"
              >
                Book Now
              </Link>
            </nav>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0B2548]/15 bg-white text-[#0B2548] transition hover:border-[#C4A053] hover:bg-[#F3EEE3] md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-[#e6dfd2] bg-white md:hidden">
          <div className="container-max flex flex-col gap-1 py-4">
            {[...leftNavLinks, ...rightNavLinks].map((link) => {
              const active = isActive(link.href);
              const isCta = link.href === '/booking';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    isCta
                      ? 'mt-2 rounded-full bg-[#C4A053] px-4 py-3 text-center text-[15px] font-bold text-[#0B2548]'
                      : `rounded-xl px-4 py-3 text-[15px] font-semibold transition
                        ${active ? 'bg-[#F3EEE3] text-[#0B2548]' : 'text-[#334155] hover:bg-[#F3EEE3]'}`
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
