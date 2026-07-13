import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createTechnician = async (
  user: JwtPayload,
  payload: any
) => {

  if (user.role !== Role.TECHNICIAN) {
    throw new Error(
      "Only technicians can create a technician profile."
    );
  }

  const result = await prisma.technicianProfile.create({
    data: {
      ...payload,
      userId: user.id,
    },
  });

  return result;
};
export const techniciansServices = {
  createTechnician,
};
