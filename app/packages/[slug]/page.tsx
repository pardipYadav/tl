import { notFound } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import GallerySlider from '@/components/GallerySlider';
import MapEmbed from '@/components/MapEmbed';
import PaymentOptions from '@/components/PaymentOptions';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';
import { currency } from '@/lib/utils';

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const pkg = await Package.findOne({ slug }).lean();

  if (!pkg) return notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{pkg.title}</h1>
        <p className="mt-2 text-slate-600">{pkg.overview}</p>
      </div>

      <GallerySlider images={[pkg.coverImage, ...pkg.images]} />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
            <h2 className="text-2xl font-semibold">Day-by-day Itinerary</h2>
            <div className="mt-4 space-y-4">
              {pkg.itinerary.map((day: { day: number; title: string; description: string }) => (
                <div key={day.day} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-semibold text-brandBlue">Day {day.day}: {day.title}</p>
                  <p className="text-sm text-slate-700">{day.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
              <h3 className="text-xl font-semibold">Inclusions</h3>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {pkg.inclusions.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
              <h3 className="text-xl font-semibold">Exclusions</h3>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {pkg.exclusions.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold">Travel Map</h3>
            <div className="mt-4">
              <MapEmbed lat={pkg.coordinates.lat} lng={pkg.coordinates.lng} />
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold">FAQs</h3>
            <div className="mt-4 space-y-3">
              {pkg.faq.map((item: { q: string; a: string }) => (
                <details key={item.q} className="rounded-lg border p-3">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold">Pricing Breakdown</h3>
            <p className="mt-2 text-3xl font-bold text-brandBlue">{currency(pkg.priceINR)}</p>
            <p className="text-sm text-slate-600">Per traveler (excluding airfare)</p>
            <button className="mt-4 w-full rounded-xl bg-brandOrange py-3 font-semibold text-white">Book Now</button>
          </div>
          <PaymentOptions amount={pkg.priceINR} />
          <BookingForm packageId={pkg._id.toString()} destination={pkg.destination} />
        </aside>
      </div>
    </div>
  );
}
