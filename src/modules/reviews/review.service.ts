import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";
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
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
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

const getAllReviews = async (userId: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        customerId: userId,
      },
      include: {
        booking: true,
      },
    });
    return reviews;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to retrieve reviews",
    );
  }
};

export const reviewService = {
  createReview,
  getAllReviews,
};
