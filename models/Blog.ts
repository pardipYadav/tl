import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.Blog || model('Blog', BlogSchema);
