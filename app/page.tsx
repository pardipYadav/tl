import HeroSection from '@/components/HeroSection';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import ReviewSlider from '@/components/ReviewSlider';
import BlogCard from '@/components/BlogCard';
import AITripPlanner from '@/components/AITripPlanner';
import NewsletterForm from '@/components/NewsletterForm';
import { samplePackages } from '@/data/packages';
import { destinations } from '@/data/destinations';
import { sampleBlogs } from '@/data/blogs';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-8">
      <HeroSection />

      <section>
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brandGold">Curated Collection</p>
            <h2 className="mt-2 text-4xl font-bold">Featured Tour Packages</h2>
          </div>
          <Link href="/packages" className="text-sm font-semibold text-brandNavy hover:text-brandGold">View all packages</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {samplePackages.map((pkg) => (
            <PackageCard key={pkg.slug} item={pkg} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-4xl font-bold">Popular Destinations</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0, 4).map((d) => (
            <DestinationCard key={d.slug} name={d.name} slug={d.slug} image={d.image} country={d.country} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-4xl font-bold">Top International Destinations</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations
            .filter((d) => !['India'].includes(d.country))
            .slice(0, 3)
            .map((d) => (
              <DestinationCard key={d.slug} name={d.name} slug={d.slug} image={d.image} country={d.country} />
            ))}
        </div>
      </section>

      <section className="section-shell">
        <h2 className="text-4xl font-bold">Why Choose Us</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-[#e8e0d0] bg-brandSoft p-4 font-semibold text-brandNavy">Curated itineraries</div>
          <div className="rounded-2xl border border-[#e8e0d0] bg-brandSoft p-4 font-semibold text-brandNavy">Transparent pricing</div>
          <div className="rounded-2xl border border-[#e8e0d0] bg-brandSoft p-4 font-semibold text-brandNavy">24x7 travel support</div>
          <div className="rounded-2xl border border-[#e8e0d0] bg-brandSoft p-4 font-semibold text-brandNavy">Visa and payment assistance</div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-4xl font-bold">Testimonials & Google Reviews</h2>
        <p className="mb-6 text-sm text-slate-600">
          Traveler favorites — curated reviews from Divine Simparna journeys.
        </p>
        <ReviewSlider />
      </section>

      <section>
        <h2 className="mb-6 text-4xl font-bold">Travel Blogs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {sampleBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>

      {/* Temporarily unavailable — blurred / non-interactive */}
      <section className="relative">
        <div className="pointer-events-none select-none blur-[2px] opacity-50 grayscale-[30%]" aria-hidden>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-[#0B2548] via-[#16396a] to-[#C4A053] p-8 text-white shadow-card">
              <h3 className="text-2xl font-bold text-white">Special Offers</h3>
              <p className="mt-3 text-white/90">Flat 15% off on international packages. Use code: DIVINE15</p>
              <span className="mt-6 inline-block rounded-xl bg-white px-4 py-2 font-semibold text-[#0B2548]">
                Explore Deals
              </span>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-[#0B2548]/25 backdrop-blur-[1px]">
          <div className="mx-4 rounded-2xl border border-[#C4A053]/50 bg-[#0B2548]/95 px-8 py-5 text-center shadow-lg">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4A053]">Coming Soon</p>
            <p className="mt-2 text-[15px] font-semibold text-white">
              Special Offers &amp; Newsletter
            </p>
            <p className="mt-1 text-sm text-white/75">These options are temporarily unavailable.</p>
          </div>
        </div>
      </section>

      <AITripPlanner />
    </div>
  );
}
