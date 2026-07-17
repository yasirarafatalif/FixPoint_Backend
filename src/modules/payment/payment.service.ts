import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { CustomerI } from "./payment.interface";
import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/client";
import axios from "axios";

const store_id = config.ssl_store_id!;
const store_password = config.ssl_store_password!;
const isLive = false;

const sslcz = new SSLCommerzPayment(store_id, store_password, isLive);

const initPayment = async (payload: CustomerI, userId: string) => {
  const { bookingId } = payload;

  const findbooking = await prisma.bookings.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!findbooking) {
    throw new Error("This booking not found");
  }

  if (findbooking.status !== BookingStatus.ACCEPTED) {
    throw new Error("This booking didn't accepted by technician");
  }

  //   if (findbooking.paymentStatus === BookingStatus.PAID) {
  //   throw new Error("This booking is already paid");
  // }

  const findService = await prisma.services.findUnique({
    where: {
      id: findbooking?.serviceId,
    },
  });
  if (!findService) {
    throw new Error("This service not found");
  }

  const transactionId = `FIXIT-${Date.now()}`;
  const data = {
    total_amount: findbooking.totalPrice,
    currency: "BDT",
    tran_id: transactionId,

    success_url: `${config.ssl_store_backend}/api/payments/confirm`,
    fail_url: `${config.ssl_store_backend}/api/payments/fail`,
    cancel_url: `${config.ssl_store_backend}/api/payments/cancel`,
    ipn_url: `${config.ssl_store_backend}/api/payments/ipn`,

    shipping_method: "NO",
    product_name: findService.title,
    product_id: findbooking.id,
    service_id: findService.id,
    product_category: "Home Service",
    product_profile: "general",

    cus_name: payload.name,
    cus_email: payload.email,
    cus_phone: payload.phone,

    value_a: findbooking.id,
    value_b: findService.id,
    value_c: findbooking.customerId,

    cus_add1: payload.address ?? "Uttara",
    cus_add2: "",
    cus_city: payload.city ?? "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: payload.postcode ?? "1230",
    cus_country: "Bangladesh",

    ship_name: payload.name,
    ship_add1: payload.address ?? "Uttara",
    ship_add2: "",
    ship_city: payload.city ?? "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: payload.postcode ?? "1230",
    ship_country: "Bangladesh",
  };

  await prisma.payment.create({
    data: {
      bookingId: findbooking.id,
      transactionId,
      amount: findbooking.totalPrice,
      method: "SSLCOMMERZ",
    },
  });

  const response = await sslcz.init(data);
  //   console.log(response.GatewayPageURL);

  return {
    paymentUrl: response.GatewayPageURL,
  };
};

const successPayment = async (payload: any) => {
  const { val_id, tran_id } = payload;

  const validation = await sslcz.validate({
    val_id,
  });
//   console.log(validation);

  if (validation.status !== "VALID") {
    throw new Error("Payment Error");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: tran_id,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  await prisma.$transaction([
  prisma.payment.update({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: "SUCCESS",
    },
  }),

//   prisma.bookings.update({
//     where: {
//       id: payment.bookingId,
//     },
//     data: {
//       paymentStatus: "PAID",
//     },
//   }),
]);

  // 1. SSLCommerz Validation API call
  //   const verifyResponse = await axios.get(
  //     "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
  //     {
  //       params: {
  //         val_id,
  //         store_id: config.ssl_store_id,
  //         store_passwd: config.ssl_store_password,
  //         format: "json",
  //       },
  //     },
  //   );

  //   const verifyData = verifyResponse.data;
  //   console.log(verifyData)

  //   return {verifyData,validation};
  return { validation };
};
export const paymentService = {
  initPayment,
  successPayment,
};
