import type { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message } = err;
  console.log({ err });

  // statusCode only exists in customer error
  const errStatus = statusCode || 500;
  const errMessage = statusCode
    ? message
    : err?.message || "Something went wrong";
  const errStack = !statusCode ? err?.stack : {};

  res.status(errStatus).json({ message: errMessage, stack: errStack });
};

export default ErrorHandler;
