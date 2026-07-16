import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tryConnectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import BlogCard from '@/components/BlogCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { sampleBlogs } from '@/data/blogs';
import { BlogType } from '@/types';
import { absoluteUrl, articleSchema, buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

async function getBlog(slug: string): Promise<{ blog: BlogType; related: BlogType[] } | null> {
  const conn = await tryConnectDB();

  if (conn) {
    const dbBlog = await Blog.findOne({ slug }).lean();
    if (dbBlog) {
      const row = dbBlog as unknown as BlogType & { _id: { toString(): string }; createdAt: Date };
      const blog: BlogType = {
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
      const related = dbRelated.map((item) => {
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
      return { blog, related };
    }
  }

  const sample = sampleBlogs.find((b) => b.slug === slug);
  if (!sample) return null;

  return {
    blog: sample,
    related: sampleBlogs.filter((b) => b.slug !== slug).slice(0, 2)
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlog(slug);

  if (!result) {
    return buildMetadata({
      title: 'Article Not Found',
      description: 'The requested travel blog post could not be found.',
      path: `/blog/${slug}`,
      noIndex: true
    });
  }

  const { blog } = result;
  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.coverImage,
    type: 'article',
    publishedTime: blog.publishedAt,
    authors: [blog.author],
    keywords: [...blog.tags, 'travel blog', 'Divine Simparna Holidays', 'holiday tips']
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getBlog(slug);

  if (!result) return notFound();

  const { blog, related } = result;
  const shareUrl = absoluteUrl(`/blog/${blog.slug}`);
  const shareText = encodeURIComponent(blog.title);

  return (
    <article className="space-y-8">
      <JsonLd
        data={articleSchema({
          title: blog.title,
          description: blog.excerpt,
          slug: blog.slug,
          image: blog.coverImage,
          author: blog.author,
          publishedAt: blog.publishedAt,
          tags: blog.tags
        })}
      />

      <Breadcrumbs
        items={[
          { name: 'Blog', path: '/blog' },
          { name: blog.title, path: `/blog/${blog.slug}` }
        ]}
      />

      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/50 to-transparent" />
      </div>

      <header>
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          By {blog.author} •{' '}
          <time dateTime={blog.publishedAt}>{new Date(blog.publishedAt).toLocaleDateString('en-IN')}</time>
        </p>
        {blog.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brandSoftNavy px-3 py-1 text-xs font-medium text-brandNavy">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose mt-4 max-w-none text-slate-700">{blog.content}</div>

      <div className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
        <p className="font-semibold text-brandNavy">Share this post</p>
        <p className="mt-2 text-sm text-slate-600">Share with friends planning their next journey.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brandNavy px-4 py-2 text-sm font-semibold text-white"
          >
            X / Twitter
          </a>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Related Travel Guides</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <BlogCard key={item._id || item.slug} blog={item} />
          ))}
        </div>
        <p className="mt-4">
          <Link href="/blog" className="text-sm font-semibold text-brandGold hover:underline">
            ← Back to all travel blogs
          </Link>
        </p>
      </section>
    </article>
  );
}
