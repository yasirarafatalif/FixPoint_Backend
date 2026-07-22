import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/senRespone";
import StatusCodes from "http-status-codes";
import { userServices } from "./user.services";
import { cathasync } from "../../utils/cathasycn";

const createUser = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const data = await userServices.createUser(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User create successful",
      data: data,
    });
  },
);

const getProfile = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const user = await userServices.getProfile(userId as string);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Profile retrieved successfully",
      data: user,
    });
  },
);

const manageProfile = cathasync(async (req: Request, res: Response) => {
  const userId= req.user?.id

  const result = await userServices.manageProfile(userId as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getProfile,
  manageProfile
};
