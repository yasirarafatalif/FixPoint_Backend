import { Role } from './../../../generated/prisma/enums';
import { Router } from "express";
import { auth } from "../../middleware/auth";
import { techniciansController } from './technician.controller';

const router = Router();

router.post("/profile", auth(Role.TECHNICIAN), techniciansController.createTechnician)
router.get("/",  techniciansController.getAllTechnicians)
router.get("/profile", auth(Role.TECHNICIAN), techniciansController.myProfile)
router.put("/profile", auth(Role.TECHNICIAN,), techniciansController.updateProfile)
router.get("/bookings", auth(Role.TECHNICIAN,), techniciansController.getBooking)
router.put("/availability", auth(Role.TECHNICIAN,), techniciansController.updateAvailability)
router.get("/:id",  techniciansController.getSingleTechnician)
router.patch("/bookings/:id", auth(Role.TECHNICIAN,), techniciansController.updateBookingStatus)
// router.post("/availability", auth(Role.TECHNICIAN), techniciansController.createTechnician)
// router.post("/bookings", auth(Role.TECHNICIAN), techniciansController.createTechnician)
// router.post("/bookings/:id", auth(Role.TECHNICIAN), techniciansController.createTechnician)



export const technicianRoute = router;