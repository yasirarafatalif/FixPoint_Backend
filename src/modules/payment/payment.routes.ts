import { Role } from './../../../generated/prisma/enums';
import { auth } from './../../middleware/auth';
import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create",auth(Role.CUSTOMER), paymentController.createPayment)
router.post("/confirm",paymentController.successPayment)
router.post("/",paymentController.getMyPayments)
router.get("/:id",paymentController.getSinglePayment)


export const paymentRoute = router;