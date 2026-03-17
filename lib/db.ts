import mongoose from 'mongoose';

declare global {
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing in environment variables');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Keep one shared connection promise across hot reloads in dev.
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: 'divine-simparna-holidays' });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
