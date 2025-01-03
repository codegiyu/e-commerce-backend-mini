import { Model, Document } from 'mongoose';

export interface Coupon {
  code: string;
  discount: number;
  maxUsage: number;
  usageCount: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

export interface CouponDocument extends Coupon, Document {}

export interface CouponModel extends Model<CouponDocument> {}
