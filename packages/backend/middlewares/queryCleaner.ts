import { Request, Response, NextFunction } from "express";

export const queryCleaner: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query._id = undefined;
  req.query.role = undefined;

  next();
};
