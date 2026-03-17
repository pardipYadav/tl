'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

const leftNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations/dubai', label: 'Destinations' },
  { href: '/packages', label: 'Packages' }
];

const rightNavLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/booking', label: 'Book' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ link }: { link: { href: string; label: string } }) => {
    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
    return (
      <Link
        href={link.href}
        className={`relative px-3 py-2 text-[14px] font-medium tracking-wide transition-all duration-200 rounded-lg sm:px-4
          ${isActive ? 'text-brandBlue' : 'text-slate-600 hover:text-brandBlue hover:bg-slate-100/80'}`}
      >
        <span className="relative z-10">{link.label}</span>
        {isActive && <span className="absolute inset-0 rounded-lg bg-brandSoft/60" aria-hidden />}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container-max flex items-center justify-between gap-4 py-4">
        {/* Left nav */}
        <nav className="hidden flex-1 basis-0 items-center justify-start gap-0 md:flex">
          {leftNavLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </nav>

        {/* Center logo */}
        <div className="flex shrink-0 items-center justify-center">
          <BrandLogo compact />
        </div>

        {/* Right nav */}
        <nav className="hidden flex-1 basis-0 items-center justify-end gap-0 md:flex">
          {rightNavLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-100 bg-white/98 backdrop-blur-md md:hidden">
          <div className="container-max flex flex-col gap-0.5 py-3">
            {[...leftNavLinks, ...rightNavLinks].map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-[15px] font-medium transition-colors
                    ${isActive ? 'bg-brandSoft/60 text-brandBlue' : 'text-slate-700 hover:bg-slate-50'}`}
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
