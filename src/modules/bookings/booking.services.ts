import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
import { BookingsI } from "./booking.interface";
import { BookingStatus, WeekDay } from "../../../generated/prisma/client";

// const createBooking = async (payload: BookingsI, userId: string) => {
//   const { serviceId, customerNote, bookingDate } = payload;
//   if (!serviceId || !customerNote || !bookingDate) {
//     throw new AppError(
//       StatusCodes.BAD_REQUEST,
//       "serviceId, customerNote and bookingDate are required",
//     );
//   }

//   const booking = new Date(bookingDate);

//   const bookingTime = booking.toTimeString().slice(0, 5);

//   const data = await prisma.$transaction(async (tx) => {
//     const findService = await tx.services.findUnique({
//       where: {
//         id: serviceId,
//       },
//     });

//     if (!findService) {
//       throw new AppError(StatusCodes.NOT_FOUND, "This Service Not Found");
//     }
//     if (!findService.isActive) {
//       throw new AppError(
//         StatusCodes.NOT_FOUND,
//         "This service is currently unavailable.",
//       );
//     }

//     const exitsBooking = await tx.bookings.findFirst({
//       where: {
//         customerId: userId,
//         serviceId: findService.id,
//       },
//     });
//     if (exitsBooking) {
//       throw new AppError(
//         StatusCodes.CONFLICT,
//         "You have already booked this service.",
//       );
//     }

//     const availability = await tx.availability.findFirst({
//       where: {
//         technicianId: findService.technicianId,
//       },
//     });

//     if (!availability) {
//       throw new AppError(
//         StatusCodes.BAD_REQUEST,
//         "The technician is not available on this day.",
//       );
//     }

//     if (
//       bookingTime < availability.startTime ||
//       bookingTime > availability.endTime
//     ) {
//       throw new AppError(
//         StatusCodes.BAD_REQUEST,
//         "The selected booking time is outside the technician's working hours.",
//       );
//     }

//     const existingSlot = await tx.bookings.findFirst({
//       where: {
//         technicianId: findService.technicianId,
//         bookingDate,
//         status: {
//           in: [BookingStatus.REQUESTED, BookingStatus.ACCEPTED],
//         },
//       },
//     });

//     if (existingSlot) {
//       throw new AppError(
//         StatusCodes.CONFLICT,
//         "This time slot is already booked.",
//       );
//     }

//     const data = await tx.bookings.create({
//       data: {
//         bookingDate,
//         customerNote,
//         totalPrice: findService.price,
//         customerId: userId,
//         technicianId: findService.technicianId,
//         serviceId: findService.id,
//       },
//     });

//     return data;
//   });

//   return data;
// };

const createBooking = async (payload: BookingsI, userId: string) => {
  const { serviceId, customerNote, bookingDate } = payload;

  if (!serviceId || !customerNote || !bookingDate) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "serviceId, customerNote and bookingDate are required",
    );
  }

  const booking = new Date(bookingDate);

  if (Number.isNaN(booking.getTime())) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid booking date.");
  }

  // Bangladesh local date and time
  const bookingTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(booking);

  const localDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(booking);

  const dayStart = new Date(`${localDate}T00:00:00+06:00`);
  const nextDay = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  const data = await prisma.$transaction(async (tx) => {
    // Find service
    const findService = await tx.services.findUnique({
      where: { id: serviceId },
    });

    if (!findService) {
      throw new AppError(StatusCodes.NOT_FOUND, "This Service Not Found");
    }

    if (!findService.isActive) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "This service is currently unavailable.",
      );
    }

    // Prevent duplicate booking for the same customer and service
    const existingCustomerBooking = await tx.bookings.findFirst({
      where: {
        customerId: userId,
        serviceId: findService.id,
        status: {
          in: [
            BookingStatus.REQUESTED,
            BookingStatus.ACCEPTED,
            BookingStatus.IN_PROGRESS,
          ],
        },
      },
    });

    if (existingCustomerBooking) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "You already have an active booking for this service.",
      );
    }

    // Find bookings on the selected Bangladesh date
    const existingBookings = await tx.bookings.findMany({
      where: {
        technicianId: findService.technicianId,
        bookingDate: {
          gte: dayStart,
          lt: nextDay,
        },
        status: {
          in: [
            BookingStatus.REQUESTED,
            BookingStatus.ACCEPTED,
            BookingStatus.IN_PROGRESS,
          ],
        },
      },
      select: {
        bookingDate: true,
      },
    });

    // Compare selected time with occupied times
    const isSlotBooked = existingBookings.some((item) => {
      const existingTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(item.bookingDate);

      return existingTime === bookingTime;
    });

    if (isSlotBooked) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "This time slot is already booked. Please select another time.",
      );
    }

    // Create booking
    return tx.bookings.create({
      data: {
        bookingDate: booking,
        customerNote,
        totalPrice: findService.price,
        customerId: userId,
        technicianId: findService.technicianId,
        serviceId: findService.id,
      },
    });
  });

  return data;
};

const findBooking = async (userId: string, role: string) => {
  if (role === "ADMIN") {
    const result = await prisma.bookings.findMany({
      include: {
        customer: true,
        service: true,
        technician: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (result.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "Booking Not Found");
    }

    return result;
  }

  const result = await prisma.bookings.findMany({
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

  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking Not Found");
  }

  return result;
};

const findSingleBooking = async (
  bookingId: string,
  userId: string,
  role: string,
) => {
  let booking;

  if (role === "ADMIN") {
    booking = await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        customer: {
          omit: {
            password: true,
          },
        },
        service: true,
        review: true,
      },
    });
  } else {
    booking = await prisma.bookings.findFirst({
      where: {
        id: bookingId,
        customerId: userId,
      },
      include: {
        service: true,
        review: true,
      },
    });
  }

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found.");
  }

  return booking;
};

export const bookingServices = {
  createBooking,
  findBooking,
  findSingleBooking,
};
