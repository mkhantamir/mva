import { Request, Response, NextFunction } from "express";
import { customError, message } from "../utils";

export const authorize = (...roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(
      "authorize",
      req.query.role,
      roles,
      roles.includes(req.query.role)
    );
    if (!roles.includes(req.query.role)) {
      throw new customError(message.permission, 401);
    }
    next();
  };
};
