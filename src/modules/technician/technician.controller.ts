import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { cathasycn } from "./../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import { techniciansServices } from "./technician.services";
import { JwtPayload } from "jsonwebtoken";

const createTechnician = cathasycn(
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

const getAllProfile = cathasycn(
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



export const techniciansController = {
  createTechnician,
  getAllProfile

};
