import { model, Schema } from 'mongoose';
import { CouponDocument } from '../lib/types/coupon';

const couponSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  maxUsage: { type: Number, required: true },
  usageCount: { type: Number, required: false, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Coupon = model<CouponDocument>('Coupon', couponSchema);
