import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create",paymentController.createPayment)
router.post("/confirm",paymentController.successPayment)


export const paymentRoute = router;