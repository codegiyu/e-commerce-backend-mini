import { model, Schema } from "mongoose";
import { CouponDocument } from "../lib/types/coupon";

const couponSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: false },
  maxUsage: { type: Number, required: true },
  usageCount: { type: Number, required: false, default: 0 },
});

export const Coupon = model<CouponDocument>("Coupon", couponSchema);
