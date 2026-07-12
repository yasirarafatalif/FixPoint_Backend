import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { UserCreateI } from "./auth.interface";


const createUser = async (payload: UserCreateI) => {
  const { name, email, password, profilePhoto, role } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hassPassword=  bcrypt.hashSync(password,Number(config.bcrypt_salt_rounds));
//   console.log(hassPassword)

    const create = await prisma.user.create({
        data: {
            name,
            email,
            password: hassPassword,
            role,
        }
    });
    return create
};

export const userServices = {createUser};
