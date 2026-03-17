import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/api/auth/signin');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">My Wishlist</h1>
      <p className="text-slate-600">Saved packages will appear here once you integrate favorite toggles from package cards.</p>
    </div>
  );
}
