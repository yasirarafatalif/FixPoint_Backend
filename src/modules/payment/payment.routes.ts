import { Role } from './../../../generated/prisma/enums';
import { auth } from './../../middleware/auth';
import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create",auth(Role.CUSTOMER), paymentController.createPayment)
router.post("/confirm",paymentController.successPayment)
// router.post("/",paymentController.getMyPayments)
router.get("/",auth(Role.CUSTOMER),paymentController.getMyPayments)
router.get("/:id",auth(Role.CUSTOMER),paymentController.getSinglePayment)

router.post("/success", paymentController.successPayment);
router.post("/fail", paymentController.failPayment);
router.post("/cancel", paymentController.cancelPayment);


export const paymentRoute = router;