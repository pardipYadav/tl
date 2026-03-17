import { loadEnvConfig } from '@next/env';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import Package from '@/models/Package';
import Blog from '@/models/Blog';
import User from '@/models/User';
import Coupon from '@/models/Coupon';
import { samplePackages } from '@/data/packages';
import { sampleBlogs } from '@/data/blogs';
import { sampleUsers } from '@/data/users';

loadEnvConfig(process.cwd());

async function seed() {
  await connectDB();

  await Promise.all([Package.deleteMany({}), Blog.deleteMany({}), User.deleteMany({}), Coupon.deleteMany({})]);

  await Package.insertMany(samplePackages);
  await Blog.insertMany(sampleBlogs);

  const hashedUsers = await Promise.all(
    sampleUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10)
    }))
  );

  await User.insertMany(hashedUsers);
  await Coupon.insertMany([
    { code: 'DIVINE15', discountPercent: 15, expiresAt: new Date('2026-12-31') },
    { code: 'SUMMER10', discountPercent: 10, expiresAt: new Date('2026-09-30') }
  ]);

  console.log('Seed completed successfully.');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
