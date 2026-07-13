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
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'divine-simparna-holidays',
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 10000
      })
      .catch((err) => {
        // Allow retries after a failed attempt (e.g. Atlas IP whitelist).
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/** Soft connect — returns null instead of throwing when Atlas is unreachable. */
export async function tryConnectDB() {
  try {
    return await connectDB();
  } catch (err) {
    console.error('MongoDB unavailable:', err instanceof Error ? err.message : err);
    return null;
  }
}
