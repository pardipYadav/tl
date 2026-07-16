import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Admin',
  description: 'Divine Simparna Holidays admin panel.',
  path: '/admin',
  noIndex: true
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
