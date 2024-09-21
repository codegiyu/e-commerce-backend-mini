import  { Schema, model } from 'mongoose';
import { OrderDocument } from '../lib/types/order';



const orderSchema = new Schema<OrderDocument>({
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
});

export const Order = model<OrderDocument>('Order', orderSchema);
