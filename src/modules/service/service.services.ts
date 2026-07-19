import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { ServiceFilters, ServicesI } from "./service.interface";

const createService = async (payload: ServicesI, userId: string) => {
  const { title, description, price, duration, categoryId } = payload;
  const priceNumber = typeof price === "number" ? price : Number(price);
  const durationNumber =
    typeof duration === "number" ? duration : Number(duration);

  const data = await prisma.$transaction(async (tx) => {


    const findTechnician = await tx.technicianProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!findTechnician) {
      throw new AppError(StatusCodes.NOT_FOUND,"Technician profile not found");
    }

    //find category and add

    const finCategory = await tx.category.findUnique({
      where:{
        id: categoryId
      }
    })

    if (!finCategory) {
      throw new AppError(StatusCodes.NOT_FOUND,"This category not found");
    }



    const result = await tx.services.create({
      data: {
        title,
        description,
        price: priceNumber,
        duration: durationNumber,
        categoryId,
        technicianId: findTechnician.id,
      },
    });

    return result;
  });
  return data;
};

const getSingleService = async (id: string) => {
  const result = await prisma.services.findUnique({
    where: {
      id,
    },
    include: {
      technician: {
        omit:{
          createdAt:true,
          updatedAt:true,
          userId:true
        }
      },
    },
  });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND,"Service Not Found");
  }
  return result;
};
const getAllServices = async (query: ServiceFilters) => {
  const {
    type,
    location,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const andConditions: any[] = [];

  if (type) {
    andConditions.push({
      type: {
        equals: type,
        mode: "insensitive",
      },
    });
  }

  if (location) {
    andConditions.push({
      technician: {
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
    });
  }

  const where = andConditions.length ? { AND: andConditions } : {};

  const data = await prisma.services.findMany({
    where,
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    include: {
      technician: {
        omit: {
          userId:true,
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

  if (data.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Service Not Found");
  }

  const total = await prisma.services.count({
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
export const serviceServices = {
  createService,
  getSingleService,
  getAllServices,
};
