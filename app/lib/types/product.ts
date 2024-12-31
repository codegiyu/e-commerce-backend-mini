import { Model, Document } from "mongoose";
import { Category } from "./category";

export interface Product {
  name: string;
  description: string;
  price: number[];
  countInStock: number;
  category: Array<Category>;
  rating: Array<number>;
  img: Array<{
    color: string;
    url: Array<string>;
  }>;
  size: Array<string>;
  tag: string;
  discount: number;
}

export interface ProductDocument extends Product, Document {}

export interface ProductModel extends Model<ProductDocument> {}
