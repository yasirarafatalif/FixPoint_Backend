import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { cathasycn } from "./../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import { techniciansServices } from "./technician.services";
import { JwtPayload } from "jsonwebtoken";

const createTechnician = cathasycn(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await techniciansServices.createTechnician(
      req.user as JwtPayload,
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

export const techniciansController = {
  createTechnician,
};
