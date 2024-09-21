import { Model, Document } from "mongoose";

export interface Category {
  name: string;
}

export interface CategoryDocument extends Category, Document {}

export interface CategoryModel extends Model<CategoryDocument> {}
