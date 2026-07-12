import { Role } from './../../../generated/prisma/enums';
import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/register", userController.createUser)
router.post("/me", auth(Role.CUSMOTER, Role.ADMIN, Role.TECHNICIAN), userController.getProfile)



export const userRoute = router;