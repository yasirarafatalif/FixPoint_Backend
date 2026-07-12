import { NextFunction, Request, RequestHandler, Response } from "express";
import StatusCodes from "http-status-codes"

export const cathasycn = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        fn(req,res,next)
    } catch (error) {
      console.log(error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  };
};


