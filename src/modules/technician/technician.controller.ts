import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/senRespone";
import { techniciansServices } from "./technician.services";
import { JwtPayload } from "jsonwebtoken";
import { cathasync } from "../../utils/cathasycn";

const createTechnician = cathasync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;
    const result = await techniciansServices.createTechnician(user as JwtPayload,
      req.body
    );

    sendResponse(res, {
      success: true,
      message: "Technician profile created successfully",
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  }
);

const getAllProfile = cathasync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;

    const data = await techniciansServices.allTechniciansProfile();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Profile Retrieved Successfully",
      data,
    });
  }
);


const myProfile= cathasync(
  async(req: Request, res: Response, next:NextFunction)=>{
    const userId = req.user?.id;
    const data = await techniciansServices.myProfile( userId as string);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Profile Retrieved Successfully",
      data,
    });


  }
)
const updateProfile= cathasync(
  async(req: Request , res: Response, next:NextFunction)=>{
    const userId = req.user?.id;
    const payload = req.body;
    const data = await techniciansServices.updateProfile(payload, userId as string);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Profile Update Successfully",
      data,
    });


  }
)
const getBooking= cathasync(
  async(req: Request , res: Response, next:NextFunction)=>{
    const userId = req.user?.id;
    const data = await techniciansServices.getBookig(userId as string);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Booking Retrive Successfully",
      data,
    });


  }
)


export const techniciansController = {
  createTechnician,
  getAllProfile,
  myProfile,
  updateProfile,
  getBooking

};
