import { prisma } from "../../lib/prisma";
import { ReviewPayload } from "./review.interface";

const createReview = async (payload: ReviewPayload, userId: string) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.bookings.findFirst({
    where: {
      id: bookingId,
      customerId: userId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

//   if (booking.status !== BookingStatus.COMPLETED) {
//     throw new Error("You can review only completed bookings.");
//   }

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
      serviceId: booking.serviceId,
      rating,
      comment,
    },
  });

  return review;
};


export const reviewService ={
    createReview
}