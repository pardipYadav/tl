import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import '@/styles/animations.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import ChatWidget from '@/components/ChatWidget';
import JsonLd from '@/components/seo/JsonLd';
import {
  TRAVEL_KEYWORDS,
  buildMetadata,
  getSiteUrl,
  organizationSchema,
  websiteSchema
} from '@/lib/seo';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B2548'
};

const homeMeta = buildMetadata({
  title: 'Divine Simparna Holidays | Tour Packages, Travel Booking & Global Logistics',
  description:
    'Book premium domestic and international tour packages with Divine Simparna Holidays. Expert itineraries for Dubai, Bali, Thailand, Maldives, Europe, Goa & Himachal — plus trusted import-export logistics.',
  path: '/',
  keywords: TRAVEL_KEYWORDS
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...homeMeta,
  title: {
    default: 'Divine Simparna Holidays | Tour Packages, Travel Booking & Global Logistics',
    template: '%s | Divine Simparna Holidays'
  },
  applicationName: 'Divine Simparna Holidays',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Haryana, India'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brandNavy focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="container-max py-6">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
