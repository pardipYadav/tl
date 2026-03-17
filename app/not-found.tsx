import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 inline-block rounded-lg bg-brandBlue px-4 py-2 text-white">Go Home</Link>
    </div>
  );
}
