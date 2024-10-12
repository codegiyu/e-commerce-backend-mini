import { Schema, model } from "mongoose";
import { ProductDocument } from "../lib/types/product";

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: [{ type: Number, required: true }],
    countInStock: { type: Number, required: true },
    category: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    rating: [{ type: Number }],
    img: [
      {
        color: { type: String, required: true },
        url: [{ type: String, required: true }],
      },
    ],
    size: [{ type: String }],
    tag: {
      type: String,
      required: true,
      enum: ["New", "Old"],
      default: "Old",
    },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = model<ProductDocument>("Product", productSchema);
