import express from "express";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { setupSwagger } from "./config/swagger.js";

import session from 'express-session';
import passport from 'passport';
import './config/passport.js';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use('/api/users/',userRoute);
app.use('/api/',authRoutes);
app.use(errorHandler);

setupSwagger(app);


export default app;