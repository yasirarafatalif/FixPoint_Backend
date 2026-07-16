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

const getAllCategories = cathasync(
  async (req: Request, res: Response) => {
    const data = await categoryServices.getAllCategories();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Categories Retrieved Successfully",
      data,
    });
  }
);

export const categoryController ={
    createCategory,
    getAllCategories,
}