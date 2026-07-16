import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { adminServices} from "./admin.service";
import { sendResponse } from "../../utils/senRespone";
import { cathasync } from "../../utils/cathasycn";

const createCategory = cathasync(
  async (req: Request, res: Response) => {
    const data = await adminServices.createCategory(req.body);

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
    const data = await adminServices.getAllCategories();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Categories Retrieved Successfully",
      data,
    });
  }
);

const getAllBookings = cathasync(
  async (req: Request, res: Response) => {
    const data = await adminServices.getAllBookings();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Bookings Retrieved Successfully",
      data,
    });
  }
);

export const adminController ={
    createCategory,
    getAllCategories,
    getAllBookings,
}