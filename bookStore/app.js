import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();

app.listen(process.env.PORT);

app.use("/", userRouter);
