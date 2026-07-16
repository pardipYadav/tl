import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/dashboard', '/login', '/register', '/wishlist']
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/packages', '/destinations', '/blog', '/booking']
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}
