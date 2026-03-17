import { Schema, model, models } from 'mongoose';

const NewsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    source: { type: String, default: 'homepage' }
  },
  { timestamps: true }
);

export default models.Newsletter || model('Newsletter', NewsletterSchema);

