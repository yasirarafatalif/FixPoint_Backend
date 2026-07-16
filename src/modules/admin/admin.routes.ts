import { Role } from './../../../generated/prisma/enums';
import { auth } from './../../middleware/auth';
import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();


router.get("/categories",auth(Role.ADMIN), adminController.getAllCategories)
router.post("/categories",auth(Role.ADMIN), adminController.createCategory)
router.get("/bookings",auth(Role.ADMIN), adminController.getAllBookings)


export const adminRoute = router;