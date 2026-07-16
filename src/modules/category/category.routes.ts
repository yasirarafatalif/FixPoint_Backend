import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";


const router = Router();

router.get("/", auth(Role.ADMIN, Role.CUSTOMER,Role.TECHNICIAN), categoryController.getAllCategories)
// router.post("/", auth(Role.ADMIN,), categoryController.getAllCategories)



export const categoryRoute = router;