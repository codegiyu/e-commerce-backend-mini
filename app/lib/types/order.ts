import { Model, Document } from "mongoose";
import { User } from "./user";

export interface Coupons {
  name: string;
  discount: number;
  isActive: boolean;
}

export interface Order {
  user: User;
  orderItems: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  subTotal: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paymentMethod: string;
  coupon: Coupons;
}

export interface OrderDocument extends Order, Coupons, Document {}

export interface OrderModel extends Model<OrderDocument> {}
