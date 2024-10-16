import { Model, Document } from "mongoose";

export interface Coupon {
  code: string;
  discount: number;
  isActive: boolean;
}

export interface CouponDocument extends Coupon, Document {}

export interface CouponModel extends Model<CouponDocument> {}
