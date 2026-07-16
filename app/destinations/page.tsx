import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { destinations } from '@/data/destinations';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Travel Destinations',
  description:
    'Explore top travel destinations with Divine Simparna Holidays — Dubai, Bali, Thailand, Maldives, Europe, Goa, Himachal and more. Find guides, attractions, and curated tour packages.',
  path: '/destinations',
  keywords: [
    'travel destinations',
    'best holiday destinations',
    'Dubai travel',
    'Bali travel',
    'Thailand holiday',
    'Maldives vacation',
    'Europe tour',
    'Goa trip',
    'Himachal tour'
  ]
});

export default function DestinationsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Travel Destinations',
    itemListElement: destinations.map((d, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/destinations/${d.slug}`),
      name: d.name
    }))
  };

  return (
    <div className="space-y-8">
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={[{ name: 'Destinations', path: '/destinations' }]} />

      <header>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandGold">Explore the World</p>
        <h1 className="mt-2 text-4xl font-bold">Travel Destinations</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Discover handpicked destinations with destination guides, popular attractions, and ready-to-book tour
          packages from Divine Simparna Holidays.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Link
            key={destination.slug}
            href={`/destinations/${destination.slug}`}
            className="group overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-52">
              <Image
                src={destination.image}
                alt={`${destination.name} travel destination — ${destination.country}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-brandNavy group-hover:text-brandGold">{destination.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{destination.country}</p>
              <p className="mt-3 line-clamp-2 text-sm text-slate-600">{destination.guide}</p>
              <p className="mt-4 text-sm font-semibold text-brandGold">Explore packages →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
