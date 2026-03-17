import { Schema, model, models } from 'mongoose';

const BookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    package: { type: Schema.Types.ObjectId, ref: 'Package' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    destination: { type: String, required: true },
    travelers: { type: Number, required: true },
    travelDate: { type: Date, required: true },
    dateFlexibility: { type: String, enum: ['fixed', 'flexible'], required: true },
    budgetRange: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid'
    },
    paymentProvider: { type: String, enum: ['stripe', 'razorpay'] },
    paymentRef: { type: String }
  },
  { timestamps: true }
);

export default models.Booking || model('Booking', BookingSchema);
