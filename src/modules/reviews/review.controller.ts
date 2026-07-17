import { Request, Response } from "express";
import { cathasync } from "../../utils/cathasycn";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/senRespone";

const createReview = cathasync(async (req:Request, res: Response) => {
    const id = req.user?.id
  const result = await reviewService.createReview(
    req.body,
    id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Review created successfully",
    data: result,
  });
});


export const reviewController ={
    createReview
}