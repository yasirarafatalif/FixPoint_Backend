import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { UserCreateI } from "./user.interface";
import { LogInRole } from "../../../generated/prisma/client";

const createUser = async (payload: UserCreateI) => {
  const { name, email, password, profileImage, role, phone, address } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hassPassword = bcrypt.hashSync(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  //   console.log(hassPassword)

  if (
    !role.includes(LogInRole.CUSTOMER) &&
    !role.includes(LogInRole.TECHNICIAN)
  ) {
    throw new Error("This Role Can't Create By ADMIN");
  }

  const create = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      profileImage,
      password: hassPassword,
      role,
      address,
    },
    omit: {
      password: true,
    },
  });
  return create;
};

const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const userServices = {
  createUser,
  getProfile,
};
