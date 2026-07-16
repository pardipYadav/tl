import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_E164,
  absoluteUrl,
  buildMetadata,
  breadcrumbSchema
} from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact Divine Simparna Holidays for custom tour quotes. Share your name, email, phone, destination, and trip duration — we respond with a personalized itinerary.',
  path: '/contact',
  keywords: [
    'contact travel agency',
    'tour enquiry',
    'holiday inquiry form',
    'Divine Simparna contact',
    'custom trip quote'
  ]
});

export default function ContactPage() {
  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us | Divine Simparna Holidays',
    url: absoluteUrl('/contact'),
    mainEntity: {
      '@type': 'TravelAgency',
      name: 'Divine Simparna Holidays',
      email: SUPPORT_EMAIL,
      telephone: SUPPORT_PHONE_E164,
      url: absoluteUrl('/')
    }
  };

  return (
    <div className="container-max py-10 md:py-14">
      <JsonLd data={[breadcrumbSchema([{ name: 'Contact Us', path: '/contact' }]), contactPageLd]} />
      <Breadcrumbs items={[{ name: 'Contact Us', path: '/contact' }]} />

      <div className="mx-auto mt-6 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        <aside className="space-y-6">
          <header>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#C4A053]">Get in touch</p>
            <h1 className="mt-2 text-4xl font-bold text-[#0B2548] md:text-5xl">Contact Us</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
              Tell us where you want to go and for how many days. Our team will email you a tailored
              plan shortly.
            </p>
          </header>

          <ul className="space-y-4 rounded-3xl border border-[#e8e0d0] bg-white/80 p-6 shadow-card">
            <li>
              <a
                href={`tel:${SUPPORT_PHONE_E164}`}
                className="flex items-start gap-3 text-[#0B2548] transition hover:text-[#C4A053]"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EEE3] text-[#C4A053]">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </span>
                  <span className="text-[15px] font-semibold">{SUPPORT_PHONE}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-start gap-3 text-[#0B2548] transition hover:text-[#C4A053]"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EEE3] text-[#C4A053]">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </span>
                  <span className="text-[15px] font-semibold">{SUPPORT_EMAIL}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-[#0B2548]">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EEE3] text-[#C4A053]">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Desk
                </span>
                <span className="text-[15px] font-semibold">India · Global travel desk</span>
              </span>
            </li>
          </ul>
        </aside>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
