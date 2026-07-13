import BlogCard from '@/components/BlogCard';
import { tryConnectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { sampleBlogs } from '@/data/blogs';
import { BlogType } from '@/types';

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
      <h1 className="text-4xl font-bold">Travel Blog</h1>
      <p className="text-slate-600">Travel tips, destination guides, and insider insights.</p>
      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id || blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
