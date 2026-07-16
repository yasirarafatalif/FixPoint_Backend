import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;