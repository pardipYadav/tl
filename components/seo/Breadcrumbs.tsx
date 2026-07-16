import Link from 'next/link';
import type { Route } from 'next';
import { ChevronRight } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;

  const withHome =
    items[0]?.path === '/'
      ? items
      : [{ name: 'Home', path: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(withHome)} />
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          {withHome.map((item, index) => {
            const isLast = index === withHome.length - 1;

            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden />}
                {isLast ? (
                  <span className="font-medium text-brandNavy" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path as Route}
                    className="transition hover:text-brandGold"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
