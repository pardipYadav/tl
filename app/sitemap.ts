import type { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { samplePackages } from '@/data/packages';
import { sampleBlogs } from '@/data/blogs';
import { getSiteUrl } from '@/lib/seo';
import { tryConnectDB } from '@/lib/db';
import Package from '@/models/Package';
import Blog from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/packages`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/destinations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 }
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  let packageSlugs = samplePackages.map((p) => p.slug);
  let blogSlugs = sampleBlogs.map((b) => ({ slug: b.slug, updatedAt: b.publishedAt }));

  const conn = await tryConnectDB();
  if (conn) {
    try {
      const [dbPackages, dbBlogs] = await Promise.all([
        Package.find().select('slug updatedAt').lean(),
        Blog.find().select('slug updatedAt createdAt').lean()
      ]);

      if (dbPackages.length) {
        packageSlugs = Array.from(
          new Set([
            ...packageSlugs,
            ...dbPackages.map((p) => (p as unknown as { slug: string }).slug)
          ])
        );
      }

      if (dbBlogs.length) {
        const mapped = dbBlogs.map((b) => {
          const row = b as unknown as { slug: string; updatedAt?: Date; createdAt?: Date };
          return {
            slug: row.slug,
            updatedAt: (row.updatedAt || row.createdAt || now).toISOString()
          };
        });
        const bySlug = new Map(blogSlugs.map((item) => [item.slug, item]));
        mapped.forEach((item) => bySlug.set(item.slug, item));
        blogSlugs = Array.from(bySlug.values());
      }
    } catch {
      // Fall back to sample data if DB query fails during build
    }
  }

  const packageRoutes: MetadataRoute.Sitemap = packageSlugs.map((slug) => ({
    url: `${base}/packages/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes, ...blogRoutes];
}
