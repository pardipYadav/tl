import type { MetadataRoute } from 'next';
import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Divine Simparna',
    description: SITE_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F4',
    theme_color: '#0B2548',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  };
}
