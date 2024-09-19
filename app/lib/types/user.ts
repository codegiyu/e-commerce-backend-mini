import { Model, Document } from "mongoose";

export interface User {
  // _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  isAdmin?: boolean;
}

export interface UserDocument extends User, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}
