import { NextFunction, Request, Response } from "express";
import { cathasycn } from "../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import { StatusCodes } from "http-status-codes";
import { bookingServices } from "./booking.services";
import { JwtPayload } from "jsonwebtoken";

const createBooking = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId= req.user?.id;

    const data = await bookingServices.createBooking( payload, userId as string);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Your Request Has Been Submitted",
      data: data
    });
  },
);
const findBooking = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const role = req.user?.role;


    const data = await bookingServices.findBooking(userId as string , role as string);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Bookings Retrieved Successfully",
      data,
    });
  }
);
const findSingleBooking = cathasycn(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const userId = req.user?.id ;
    const role = req.user?.role 

    const data = await bookingServices.findSingleBooking(
      bookingId as string,
      userId as string,
      role as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Booking Retrieved Successfully",
      data,
    });
  }
);


export const bookingController = {
  createBooking,
  findBooking,
  findSingleBooking
};
