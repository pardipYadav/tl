import { googleReviewsData } from '@/data/google-reviews';
import type { GoogleReviewsResponse } from '@/types';

/**
 * Serves Google Business Profile reviews without Google Places API billing.
 * Source of truth: `data/google-reviews.ts` (paste reviews from your GBP dashboard).
 * Optional: GOOGLE_PLACE_ID builds the "See all on Google" link.
 */
export async function fetchGoogleBusinessReviews(): Promise<GoogleReviewsResponse> {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  const mapsUrl = placeId
    ? `https://search.google.com/local/reviews?placeid=${placeId}`
    : googleReviewsData.mapsUrl;

  const reviews = [...googleReviewsData.reviews].sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bTime - aTime;
  });

  return {
    ...googleReviewsData,
    mapsUrl,
    reviews,
    sort: 'newest'
  };
}
