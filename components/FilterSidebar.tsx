'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();
  const params = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/packages?${next.toString()}`);
  };

  return (
    <aside className="space-y-5 rounded-2xl border border-blue-100 bg-white p-5 shadow-card">
      <h3 className="text-lg font-semibold">Filters</h3>

      <div>
        <label className="mb-1 block text-sm">Country</label>
        <select onChange={(e) => updateFilter('country', e.target.value)} className="w-full rounded-lg border p-2 text-sm">
          <option value="">All</option>
          <option>India</option>
          <option>UAE</option>
          <option>Indonesia</option>
          <option>Thailand</option>
          <option>Maldives</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm">Travel Type</label>
        <select onChange={(e) => updateFilter('travelType', e.target.value)} className="w-full rounded-lg border p-2 text-sm">
          <option value="">All</option>
          <option>Family</option>
          <option>Adventure</option>
          <option>Honeymoon</option>
          <option>Luxury</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm">Sort</label>
        <select onChange={(e) => updateFilter('sort', e.target.value)} className="w-full rounded-lg border p-2 text-sm">
          <option value="featured">Featured</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </aside>
  );
}
