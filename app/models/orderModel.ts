import { Schema, model } from "mongoose";
import { OrderDocument } from "../lib/types/order";

const couponSchema = new Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: false },
});

const orderSchema = new Schema<OrderDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  subTotal: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash on delivery", "Bank"],
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  coupon: couponSchema,
});

export const Order = model<OrderDocument>("Order", orderSchema);
