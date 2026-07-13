import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Star } from 'lucide-react';
import { PackageType } from '@/types';
import { currency } from '@/lib/utils';

export default function PackageCard({ item }: { item: PackageType }) {
  const finalPrice = item.discountPercent ? Math.round(item.priceINR * (1 - item.discountPercent / 100)) : item.priceINR;

  return (
    <Link
      href={`/packages/${item.slug}`}
      className="group overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white shadow-card transition hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <Image src={item.coverImage} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        {item.discountPercent ? (
          <span className="absolute left-3 top-3 rounded-full bg-brandGold px-3 py-1 text-xs font-bold text-brandNavy">
            {item.discountPercent}% OFF
          </span>
        ) : null}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brandSoftNavy px-3 py-1 text-xs font-semibold text-brandNavy">{item.destination}</span>
          <span className="flex items-center gap-1 text-sm font-medium text-brandGold">
            <Star className="h-4 w-4 fill-current" /> {item.rating}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold text-brandNavy">{item.title}</h3>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Clock3 className="h-4 w-4" /> {item.durationDays} Days
          </span>
          <span>{item.travelType}</span>
        </div>

        <div className="flex items-end justify-between">
          <p>
            <span className="text-xl font-bold text-brandNavy">{currency(finalPrice)}</span>
            <span className="text-xs text-slate-500"> / person</span>
          </p>
          <span className="text-sm font-semibold text-brandGold">Book Now</span>
        </div>
      </div>
    </Link>
  );
}
