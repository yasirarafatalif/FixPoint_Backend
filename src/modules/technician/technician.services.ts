import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { TechniciansI } from "./technician.interface";

const createTechnician = async (user: JwtPayload, payload: TechniciansI) => {
  const { experience, bio, location, skills } = payload;

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
    include: {
      user: {
        omit: {
          password: true,
          updateAt: true,
          createdAt: true,
        },
        include: {
          review: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Technician profile not found");
  }

  return profile;
};

const myProfile = async (userId: string) => {
  const user = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateProfile = async (payload: TechniciansI, userId: string) => {
  const updateData: any = {};

  if (payload.bio !== undefined) updateData.bio = payload.bio;
  if (payload.location !== undefined) updateData.location = payload.location;
  if (payload.skills !== undefined) updateData.skills = payload.skills;
  if (payload.experience !== undefined) {
    updateData.experience = Number(payload.experience);
  }
  if (payload.isAvailable !== undefined) {
    updateData.isAvailable = payload.isAvailable;
  }

  const data = await prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: updateData,
  });

  return data;
};

const getBookig = async(userId: string)=>{
  const findTechnican = await prisma.technicianProfile.findUnique({
    where:{
      userId
    }
  })

  if(!findTechnican){
    throw new Error("Not Found")
  }

  const findBooking = await prisma.bookings.findMany({
    where:{
      technicianId : findTechnican.id
    }
  })

  return findBooking;
}

export const techniciansServices = {
  createTechnician,
  allTechniciansProfile,
  myProfile,
  updateProfile,
  getBookig
};
