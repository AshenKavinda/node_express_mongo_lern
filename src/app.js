import express from "express";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/users/',userRoute);
app.use('/api/',authRoutes);
app.use(errorHandler);


export default app;