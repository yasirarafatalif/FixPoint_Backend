import { Role } from './../../../generated/prisma/enums';
import { Router } from "express";
import { auth } from "../../middleware/auth";
import { techniciansController } from './technician.controller';

const router = Router();

router.post("/", auth(Role.TECHNICIAN), techniciansController.createTechnician)
router.get("/",  techniciansController.getAllProfile)
router.get("/profile", auth(Role.TECHNICIAN, Role.ADMIN), techniciansController.myProfile)
router.patch("/profile", auth(Role.TECHNICIAN,), techniciansController.updateProfile)
router.get("/bookings", auth(Role.TECHNICIAN,), techniciansController.getBooking)
// router.post("/availability", auth(Role.TECHNICIAN), techniciansController.createTechnician)
// router.post("/bookings", auth(Role.TECHNICIAN), techniciansController.createTechnician)
// router.post("/bookings/:id", auth(Role.TECHNICIAN), techniciansController.createTechnician)



export const technicianRoute = router;