import { NextFunction, Request, Response } from "express";
import { cathasycn } from "../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import StatusCodes from "http-status-codes"
import { userServices } from "./user.services";

const createUser = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const data = await userServices.createUser(payload)
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User create successful",
      data: data,
    });
  },
);


export const userController ={
    createUser

}