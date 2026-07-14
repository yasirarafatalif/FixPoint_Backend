import { prisma } from "../../lib/prisma";
import { BookingsI } from "./booking.interface";

const createBooking = async (payload: BookingsI, userId: string) => {
  const { serviceId, customerNote, bookingDate } = payload;

  const findService = await prisma.services.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!findService) {
    throw new Error("This Service Not Found");
  }

  const data = await prisma.bookings.create({
    data: {
      bookingDate,
      customerNote,
      totalPrice: findService.price,
      customerId: userId,
      technicianId: findService.technicianId,
      serviceId: findService.id,
    },
  });

  return data;
};

const findBooking = async (userId: string) => {
  const bookings = await prisma.bookings.findMany({
    where: {
      customerId: userId,
    },
  });

  return bookings;
};

export const bookingServices = {
  createBooking,
  findBooking
};
