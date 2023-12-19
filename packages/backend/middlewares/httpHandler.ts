import { NextFunction, Request, Response } from "express";

export type ErrorType = {
  statusCode: number;
};

export const httpHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  const error: any = { ...err };

  // if (error.code === 11000 && error.message.includes("username")) {
  //   error.message = "Ийм нэртэй хүн байдаг юм байна. Өөр нэр сонгочих уу хө";
  //   error.statusCode = 400;
  // }

  // // if (error.message.includes("password") && error.message.includes("minimum")) {
  // //   error.message = "Нууц үг 8-аас дээш тэмдэгттэй байх хэрэгтэй л дээ";
  // //   error.statusCode = 400;
  // // }

  res.status(error.statusCode || 500).json({
    from: req.url,
    message: err.message,
  });
};
