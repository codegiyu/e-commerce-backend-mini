import { Model, Document } from "mongoose";
import { Category } from "./category";

export interface Product {
  name: string;
  description: string;
  price: Array<number>;
  countInStock: number;
  category: Array<Category>;
  rating: Array<number>;
  img: Array<{
    color: string;
    url: Array<string>;
  }>;
  size: Array<string>;
  isNew: boolean;
  discount: number;
}

export interface ProductDocument extends Product, Document {}

export interface ProductModel extends Model<ProductDocument> {}
