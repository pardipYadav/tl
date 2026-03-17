import { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { samplePackages } from '@/data/packages';
import { sampleBlogs } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'http://localhost:3000';

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/packages`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/booking`, lastModified: new Date() },
    ...destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, lastModified: new Date() })),
    ...samplePackages.map((p) => ({ url: `${base}/packages/${p.slug}`, lastModified: new Date() })),
    ...sampleBlogs.map((b) => ({ url: `${base}/blog/${b.slug}`, lastModified: new Date() }))
  ];
}
