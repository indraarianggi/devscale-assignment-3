import type { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, error } = err;

  const errStatus = statusCode || 500;
  const errMessage = error.message || "Something went wrong";
  const errStack = error.stack || {};

  res.status(errStatus).json({ message: errMessage, stack: errStack });
};

export default ErrorHandler;
