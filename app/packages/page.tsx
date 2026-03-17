import PackageCard from '@/components/PackageCard';
import FilterSidebar from '@/components/FilterSidebar';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export const revalidate = 60;

export default async function PackagesPage({
  searchParams
}: {
  searchParams: Promise<{ country?: string; travelType?: string; sort?: string; page?: string; destination?: string }>;
}) {
  const params = await searchParams;
  await connectDB();

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

  const page = Number(params.page || 1);
  const pageSize = 9;

  const total = await Package.countDocuments(query);
  const items = await Package.find(query)
    .sort(sortMap[params.sort || 'featured'] || sortMap.featured)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  const totalPages = Math.ceil(total / pageSize);

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
              <PackageCard key={pkg._id.toString()} item={{ ...pkg, _id: pkg._id.toString() }} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Page {page} of {totalPages || 1}</p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages || 1 }).map((_, i) => (
                <a
                  key={i}
                  href={`/packages?page=${i + 1}`}
                  className={`rounded-lg px-3 py-1 text-sm ${page === i + 1 ? 'bg-brandBlue text-white' : 'border'}`}
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
