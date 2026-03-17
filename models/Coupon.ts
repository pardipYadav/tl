import { Schema, model, models } from 'mongoose';

const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true, min: 1, max: 80 },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default models.Coupon || model('Coupon', CouponSchema);
