import { notFound } from 'next/navigation';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';
import PackageCard from '@/components/PackageCard';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) return notFound();

  await connectDB();
  const packages = await Package.find({ destination: new RegExp(destination.name, 'i') }).lean();

  return (
    <div className="space-y-8">
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image src={destination.image} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold">{destination.name}</h1>
          <p className="text-white/90">{destination.country}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
        <h2 className="text-2xl font-semibold">Travel Guide</h2>
        <p className="mt-3 text-slate-700">{destination.guide}</p>
        <p className="mt-4 text-sm"><span className="font-semibold text-brandBlue">Best time to visit:</span> {destination.bestTime}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Popular Attractions</h2>
        <div className="flex flex-wrap gap-2">
          {destination.attractions.map((a) => (
            <span key={a} className="rounded-full bg-blue-50 px-4 py-2 text-sm text-brandBlue">{a}</span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top Packages in {destination.name}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.length > 0 ? packages.map((pkg) => <PackageCard key={pkg._id.toString()} item={{ ...pkg, _id: pkg._id.toString() }} />) : <p>No packages available right now.</p>}
        </div>
      </section>
    </div>
  );
}
