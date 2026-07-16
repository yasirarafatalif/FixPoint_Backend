import { Role } from './../../../generated/prisma/enums';
import { auth } from './../../middleware/auth';
import { Router } from "express";
import { categoryController } from "./admin.controller";

const router = Router();


router.get("/categories",auth(Role.ADMIN), categoryController.getAllCategories)
router.post("/categories",auth(Role.ADMIN), categoryController.createCategory)


export const adminRoute = router;