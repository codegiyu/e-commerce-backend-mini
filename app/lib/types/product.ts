import { Model, Document } from "mongoose";
import { Category } from "./category";

export interface Product {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  category: Category;
  rating: number;
}

export interface ProductDocument extends Product, Document {}

export interface ProductModel extends Model<ProductDocument> {}
