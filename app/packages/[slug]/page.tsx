import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import GallerySlider from '@/components/GallerySlider';
import MapEmbed from '@/components/MapEmbed';
import PaymentOptions from '@/components/PaymentOptions';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { tryConnectDB } from '@/lib/db';
import Package from '@/models/Package';
import { samplePackages } from '@/data/packages';
import { currency } from '@/lib/utils';
import { PackageType } from '@/types';
import { buildMetadata, faqSchema, tourPackageSchema } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

async function getPackage(slug: string): Promise<PackageType | null> {
  const conn = await tryConnectDB();
  if (conn) {
    const dbPkg = await Package.findOne({ slug }).lean();
    if (dbPkg) {
      const row = dbPkg as unknown as PackageType & { _id: { toString(): string } };
      return { ...row, _id: row._id.toString() };
    }
  }

  return samplePackages.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return buildMetadata({
      title: 'Package Not Found',
      description: 'The requested tour package could not be found.',
      path: `/packages/${slug}`,
      noIndex: true
    });
  }

  return buildMetadata({
    title: pkg.title,
    description: `${pkg.overview.slice(0, 155)}… Book this ${pkg.durationDays}-day ${pkg.destination} package from ₹${pkg.priceINR.toLocaleString('en-IN')}.`,
    path: `/packages/${pkg.slug}`,
    image: pkg.coverImage,
    keywords: [
      pkg.title,
      `${pkg.destination} tour package`,
      `${pkg.destination} holiday package`,
      `${pkg.travelType} travel`,
      `${pkg.durationDays} days tour`,
      'Divine Simparna Holidays'
    ]
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) return notFound();

  const packageId = pkg._id || pkg.slug;

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          tourPackageSchema({
            title: pkg.title,
            description: pkg.overview,
            slug: pkg.slug,
            image: pkg.coverImage,
            destination: pkg.destination,
            priceINR: pkg.priceINR,
            rating: pkg.rating,
            reviewsCount: pkg.reviewsCount,
            durationDays: pkg.durationDays,
            faq: pkg.faq
          }),
          faqSchema(pkg.faq)
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Packages', path: '/packages' },
          { name: pkg.title, path: `/packages/${pkg.slug}` }
        ]}
      />

      <header>
        <h1 className="text-4xl font-bold">{pkg.title}</h1>
        <p className="mt-2 text-slate-600">{pkg.overview}</p>
        <p className="mt-2 text-sm text-slate-500">
          {pkg.destination} · {pkg.durationDays} days · {pkg.travelType}
        </p>
      </header>

      <GallerySlider images={[pkg.coverImage, ...pkg.images]} />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
            <h2 className="text-2xl font-semibold">Day-by-day Itinerary</h2>
            <div className="mt-4 space-y-4">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="rounded-xl bg-brandSoftNavy/50 p-4">
                  <h3 className="font-semibold text-brandNavy">
                    Day {day.day}: {day.title}
                  </h3>
                  <p className="text-sm text-slate-700">{day.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold">Inclusions</h2>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {pkg.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold">Exclusions</h2>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {pkg.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold">Travel Map</h2>
            <div className="mt-4">
              <MapEmbed lat={pkg.coordinates.lat} lng={pkg.coordinates.lng} />
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3">
              {pkg.faq.map((item) => (
                <details key={item.q} className="rounded-lg border border-[#e8e0d0] p-3">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-slate-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold">Pricing Breakdown</h2>
            <p className="mt-2 text-3xl font-bold text-brandNavy">{currency(pkg.priceINR)}</p>
            <p className="text-sm text-slate-600">Per traveler (excluding airfare)</p>

            <a
              href="tel:+918284879420"
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-brandGold py-3 font-semibold text-brandNavy transition hover:brightness-95"
            >
              Contact for More Information
            </a>
          </div>

          <PaymentOptions amount={pkg.priceINR} />
          <BookingForm packageId={packageId} destination={pkg.destination} />
        </aside>
      </div>
    </div>
  );
}
