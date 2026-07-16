import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { categoryServices } from "./admin.service";
import { sendResponse } from "../../utils/senRespone";
import { cathasync } from "../../utils/cathasycn";

const createCategory = cathasync(
  async (req: Request, res: Response) => {
    const data = await categoryServices.createCategory(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Category Created Successfully",
      data,
    });
  }
);

export const categoryController ={
    createCategory
}