import { model, Schema } from "mongoose";
import { CouponDocument } from "../lib/types/coupon";

const couponSchema = new Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: false },
});

export const Coupon = model<CouponDocument>("Coupon", couponSchema);
