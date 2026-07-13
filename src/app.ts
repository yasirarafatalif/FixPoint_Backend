
import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { authRoute } from './modules/auth/auth.routes';
import { userRoute } from './modules/user/user.routes';
import config from './config';
import { technicianRoute } from './modules/technician/technician.routes';
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


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

export default app;