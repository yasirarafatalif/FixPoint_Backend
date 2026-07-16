import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { cathasync } from "../../utils/cathasycn";
import { categoryServices } from "./category.services";
import { sendResponse } from "../../utils/senRespone";

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
    getAllCategories
}