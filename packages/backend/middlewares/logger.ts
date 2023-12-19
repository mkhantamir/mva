import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";

export const logger: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const time = moment.tz("Asia/Ulaanbaatar");
  console.log(`${req.method.toUpperCase()} - ${req.originalUrl} - ${time}`);

  next();
};
