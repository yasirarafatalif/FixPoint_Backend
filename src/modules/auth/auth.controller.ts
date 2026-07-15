
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/senRespone";
import StatusCodes from "http-status-codes";
import { userServices } from "./auth.services";
import { cathasync } from "../../utils/cathasycn";


const login = cathasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const {accessToken, refreshToken} = await userServices.loginIntodb(payload);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1 *24  * 60 * 60 * 1000, // 1 day
    });
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Login successful",
      data: {accessToken, refreshToken},
    });



  },
);
export const authController = {
  login,
};
