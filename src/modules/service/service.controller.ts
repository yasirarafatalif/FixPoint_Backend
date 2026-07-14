import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { cathasycn } from "../../utils/cathasycn";
import { sendResponse } from "../../utils/senRespone";
import { serviceServices } from "./service.services";

const createService = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id;

    const data = await serviceServices.createService(payload, userId as string);

    sendResponse(res, {
      success: true,
      message: "Create Service Successfully",
      statusCode: StatusCodes.OK,
      data: data,
    });
  },
);

const getService = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getSingleService = cathasycn(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = await serviceServices.getSingleService(id as string);
    sendResponse(res, {
      success: true,
      message: "Data Find Successfully",
      statusCode: StatusCodes.OK,
      data: data,
    });
  },
);

export const serviceController = {
  createService,
  getService,
  getSingleService,
};
