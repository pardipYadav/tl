import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist or may have moved.</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="rounded-lg bg-brandNavy px-4 py-2 font-semibold text-white">
          Go Home
        </Link>
        <Link href="/packages" className="rounded-lg border border-[#e8e0d0] px-4 py-2 font-semibold text-brandNavy">
          Tour Packages
        </Link>
        <Link href="/destinations" className="rounded-lg border border-[#e8e0d0] px-4 py-2 font-semibold text-brandNavy">
          Destinations
        </Link>
        <Link href="/booking" className="rounded-lg border border-[#e8e0d0] px-4 py-2 font-semibold text-brandNavy">
          Book a Trip
        </Link>
      </div>
    </div>
  );
}
