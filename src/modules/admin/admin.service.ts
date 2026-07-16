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
  console.log(category)

  return category;
};

export const categoryServices ={
    createCategory
}