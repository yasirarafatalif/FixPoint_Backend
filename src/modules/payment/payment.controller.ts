import { sendResponse } from "./../../utils/senRespone";
import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/cathasycn";
import { paymentService } from "./payment.service";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../utils/appError";

const createPayment = cathasync(
  async (req: Request  & { user?: JwtPayload } , res: Response, next: NextFunction) => {
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
// const successPayment = cathasync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { val_id, tran_id } = req.body;
//     const data = await paymentService.successPayment(req.body)
//     sendResponse(res, {
//       message: "Payment session created successfully",
//       success: true,
//       statusCode: StatusCodes.OK,
//       data
//     });
//   },
// );

const successPayment = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentService.successPayment(req.body);

    const frontendUrl = config.ssl_store_frontend.replace(/\/+$/, "");

    return res.redirect(
      `${frontendUrl}/payment/success?bookingId=${encodeURIComponent(
        result.bookingId,
      )}`,
    );
  },
);


const getMyPayments = cathasync(async (req: Request  & { user?: JwtPayload }, res: Response, next: NextFunction)=> {
  const userId = req.user?.id;
  console.log("userId", req)
    if (!userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "User authentication required"
    );
  }

  const result = await paymentService.getMyPayments(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment history retrieved successfully",
    data: result,
  });
});


const getSinglePayment = cathasync(async (req: Request  & { user?: JwtPayload }, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id;
  console.log(id)

  const result = await paymentService.getSinglePayment(id as string, userId as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  successPayment,
  getMyPayments,
  getSinglePayment
};
