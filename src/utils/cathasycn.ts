import { NextFunction, Request, RequestHandler, Response } from "express";
import StatusCodes from "http-status-codes"

export const cathasync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req,res,next)
    } catch (error) {
      console.log(error);

      
      // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      //   success: false,
      //   statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      //   message: "Internal Server Error",
      //   error: (error as Error).message,
      // });
      next(error);
    }
  };
};


