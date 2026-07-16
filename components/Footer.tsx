import Link from 'next/link';
import type { Route } from 'next';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const quickLinks: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/destinations/dubai' as Route, label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/blog', label: 'Blog' },
  { href: '/booking', label: 'Book a Trip' }
];

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' }
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0B2548] text-white">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-[#C4A053]/40 via-[#C4A053] to-[#C4A053]/40" />

      <div className="container-max relative z-10 py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex rounded-2xl border border-[#C4A053]/40 bg-[#F8F5EF] p-4 shadow-lg"
            >
              <BrandLogo variant="footer" link={false} />
            </Link>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/85">
              Premium journeys and trusted global logistics from Divine Simparna Pvt Ltd — traveling,
              importing, and exporting with care.
            </p>

            <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#C4A053]">
            Traveling
              {/* Traveling · Importer · Exporter */}
            </p>

            <div className="mt-8 space-y-4">
              <a href="tel:+918284879420" className="flex items-center gap-3 text-[15px] text-white transition hover:text-[#C4A053]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#C4A053] ring-1 ring-white/15">
                  <Phone className="h-4 w-4" />
                </span>
                +91 82848 79420
              </a>
              <a
                href="mailto:hello@divinesimparnaholidays.com"
                className="flex items-center gap-3 text-[15px] text-white transition hover:text-[#C4A053]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#C4A053] ring-1 ring-white/15">
                  <Mail className="h-4 w-4" />
                </span>
                info@divinesimparna.com
              </a>
              <p className="flex items-center gap-3 text-[15px] text-white/80">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#C4A053] ring-1 ring-white/15">
                  <MapPin className="h-4 w-4" />
                </span>
                India · Global travel & trade desk
              </p>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3 lg:pt-2">
            <h4 className="text-[16px] font-bold text-white" style={{ color: '#ffffff' }}>
              Explore
            </h4>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#C4A053]" />
            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] font-medium text-white/85 transition hover:text-[#C4A053]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay connected */}
          <div className="lg:col-span-4 lg:pt-2">
            <h4 className="text-[16px] font-bold text-white" style={{ color: '#ffffff' }}>
              Stay Connected
            </h4>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#C4A053]" />
            <p className="mt-6 text-[15px] leading-relaxed text-white/80">
              Follow Divine Simparna for destination inspiration, travel offers, and trade updates.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-[#C4A053] hover:text-[#0B2548] hover:ring-[#C4A053]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <Link
              href="/booking"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#C4A053] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#0B2548] shadow-md transition hover:bg-[#d4b36a]"
            >
              Plan Your Journey
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-[13px] text-white/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Divine Simparna Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-[#C4A053]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-[#C4A053]">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
