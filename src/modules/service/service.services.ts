
import { prisma } from "../../lib/prisma";
import { ServicesI } from "./service.interface";


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
const getService =async()=>{

}
export const serviceServices={
    createService,
    getSingleService,
    getService

}