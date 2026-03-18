'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Megha T.', review: 'Flawless service and perfectly planned Bali honeymoon. Every detail felt premium.', rating: 5 },
  { name: 'Arjun P.', review: 'Our Dubai tour was smooth from visa to airport drop. Highly reliable team.', rating: 5 },
  { name: 'Ritika & Family', review: 'Excellent family-friendly itinerary and fast support throughout the trip.', rating: 4 }
];

export default function ReviewSlider() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {reviews.map((review, idx) => (
        <motion.div
          key={review.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15 }}
          className="rounded-2xl border border-blue-100 bg-white p-5 shadow-card"
        >
          <div className="mb-2 flex text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          {/* FIXED: Changed " to &quot; below */}
          <p className="text-sm text-slate-700">&quot;{review.review}&quot;</p>
          <p className="mt-4 text-sm font-semibold text-brandBlue">{review.name}</p>
        </motion.div>
      ))}
    </div>
  );
}