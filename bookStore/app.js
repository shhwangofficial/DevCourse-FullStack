import express from "express";
// import userRouter from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.listen(process.env.PORT);

// app.use("/", userRouter);
