import Image from 'next/image';
import Link from 'next/link';
import { BlogType } from '@/types';

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative h-52">
        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs font-medium text-brandOrange">{new Date(blog.publishedAt).toLocaleDateString()}</p>
        <h3 className="line-clamp-2 text-lg font-semibold">{blog.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-600">{blog.excerpt}</p>
      </div>
    </Link>
  );
}
