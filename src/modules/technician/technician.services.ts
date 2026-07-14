import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { TechniciansI } from "./technician.interface";

const createTechnician = async (user: JwtPayload, payload: TechniciansI) => {
  const { experience, bio, location, skills } = payload;
  console.log(user.id);

  if (user.role !== Role.TECHNICIAN) {
    throw new Error("Only technicians can create a technician profile.");
  }

  const result = await prisma.technicianProfile.create({
    data: {
      experience: Number(experience),
      bio,
      location,
      skills,
      userId: user.id,
    },
  });

  return result;
};

const allTechniciansProfile = async () => {
  const profile = await prisma.technicianProfile.findMany({
    include:{
      user: {
        omit:{
          password:true,
          updateAt: true,
          createdAt:true
        },
        include:{
          review:true
        }
      },
    }
  });

  if (!profile) {
    throw new Error("Technician profile not found");
  }

  return profile;
};
export const techniciansServices = {
  createTechnician,
  allTechniciansProfile,
};
