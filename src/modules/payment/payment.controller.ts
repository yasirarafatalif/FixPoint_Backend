
import { sendResponse } from "./../../utils/senRespone";
import { NextFunction, Request, Response } from "express";
import { cathasync } from "../../utils/cathasycn";
import { paymentService } from "./payment.service";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../utils/appError";

type AuthRequest = Request & {
  user?: JwtPayload;
};

const getFrontendUrl = () => {
  const frontendUrl = config.ssl_store_frontend?.replace(/\/+$/, "");

  if (!frontendUrl) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Frontend URL is not configured",
    );
  }

  return frontendUrl;
};

// Create Payment
const createPayment = cathasync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "User authentication required",
      );
    }

    const data = await paymentService.initPayment(
      req.body,
      userId as string,
    );

    sendResponse(res, {
      message: "Payment session created successfully",
      success: true,
      statusCode: StatusCodes.OK,
      data,
    });
  },
);

// Payment Success
const successPayment = cathasync(
  async (req: Request, res: Response) => {
    const result = await paymentService.successPayment(req.body);

    const frontendUrl = getFrontendUrl();

    return res.redirect(
      303,
      `${frontendUrl}/payment/success?bookingId=${encodeURIComponent(
        result.bookingId,
      )}`,
    );
  },
);

// Payment Fail
const failPayment = cathasync(
  async (req: Request, res: Response) => {
    // Service should update the payment status as FAILED.
    // Implement failPayment in payment.service.ts if it does not exist.
    await paymentService.failPayment(req.body);

    const frontendUrl = getFrontendUrl();

    return res.redirect(
      303,
      `${frontendUrl}/payment/cancel?status=failed`,
    );
  },
);

// Payment Cancel
const cancelPayment = cathasync(
  async (req: Request, res: Response) => {
    // Service should update the payment status as CANCELLED.
    // Implement cancelPayment in payment.service.ts if it does not exist.
    await paymentService.cancelPayment(req.body);

    const frontendUrl = getFrontendUrl();

    return res.redirect(
      303,
      `${frontendUrl}/payment/cancel?status=cancelled`,
    );
  },
);

// Get My Payments
const getMyPayments = cathasync(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "User authentication required",
      );
    }

    const result = await paymentService.getMyPayments(userId as string);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Payment history retrieved successfully",
      data: result,
    });
  },
);

// Get Single Payment
const getSinglePayment = cathasync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "User authentication required",
      );
    }

    const result = await paymentService.getSinglePayment(
      id as string,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Payment details retrieved successfully",
      data: result,
    });
  },
);

export const paymentController = {
  createPayment,
  successPayment,
  failPayment,
  cancelPayment,
  getMyPayments,
  getSinglePayment,
};
