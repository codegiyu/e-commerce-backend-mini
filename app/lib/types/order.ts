import { Model, Document } from "mongoose";
import { User } from "./user";

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
}

export interface OrderDocument extends Order, Document {}

export interface OrderModel extends Model<OrderDocument> {}
