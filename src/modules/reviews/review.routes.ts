import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";
import { reviewController } from "./review.controller";

const router = Router();
router.post(
  "/",
  auth(Role.CUSTOMER),
  reviewController.createReview
);


export const reviewRoute = router;