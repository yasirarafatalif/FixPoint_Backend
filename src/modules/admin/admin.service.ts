import { prisma } from "../../lib/prisma";
import { CategoryI, UpdateUserStatus } from "./admin.interface";

const createCategory = async (payload: CategoryI) => {
  const isExist = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isExist) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

const getAllBookings = async () => {
  const bookings = await prisma.bookings.findMany({
    // include: {
    //   technician: {
    //     omit: {
    //       createdAt: true,
    //       updatedAt: true,
    //     },
    //   },
    // },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};


const updateUserStatus = async (
  id: string,
  payload: UpdateUserStatus
) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: payload.isActive,
    },
  });

  return updatedUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};


export const adminServices = {
  createCategory,
  getAllCategories,
  getAllBookings,
  updateUserStatus,
  getAllUsers
};
