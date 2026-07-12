import { Role } from "./../../generated/prisma/enums";
import { NextFunction, Request, Response } from "express";
import { cathasycn } from "../utils/cathasycn";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
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
  return cathasycn(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("Token is required");
    }
    const validToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
    if (!validToken) {
      throw new Error("Invalid token");
    }
    if (typeof validToken === "string") {
      throw new Error("Invalid token");
    }

    const { id, email, role } = validToken as JwtPayload;
    if (roles.length > 0 && !roles.includes(role)) {
      throw new Error("Unauthorized access");
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email,
        role,
        id,
      },
    });

    if (!findUser) {
      throw new Error("User not found");
    }
    req.user = {
      id: validToken.id,
      email: validToken.email,
      role: validToken.role,
    };

    next();
  });
};
