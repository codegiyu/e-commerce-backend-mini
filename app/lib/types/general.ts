import { Request, Response, NextFunction } from "express";
import { User } from "./user";

interface extra {
  user: { _id: unknown } & Omit<User, "password" | "address">;
}
export type RouteController = (
  req: Request & extra,
  res: Response,
  next: NextFunction
) => void;
