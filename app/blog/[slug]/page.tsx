import Image from 'next/image';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogCard from '@/components/BlogCard';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;

  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return notFound();

  const related = await Blog.find({ _id: { $ne: blog._id } }).limit(2).lean();

  return (
    <article className="space-y-8">
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <p className="mt-2 text-sm text-slate-500">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className="mt-4 prose max-w-none text-slate-700">{blog.content}</div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
        <p className="font-semibold">Share this post:</p>
        <p className="mt-2 text-sm text-slate-600">Add social sharing links (X, Facebook, WhatsApp, LinkedIn) in production deployment.</p>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Related Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <BlogCard
              key={item._id.toString()}
              blog={{
                _id: item._id.toString(),
                slug: item.slug,
                title: item.title,
                excerpt: item.excerpt,
                content: item.content,
                coverImage: item.coverImage,
                tags: item.tags,
                author: item.author,
                publishedAt: item.createdAt.toISOString()
              }}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
