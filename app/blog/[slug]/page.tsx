import Image from 'next/image';
import { notFound } from 'next/navigation';
import { tryConnectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogCard from '@/components/BlogCard';
import { sampleBlogs } from '@/data/blogs';
import { BlogType } from '@/types';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conn = await tryConnectDB();

  let blog: BlogType | null = null;
  let related: BlogType[] = [];

  if (conn) {
    const dbBlog = await Blog.findOne({ slug }).lean();
    if (dbBlog) {
      const row = dbBlog as unknown as BlogType & { _id: { toString(): string }; createdAt: Date };
      blog = {
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
      const dbRelated = await Blog.find({ _id: { $ne: row._id } }).limit(2).lean();
      related = dbRelated.map((item) => {
        const r = item as unknown as BlogType & { _id: { toString(): string }; createdAt: Date };
        return {
          _id: r._id.toString(),
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          content: r.content,
          coverImage: r.coverImage,
          tags: r.tags,
          author: r.author,
          publishedAt: r.createdAt.toISOString()
        };
      });
    }
  }

  if (!blog) {
    const sample = sampleBlogs.find((b) => b.slug === slug);
    if (sample) {
      blog = sample;
      related = sampleBlogs.filter((b) => b.slug !== slug).slice(0, 2);
    }
  }

  if (!blog) return notFound();

  return (
    <article className="space-y-8">
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/50 to-transparent" />
      </div>

      <div>
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          By {blog.author} • {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
        <div className="prose mt-4 max-w-none text-slate-700">{blog.content}</div>
      </div>

      <div className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
        <p className="font-semibold text-brandNavy">Share this post</p>
        <p className="mt-2 text-sm text-slate-600">Share with friends planning their next journey.</p>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Related Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <BlogCard key={item._id || item.slug} blog={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
