import type { GoogleReview, GoogleReviewsResponse } from '@/types';

/**
 * Paste real reviews from your Google Business Profile here.
 * Open Google Business Profile → Reviews → copy name, stars, text, and date.
 * No Google Cloud billing required.
 *
 * Tip: keep newest reviews first.
 */
export const googleReviewsData: GoogleReviewsResponse = {
  sort: 'newest',
  rating: 5,
  totalReviews: 3,
  mapsUrl: 'https://www.google.com/maps',
  reviews: [
    {
      id: 'megha-t-bali',
      authorName: 'Megha T.',
      authorPhotoUrl: null,
      authorUrl: null,
      rating: 5,
      text: 'Flawless service and perfectly planned Bali honeymoon. Every detail felt premium.',
      relativeTime: '2 months ago',
      publishedAt: '2026-05-10T00:00:00.000Z'
    },
    {
      id: 'arjun-p-dubai',
      authorName: 'Arjun P.',
      authorPhotoUrl: null,
      authorUrl: null,
      rating: 5,
      text: 'Our Dubai tour was smooth from visa to airport drop. Highly reliable team.',
      relativeTime: '3 months ago',
      publishedAt: '2026-04-02T00:00:00.000Z'
    },
    {
      id: 'ritika-family',
      authorName: 'Ritika & Family',
      authorPhotoUrl: null,
      authorUrl: null,
      rating: 5,
      text: 'Excellent family-friendly itinerary and fast support throughout the trip.',
      relativeTime: '4 months ago',
      publishedAt: '2026-03-15T00:00:00.000Z'
    }
  ] satisfies GoogleReview[]
};
