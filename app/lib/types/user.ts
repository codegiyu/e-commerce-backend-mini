import { Model, Document, ObjectId } from "mongoose";
import { Product } from "./product";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  wishLists: Array<{
    product: Product;
  }>;
}

export interface UserDocument extends User, Document {
  _id : ObjectId;
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}
