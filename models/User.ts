import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Package' }]
  },
  { timestamps: true }
);

export default models.User || model('User', UserSchema);
