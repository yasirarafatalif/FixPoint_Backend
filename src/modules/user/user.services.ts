import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { IManageProfile, UserCreateI } from "./user.interface";
import { LogInRole } from "../../../generated/prisma/client";
import AppError from "../../utils/appError";
import { StatusCodes } from "http-status-codes";

const createUser = async (payload: UserCreateI) => {
  const { name, email, password, profileImage, role, phone, address } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExist) {
    throw new AppError(StatusCodes.CONFLICT,"User with this email already exists");
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
    throw new AppError(StatusCodes.BAD_REQUEST,"This Role Can't Create By ADMIN");
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
    throw new AppError(StatusCodes.BAD_REQUEST,"User not found");
  }

  return user;
};

const manageProfile = async (
  id: string,
  payload:IManageProfile
) => {
  const technician = await prisma.user.findUnique({
    where: { id },
  });

  if (!technician) {
    throw new AppError(StatusCodes.NOT_FOUND, "Technician not found");
  }

  const updatedProfile = await prisma.user.update({
    where:{id},
    data:{
      ...payload,
      updateAt: new Date()
    },
    omit:{
      password: true

    }
  })

  return updatedProfile;
};

export const userServices = {
  createUser,
  getProfile,
  manageProfile
};
