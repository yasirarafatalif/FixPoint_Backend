
import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { authRoute } from './modules/auth/auth.routes';
import { userRoute } from './modules/user/user.routes';
import config from './config';
import { technicianRoute } from './modules/technician/technician.routes';
import { serviceRoute } from './modules/service/service.routes';
import { bookingRoute } from './modules/bookings/booking.routes';
import globalErrorHandler from './middleware/globalErrorHandler';
import { categoryRoute } from './modules/category/category.routes';
import { adminRoute } from './modules/admin/admin.routes';
import { paymentRoute } from './modules/payment/payment.routes';
import { reviewRoute } from './modules/reviews/review.routes';
const app: Express = express();



app.use(cors({
    origin: config.app_url,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use("/api/auth", userRoute)
app.use("/api/technicians", technicianRoute)
app.use("/api/services", serviceRoute)
app.use("/api/bookings", bookingRoute)
app.use("/api/categories", categoryRoute)
app.use("/api/admin", adminRoute)
app.use("/api/payments", paymentRoute)
app.use("/api/reviews", reviewRoute)


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

app.use(globalErrorHandler)

export default app;