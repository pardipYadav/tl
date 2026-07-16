'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { GoogleReview, GoogleReviewsResponse } from '@/types';

function GoogleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarRating({ rating, showValue = false, size = 'sm' }: { rating: number; showValue?: boolean; size?: 'sm' | 'md' }) {
  const starClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-brandGold" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${starClass} ${i < Math.round(rating) ? 'fill-current' : 'fill-none opacity-30'}`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`font-semibold text-brandNavy ${size === 'md' ? 'text-base' : 'text-sm'}`}>
          {Number.isInteger(rating) ? rating : rating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initials = review.authorName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#e8e0d0] bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        {review.authorPhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhotoUrl}
            alt={`${review.authorName} profile photo`}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#e8e0d0]"
            width={44}
            height={44}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brandSoft text-sm font-bold text-brandNavy ring-2 ring-[#e8e0d0]">
            {initials || 'G'}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-brandNavy">{review.authorName}</p>
          <p className="text-xs text-slate-500">{review.relativeTime}</p>
        </div>
      </div>

      <StarRating rating={review.rating} showValue />

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
        {review.text ? (
          <>
            &ldquo;{review.text}&rdquo;
          </>
        ) : (
          <span className="italic text-slate-500">No written review provided.</span>
        )}
      </p>

      <div className="mt-4 flex items-center gap-2 border-t border-[#f0ebe3] pt-3">
        <GoogleIcon />
        <span className="text-xs font-medium text-slate-600">Verified Google Review</span>
      </div>
    </article>
  );
}

function ReviewCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#e8e0d0] bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="h-2.5 w-16 rounded bg-slate-100" />
        </div>
      </div>
      <div className="mb-3 h-4 w-24 rounded bg-slate-200" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
        <div className="h-3 w-4/6 rounded bg-slate-100" />
      </div>
    </div>
  );
}

function getVisibleCount(width: number) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

export default function ReviewSlider() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [meta, setMeta] = useState<Pick<GoogleReviewsResponse, 'rating' | 'totalReviews' | 'mapsUrl'> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/google-reviews');
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'Failed to load Google reviews.');
        }

        if (!cancelled) {
          const data = payload.data as GoogleReviewsResponse;
          setReviews(data.reviews ?? []);
          setMeta({
            rating: data.rating,
            totalReviews: data.totalReviews,
            mapsUrl: data.mapsUrl
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load Google reviews.');
          setReviews([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReviews();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const updateVisible = () => setVisible(getVisibleCount(window.innerWidth));
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visible);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (loading || error || reviews.length <= visible || paused) return;

    const timer = window.setInterval(goNext, 5000);
    return () => window.clearInterval(timer);
  }, [loading, error, reviews.length, visible, paused, goNext]);

  if (loading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
        {Array.from({ length: 3 }).map((_, i) => (
          <ReviewCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e8e0d0] bg-white p-8 text-center shadow-card">
        <p className="text-sm font-semibold text-brandNavy">Google reviews are temporarily unavailable</p>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-brandNavy px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#16396a]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-[#e8e0d0] bg-white p-8 text-center shadow-card">
        <p className="text-sm font-semibold text-brandNavy">No Google reviews yet</p>
        <p className="mt-2 text-sm text-slate-600">Check back soon for the latest traveler feedback.</p>
      </div>
    );
  }

  const slideStep = reviews.length > 0 ? 100 / reviews.length : 0;

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {(meta?.rating != null || meta?.totalReviews != null) && (
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e8e0d0] bg-white px-5 py-4 shadow-card">
          <div className="flex items-center gap-3">
            <GoogleIcon className="h-6 w-6" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brandGold">Google Rating</p>
              {meta.rating != null && (
                <p className="text-2xl font-bold text-brandNavy">
                  {meta.rating.toFixed(1)}
                  <span className="text-sm font-medium text-slate-500"> / 5</span>
                </p>
              )}
            </div>
          </div>

          {meta.rating != null && <StarRating rating={meta.rating} size="md" showValue />}

          {meta.totalReviews != null && (
            <p className="text-sm text-slate-600">
              Based on <span className="font-semibold text-brandNavy">{meta.totalReviews.toLocaleString()}</span> reviews
            </p>
          )}

          {meta.mapsUrl && (
            <a
              href={meta.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-sm font-semibold text-brandGold hover:underline"
            >
              See all on Google
            </a>
          )}
        </div>
      )}

      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${index * slideStep}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            style={{ width: `${(reviews.length / visible) * 100}%` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="box-border min-w-0 shrink-0 px-2.5 first:pl-0 last:pr-0"
                style={{ width: `${100 / reviews.length}%` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </motion.div>
        </div>

        {reviews.length > visible && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e8e0d0] bg-white p-2 text-brandNavy shadow-card transition hover:text-brandGold md:-translate-x-1/3"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e8e0d0] bg-white p-2 text-brandNavy shadow-card transition hover:text-brandGold md:translate-x-1/3"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {reviews.length > visible && (
        <div className="flex justify-center gap-2" role="tablist" aria-label="Review slides">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to reviews group ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-brandGold' : 'w-2.5 bg-[#d9d0c0] hover:bg-brandGold/60'
              }`}
            />
          ))}
        </div>
      )}

          <p className="text-center text-xs text-slate-500">
            Reviews from our Google Business Profile · Newest first
          </p>
    </div>
  );
}
