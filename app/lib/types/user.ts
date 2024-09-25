import { Model, Document } from "mongoose";
import { Product } from "./product";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  wishlist: Array<
  {
    product:Product
  }>;
}

export interface UserDocument extends User, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}
