import express, { type Express, type Request, type Response } from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import { authRoute } from './modules/auth/auth.routes';
import { userRoute } from './modules/user/user.routes';
const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use("/api/auth", userRoute)


app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

export default app;