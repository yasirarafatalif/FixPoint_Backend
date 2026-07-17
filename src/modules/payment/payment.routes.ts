import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create",paymentController.createPayment)
router.post("/confirm",paymentController.successPayment)
router.post("/",paymentController.getMyPayments)
router.get("/:id",paymentController.getSinglePayment)


export const paymentRoute = router;