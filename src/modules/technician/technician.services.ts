import { JwtPayload } from "jsonwebtoken";
import { Role, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import {
  TechnicianFilters,
  TechniciansI,
  UpdateAvailabilityI,
  UpdateStatus,
} from "./technician.interface";
import AppError from "../../utils/appError";
import { StatusCodes } from "http-status-codes";

const createTechnician = async (user: JwtPayload, payload: TechniciansI) => {
  const { experience, bio, location, skills } = payload;

  if (user.role !== Role.TECHNICIAN) {
    throw new Error("Only technicians can create a technician profile.");
  }

  const data = await prisma.$transaction(async (tx) => {
    const finUser = await tx.technicianProfile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (finUser) {
      throw new Error("Already exists");
    }

    return await tx.technicianProfile.create({
      data: {
        experience: Number(experience),
        bio,
        location,
        skills,
        userId: user.id,
      },
    });
  });

  return data;
};

const getSingleTechnician = async (id: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    include:{
      services: true
    }
  });

  if (!technician) {
    throw new AppError(StatusCodes.NOT_FOUND, "Technician not found");
  }

  const bookings = await prisma.bookings.findMany({
    where: {
      technicianId: technician.id,
    },
    select: {
      review: {
        select: {
          id: true,
          rating: true,
          comment: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const reviews = bookings.map((booking) => booking.review).filter(Boolean);

  return {
    ...technician,
    reviews,
  };
};

const getAllTechnicians = async (query: TechnicianFilters) => {
  const {
    searchTerm,
    location,
    skills,
    experience,
    isAvailable,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          user: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          bio: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (location) {
    andConditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  if (skills) {
    andConditions.push({
      skills: {
        has: skills,
      },
    });
  }

  if (experience) {
    andConditions.push({
      experience: {
        gte: Number(experience),
      },
    });
  }

  if (isAvailable !== undefined) {
    andConditions.push({
      isAvailable: isAvailable === "true",
    });
  }

  const where = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const data = await prisma.technicianProfile.findMany({
    where,
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    include: {
      services: {
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.technicianProfile.count({
    where,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  };
};
const myProfile = async (userId: string) => {
  const user = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    throw new Error("Technician not found");
  }

  return user;
};

const updateProfile = async (payload: TechniciansI, userId: string) => {
  const updateData: any = {};

  if (payload.bio !== undefined) updateData.bio = payload.bio;
  if (payload.location !== undefined) updateData.location = payload.location;
  if (payload.skills !== undefined) updateData.skills = payload.skills;
  if (payload.experience !== undefined) {
    updateData.experience = Number(payload.experience);
  }
  if (payload.isAvailable !== undefined) {
    updateData.isAvailable = payload.isAvailable;
  }

  const data = await prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: updateData,
  });

  return data;
};

const getBookig = async (userId: string) => {
  const findTechnican = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!findTechnican) {
    throw new AppError(StatusCodes.NOT_FOUND, "Technician Not Found");
  }

  const findBooking = await prisma.bookings.findMany({
    where: {
      technicianId: findTechnican.id,
    },
  });

  if (findBooking.length === 0) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No bookings found for this technician.",
    );
  }

  return findBooking;
};

const updateAvailability = async (
  payload: UpdateAvailabilityI,
  userId: string,
) => {
  const data = await prisma.$transaction(async (tx) => {
    const technician = await tx.technicianProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!technician) {
      throw new Error("Technician profile not found");
    }

    const existingAvailability = await tx.availability.findFirst({
      where: {
        technicianId: technician.id,
      },
    });

    if (existingAvailability) {
      return await tx.availability.update({
        where: {
          id: existingAvailability.id,
        },
        data: payload,
      });
    }

    return await tx.availability.create({
      data: {
        ...payload,
        technicianId: technician.id,
      },
    });
  });

  return data;
};

const updateStatus = async (
  id: string,
  userId: string,
  payload: UpdateStatus,
) => {
  const data = await prisma.$transaction(async (tx) => {
    const findTechnician = await tx.technicianProfile.findUnique({
      where: {
        userId,
      },
    });
    if (!findTechnician) {
      throw new AppError(StatusCodes.NOT_FOUND, "Technicians not found");
    }
    if (!findTechnician.isAvailable) {
      throw new AppError(StatusCodes.NOT_FOUND, "Technicians not available");
    }
    const findBokking = await tx.bookings.findFirst({
      where: {
        id,
        technicianId: findTechnician.id,
      },
    });

    if (!findBokking) {
      throw new AppError(StatusCodes.NOT_FOUND, "This bookings not avilable");
    }

    if (findBokking.status === BookingStatus.COMPLETED) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "This booking has already been completed.",
      );
    }

    if (
      findBokking.status !== BookingStatus.REQUESTED &&
      payload.status === BookingStatus.ACCEPTED
    ) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Only requested bookings can be accepted.",
      );
    }
    const result = await tx.bookings.update({
      where: {
        id,
      },
      data: {
        status: payload.status,
        updatedAt: new Date()
      },
    });
    return result;
  });
  return data;
};
export const techniciansServices = {
  createTechnician,
  getAllTechnicians,
  myProfile,
  updateProfile,
  getBookig,
  updateAvailability,
  updateStatus,
  getSingleTechnician,
};
