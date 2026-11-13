import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/senRespone";
import { serviceServices } from "./service.services";
import { cathasync } from "../../utils/cathasycn";

const createService = cathasync(
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

const getAllServices = cathasync(
  async (req: Request, res: Response) => {
    const result = await serviceServices.getAllServices(req.query);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Services Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleService = cathasync(
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
  getAllServices,
  getSingleService,
};
