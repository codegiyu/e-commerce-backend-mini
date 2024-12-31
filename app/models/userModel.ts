import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { UserDocument } from '../lib/types/user';

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    wishLists: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
  },
  {
    timestamps: true, // Automatically create createdAt timestamp
  }
);

export const User = model<UserDocument>('User', userSchema);
