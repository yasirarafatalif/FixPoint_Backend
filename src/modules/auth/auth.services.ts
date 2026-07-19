import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { UserCreateI, UserLogin } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import AppError from "../../utils/appError";
import { StatusCodes } from "http-status-codes";

const loginIntodb = async (payload: UserLogin) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (!user) {
  throw new AppError(StatusCodes.NOT_FOUND,"User not found");
}

const matchedPassword = bcrypt.compareSync(password, user.password);

if (!matchedPassword) {
  throw new AppError(StatusCodes.BAD_REQUEST,"Invalid password");
}

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // const token = jwt.sign(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   { expiresIn: config.jwt_access_expires_in  } as SignOptions
  // );

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );
  return { refreshToken, accessToken };
};

export const userServices = {
  loginIntodb,
};
