import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Wishlist',
  description: 'Your saved tour packages.',
  path: '/wishlist',
  noIndex: true
});

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
