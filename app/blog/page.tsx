import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { tryConnectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { sampleBlogs } from '@/data/blogs';
import { BlogType } from '@/types';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Travel Blog',
  description:
    'Travel tips, destination guides, and insider insights from Divine Simparna Holidays — plan smarter trips to Dubai, Bali, Thailand, Maldives, Europe, and India.',
  path: '/blog',
  keywords: [
    'travel blog',
    'destination guides',
    'holiday tips',
    'best time to visit Bali',
    'Dubai travel tips',
    'family holiday destinations'
  ]
});

export default async function BlogPage() {
  const conn = await tryConnectDB();
  let blogs: BlogType[] = sampleBlogs;

  if (conn) {
    const dbBlogs = await Blog.find().sort({ createdAt: -1 }).lean();
    if (dbBlogs.length > 0) {
      blogs = dbBlogs.map((blog) => {
        const row = blog as unknown as BlogType & { _id: { toString(): string }; createdAt: Date };
        return {
          _id: row._id.toString(),
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          content: row.content,
          coverImage: row.coverImage,
          tags: row.tags,
          author: row.author,
          publishedAt: row.createdAt.toISOString()
        };
      });
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />
      <header>
        <h1 className="text-4xl font-bold">Travel Blog</h1>
        <p className="mt-2 text-slate-600">Travel tips, destination guides, and insider insights.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id || blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
