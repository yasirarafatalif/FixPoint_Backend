import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { ReviewPayload } from "./review.interface";
import { BookingStatus } from "../../../generated/prisma/client";

const createReview = async (payload: ReviewPayload, userId: string) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.bookings.findFirst({
    where: {
      id: bookingId,
      customerId: userId,
    },
  });

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND,"Booking not found");
  }

  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("You can review only completed bookings.");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already submitted.");
  }

  const review = await prisma.review.create({
    data: {
      bookingId,
      customerId: userId,
      technicianId: booking.technicianId,
      rating,
      comment,
    },
  });

  return review;
};


export const reviewService ={
    createReview
}