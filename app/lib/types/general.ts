import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { Product } from "./product";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
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
      };
    }
  }
}

export type RouteController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
