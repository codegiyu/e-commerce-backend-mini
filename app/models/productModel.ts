import { Schema, model } from "mongoose";
import { ProductDocument } from "../lib/types/product";

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  rating: { type: Number, required: true },
});

export const Product = model<ProductDocument>("Product", productSchema);
