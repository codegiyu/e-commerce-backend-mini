import { Request, Response } from "express";

export type RouteController = (req: Request, res: Response) => void;