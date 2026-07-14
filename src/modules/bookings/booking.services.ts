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

const findBooking = async (userId: string, role: string) => {
  if (role === "ADMIN") {
    return await prisma.bookings.findMany({
      include: {
        customer: true,
        service: true,
        technician: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return await prisma.bookings.findMany({
    where: {
      customerId: userId,
    },
    // include: {
    //   service: true,
    //   technician: true,
    // },
    orderBy: {
      createdAt: "desc",
    },
  });
};


const findSingleBooking = async (bookingId: string, userId: string, role: string) => {
  if (role === "ADMIN") {
    return await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        customer: {
            omit:{
                password: true
            }
        },
        service: true,
        technician: true,
        review: true,
      },
    });
  }

  return await prisma.bookings.findFirst({
    where: {
      id: bookingId,
      customerId: userId,
    },
    include: {
      service: true,
      technician: true,
      review: true,
    },
  });
};


export const bookingServices = {
  createBooking,
  findBooking,
  findSingleBooking
};
