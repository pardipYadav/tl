import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations/dubai', label: 'Destinations' },
  { href: '/packages', label: 'Packages' },
  { href: '/blog', label: 'Blog' },
  { href: '/booking', label: 'Book' }
];

const socialLinks = [
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' }
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/60 bg-slate-900">
      {/* Main footer content */}
      <div className="container-max">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Brand column – logo sized to match site identity */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link href="/" className="inline-block">
              <BrandLogo />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
              Curated travel experiences across global and domestic destinations. Your journey, beautifully planned.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
              <a href="tel:+919876543210" className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                  <Phone className="h-4 w-4" />
                </span>
                +91 98765 43210
              </a>
              <a href="mailto:hello@divinesimparnaholidays.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                  <Mail className="h-4 w-4" />
                </span>
                hello@divinesimparnaholidays.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-slate-400 transition-colors hover:text-brandOrange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-all hover:bg-brandBlue hover:text-white hover:shadow-lg hover:shadow-brandBlue/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-slate-500">
              Stay connected for travel inspiration and exclusive offers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Divine Simparna Holidays. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="transition-colors hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-slate-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
