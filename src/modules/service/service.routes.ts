import { Role } from './../../../generated/prisma/enums';
import { Router } from "express";
import { auth } from "../../middleware/auth";
import { serviceController } from './service.controller';

const router = Router();

router.post("/", auth(Role.TECHNICIAN), serviceController.createService);
router.get("/", serviceController.getAllServices);
router.get("/:id", auth(Role.TECHNICIAN,Role.ADMIN,Role.CUSTOMER), serviceController.getSingleService);



export const serviceRoute = router;