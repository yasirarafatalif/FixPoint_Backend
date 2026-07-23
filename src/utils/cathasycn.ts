import { NextFunction, Request, RequestHandler, Response } from "express";
import StatusCodes from "http-status-codes"

export const cathasync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req,res,next)
    } catch (error) {
      next(error);
    }
  };
};


