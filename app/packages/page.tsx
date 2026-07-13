import PackageCard from '@/components/PackageCard';
import FilterSidebar from '@/components/FilterSidebar';
import { tryConnectDB } from '@/lib/db';
import Package from '@/models/Package';
import { samplePackages } from '@/data/packages';
import { PackageType } from '@/types';

export const revalidate = 60;

export default async function PackagesPage({
  searchParams
}: {
  searchParams: Promise<{ country?: string; travelType?: string; sort?: string; page?: string; destination?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const pageSize = 9;

  const conn = await tryConnectDB();

  let items: PackageType[] = [];
  let total = 0;

  if (conn) {
    const query: Record<string, unknown> = {};
    if (params.country) query.country = params.country;
    if (params.travelType) query.travelType = params.travelType;
    if (params.destination) query.destination = { $regex: params.destination, $options: 'i' };

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      featured: { featured: -1, createdAt: -1 },
      priceLowHigh: { priceINR: 1 },
      priceHighLow: { priceINR: -1 },
      rating: { rating: -1 }
    };

    total = await Package.countDocuments(query);
    const dbItems = await Package.find(query)
      .sort(sortMap[params.sort || 'featured'] || sortMap.featured)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    items = dbItems.map((pkg) => {
      const row = pkg as unknown as PackageType & { _id: { toString(): string } };
      return { ...row, _id: row._id.toString() };
    });
  } else {
    let filtered = [...samplePackages];
    if (params.country) filtered = filtered.filter((p) => p.country === params.country);
    if (params.travelType) filtered = filtered.filter((p) => p.travelType === params.travelType);
    if (params.destination) {
      const q = params.destination.toLowerCase();
      filtered = filtered.filter((p) => p.destination.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
    }
    if (params.sort === 'priceLowHigh') filtered.sort((a, b) => a.priceINR - b.priceINR);
    if (params.sort === 'priceHighLow') filtered.sort((a, b) => b.priceINR - a.priceINR);
    if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    total = filtered.length;
    items = filtered.slice((page - 1) * pageSize, page * pageSize);
  }

  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Tour Packages</h1>
        <p className="text-slate-600">Find the perfect trip with advanced filters and transparent pricing.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <FilterSidebar />
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((pkg) => (
              <PackageCard key={pkg._id || pkg.slug} item={pkg} />
            ))}
          </div>

          {items.length === 0 && <p className="text-slate-600">No packages match your filters.</p>}

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <a
                  key={i}
                  href={`/packages?page=${i + 1}`}
                  className={`rounded-lg px-3 py-1 text-sm ${page === i + 1 ? 'bg-brandNavy text-white' : 'border border-[#e8e0d0]'}`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
