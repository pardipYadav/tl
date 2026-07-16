import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Register',
  description: 'Create your Divine Simparna Holidays account.',
  path: '/register',
  noIndex: true
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
