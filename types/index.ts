export type TravelType = 'Family' | 'Adventure' | 'Honeymoon' | 'Luxury' | 'Backpacking';

export interface PackageType {
  _id?: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  durationDays: number;
  travelType: TravelType;
  rating: number;
  reviewsCount: number;
  priceINR: number;
  discountPercent?: number;
  coverImage: string;
  images: string[];
  overview: string;
  itinerary: Array<{ day: number; title: string; description: string }>;
  inclusions: string[];
  exclusions: string[];
  faq: Array<{ q: string; a: string }>;
  coordinates: { lat: number; lng: number };
  featured?: boolean;
}

export interface BlogType {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: string;
  publishedAt: string;
}
