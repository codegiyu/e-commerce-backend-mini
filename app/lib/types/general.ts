import { Request, Response, NextFunction } from "express";
import { User } from "./user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export type RouteController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
