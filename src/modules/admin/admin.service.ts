import { prisma } from "../../lib/prisma";
import { CategoryI } from "./admin.interface";

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

export const categoryServices ={
    createCategory,
    getAllCategories,
}