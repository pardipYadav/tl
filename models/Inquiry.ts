import { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    destination: { type: String, required: true },
    numberOfDays: { type: Number, required: true, min: 1, max: 365 },
    // Legacy fields kept optional for older records
    name: { type: String },
    message: { type: String },
    source: { type: String, default: 'contact' },
    emailSent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default models.Inquiry || model('Inquiry', InquirySchema);
