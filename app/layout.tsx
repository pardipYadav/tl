import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import '@/styles/animations.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import ChatWidget from '@/components/ChatWidget';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Divine Simparna Pvt Ltd | Travel · Import · Export',
  description: 'Premium tour & travel booking and global logistics with Divine Simparna Pvt Ltd.',
  keywords: ['tour package', 'travel booking', 'Divine Simparna', 'importer', 'exporter'],
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="container-max py-6">{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
