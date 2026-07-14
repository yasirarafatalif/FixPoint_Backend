import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking)
router.get("/", auth(Role.CUSTOMER, Role.ADMIN), bookingController.findBooking)
router.get("/:id", auth(Role.CUSTOMER, Role.ADMIN), bookingController.findSingleBooking)



export const bookingRoute = router;