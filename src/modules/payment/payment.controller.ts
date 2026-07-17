import { sendResponse } from "./../../utils/senRespone";
import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/cathasycn";
import { paymentService } from "./payment.service";
import { StatusCodes } from "http-status-codes";

const createPayment = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId= req.user?.id;
    const data = await paymentService.initPayment(req.body,userId as string);
    sendResponse(res, {
      message: "Payment Success",
      success: true,
      statusCode: StatusCodes.OK,
      data,
    });
  },
);
const successPayment = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { val_id, tran_id } = req.body;
    const data = await paymentService.successPayment(req.body)
    sendResponse(res, {
      message: "Payment session created successfully",
      success: true,
      statusCode: StatusCodes.OK,
      data
    });
  },
);

export const paymentController = {
  createPayment,
  successPayment,
};
