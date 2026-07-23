import { Role } from "./../../generated/prisma/enums";
import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { cathasync } from "../utils/cathasycn";
import AppError from "../utils/appError";
import { StatusCodes } from "http-status-codes";
declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...roles: Role[]) => {
  return cathasync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Token is required");
    }

    const validToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!validToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    if (typeof validToken === "string") {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    const { id, email, role } = validToken as JwtPayload;

    if (roles.length > 0 && !roles.includes(role)) {
      throw new AppError(StatusCodes.FORBIDDEN, "Unauthorized access");
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email,
        role,
        id,
      },
    });

    if (!findUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    req.user = {
      id: validToken.id,
      email: validToken.email,
      role: validToken.role,
    };

    next();
  });
};
