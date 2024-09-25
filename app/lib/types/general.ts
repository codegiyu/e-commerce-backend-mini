import { Request, Response, NextFunction } from "express";



export type RouteController = (
  req: Request, 
  res: Response,
  next: NextFunction
) => void;
