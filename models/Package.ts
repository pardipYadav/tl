import { Schema, model, models } from 'mongoose';

const PackageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    country: { type: String, required: true },
    durationDays: { type: Number, required: true },
    travelType: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    priceINR: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    coverImage: { type: String, required: true },
    images: [{ type: String, required: true }],
    overview: { type: String, required: true },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String
      }
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    faq: [{ q: String, a: String }],
    coordinates: {
      lat: Number,
      lng: Number
    },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default models.Package || model('Package', PackageSchema);
