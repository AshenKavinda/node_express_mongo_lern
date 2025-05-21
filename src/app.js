import express from "express";
import * as userService from "./services/userService.js";

const app = express();
app.use(express.json());

export default app;