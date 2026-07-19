import { Role } from './../../../generated/prisma/enums';
import { auth } from './../../middleware/auth';
import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();


router.get("/categories",auth(Role.ADMIN,Role.TECHNICIAN), adminController.getAllCategories)
router.post("/categories",auth(Role.ADMIN), adminController.createCategory)
router.get("/bookings",auth(Role.ADMIN), adminController.getAllBookings)
router.patch("/users/:id",auth(Role.ADMIN), adminController.updateUserStatus)
router.get("/users",auth(Role.ADMIN), adminController.getAllUsers)


export const adminRoute = router;