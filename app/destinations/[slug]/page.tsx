import { notFound } from 'next/navigation';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { samplePackages } from '@/data/packages';
import { tryConnectDB } from '@/lib/db';
import Package from '@/models/Package';
import PackageCard from '@/components/PackageCard';
import { PackageType } from '@/types';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
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

  return (
    <div className="space-y-8">
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <Image src={destination.image} alt={destination.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/80 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold text-white">{destination.name}</h1>
          <p className="text-white/90">{destination.country}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
        <h2 className="text-2xl font-semibold">Travel Guide</h2>
        <p className="mt-3 text-slate-700">{destination.guide}</p>
        <p className="mt-4 text-sm">
          <span className="font-semibold text-brandNavy">Best time to visit:</span> {destination.bestTime}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Popular Attractions</h2>
        <div className="flex flex-wrap gap-2">
          {destination.attractions.map((a) => (
            <span key={a} className="rounded-full bg-brandSoftNavy px-4 py-2 text-sm text-brandNavy">
              {a}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top Packages in {destination.name}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.length > 0 ? (
            packages.map((pkg) => <PackageCard key={pkg._id || pkg.slug} item={pkg} />)
          ) : (
            <p className="text-slate-600">No packages available right now.</p>
          )}
        </div>
      </section>
    </div>
  );
}
