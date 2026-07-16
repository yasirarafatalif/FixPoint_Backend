
import { prisma } from "../../lib/prisma";
import { ServiceFilters, ServicesI } from "./service.interface";


const createService = async (payload: ServicesI, userId: string) => {
  const { title, discription, price, duration } = payload;
  const priceNumber = typeof price === "number" ? price : Number(price);
  const durationNumber = typeof duration === "number" ? duration : Number(duration);

  const findTechnician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!findTechnician) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.services.create({
    data: {
      title,
      discription,
      price: priceNumber,
      duration: durationNumber,
      technicianId: findTechnician.id,
    },
  });

  return result;
};


const getSingleService =async(id:string)=>{

    const result= await prisma.services.findUnique({
        where:{
            id
        },
        include:{
            technician: true
        }
    });
    if(!result){
        throw new Error("Service Not Found")
    };
    return result;

}
const getAllServices = async (query: ServiceFilters) => {
  const {
    type,
    location,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const andConditions: any[] = [];

  if (type) {
    andConditions.push({
      type: {
        equals: type,
        mode: "insensitive",
      },
    });
  }

  if (location) {
    andConditions.push({
      technician: {
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
    });
  }


  const where = andConditions.length ? { AND: andConditions } : {};

  const data = await prisma.services.findMany({
    where,
    omit:{
      createdAt:true,
      updatedAt: true

    },
    include: {
      technician: {
        omit:{
          createdAt: true,
          updatedAt: true
        }
      },
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.services.count({
    where,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  };
};
export const serviceServices={
    createService,
    getSingleService,
    getAllServices

}