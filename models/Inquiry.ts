import { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.Inquiry || model('Inquiry', InquirySchema);
