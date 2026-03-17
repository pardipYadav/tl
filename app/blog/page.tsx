import BlogCard from '@/components/BlogCard';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export default async function BlogPage() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Travel Blog</h1>
      <p className="text-slate-600">Travel tips, destination guides, and insider insights.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id.toString()}
            blog={{
              _id: blog._id.toString(),
              slug: blog.slug,
              title: blog.title,
              excerpt: blog.excerpt,
              content: blog.content,
              coverImage: blog.coverImage,
              tags: blog.tags,
              author: blog.author,
              publishedAt: blog.createdAt.toISOString()
            }}
          />
        ))}
      </div>
    </div>
  );
}
