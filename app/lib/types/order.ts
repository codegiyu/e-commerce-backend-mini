import { Model, Document } from "mongoose";

export interface Order{
  orderItems: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  totalPrice: number;
  isPaid: boolean;
}

export interface OrderDocument extends Order, Document {}


export interface OrderModel extends Model<OrderDocument> {}