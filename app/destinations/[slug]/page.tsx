import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '@/data/destinations';
import { samplePackages } from '@/data/packages';
import { tryConnectDB } from '@/lib/db';
import Package from '@/models/Package';
import PackageCard from '@/components/PackageCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { PackageType } from '@/types';
import { buildMetadata, destinationSchema } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return buildMetadata({
      title: 'Destination Not Found',
      description: 'The requested travel destination could not be found.',
      path: `/destinations/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: `${destination.name} Tour Packages & Travel Guide`,
    description: `Plan your ${destination.name} trip with Divine Simparna Holidays. ${destination.guide} Best time to visit: ${destination.bestTime}.`,
    path: `/destinations/${destination.slug}`,
    image: destination.image,
    keywords: [
      `${destination.name} tour package`,
      `${destination.name} holiday`,
      `${destination.name} travel guide`,
      `best time to visit ${destination.name}`,
      `${destination.country} tourism`,
      'Divine Simparna Holidays'
    ]
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) return notFound();

  let packages: PackageType[] = [];

  const conn = await tryConnectDB();
  if (conn) {
    const dbPackages = await Package.find({ destination: new RegExp(destination.name, 'i') }).lean();
    packages = dbPackages.map((pkg) => {
      const row = pkg as unknown as PackageType & { _id: { toString(): string } };
      return { ...row, _id: row._id.toString() };
    });
  } else {
    packages = samplePackages.filter(
      (pkg) =>
        pkg.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
        destination.name.toLowerCase().includes(pkg.destination.toLowerCase())
    );
  }

  const otherDestinations = destinations.filter((d) => d.slug !== slug).slice(0, 4);

  return (
    <div className="space-y-8">
      <JsonLd
        data={destinationSchema({
          name: destination.name,
          slug: destination.slug,
          country: destination.country,
          description: destination.guide,
          image: destination.image
        })}
      />
      <Breadcrumbs
        items={[
          { name: 'Destinations', path: '/destinations' },
          { name: destination.name, path: `/destinations/${destination.slug}` }
        ]}
      />

      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.country} — travel destination`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/80 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold text-white">{destination.name} Travel Guide</h1>
          <p className="text-white/90">{destination.country}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
        <h2 className="text-2xl font-semibold">About {destination.name}</h2>
        <p className="mt-3 text-slate-700">{destination.guide}</p>
        <p className="mt-4 text-sm">
          <span className="font-semibold text-brandNavy">Best time to visit:</span> {destination.bestTime}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Popular Attractions in {destination.name}</h2>
        <div className="flex flex-wrap gap-2">
          {destination.attractions.map((a) => (
            <span key={a} className="rounded-full bg-brandSoftNavy px-4 py-2 text-sm text-brandNavy">
              {a}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top {destination.name} Tour Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.length > 0 ? (
            packages.map((pkg) => <PackageCard key={pkg._id || pkg.slug} item={pkg} />)
          ) : (
            <p className="text-slate-600">
              No packages listed yet.{' '}
              <Link href="/booking" className="font-semibold text-brandGold hover:underline">
                Request a custom {destination.name} itinerary
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">More Destinations</h2>
        <div className="flex flex-wrap gap-3">
          {otherDestinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="rounded-full border border-[#e8e0d0] bg-white px-4 py-2 text-sm font-medium text-brandNavy transition hover:border-brandGold hover:text-brandGold"
            >
              {d.name}
            </Link>
          ))}
          <Link
            href="/destinations"
            className="rounded-full bg-brandNavy px-4 py-2 text-sm font-medium text-white transition hover:bg-[#16396a]"
          >
            View all destinations
          </Link>
        </div>
      </section>
    </div>
  );
}
