import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.Review || model('Review', ReviewSchema);
