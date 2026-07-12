import { NextFunction, Request, Response } from "express";
import { cathasycn } from "../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import StatusCodes from "http-status-codes";
import { userServices } from "./user.services";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const createUser = cathasycn(
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

const getProfile = cathasycn(
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

export const userController = {
  createUser,
  getProfile,
};
