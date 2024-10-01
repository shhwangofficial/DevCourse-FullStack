import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import bookRouter from "./routes/books.js";
import cartRouter from "./routes/carts.js";
import likeRouter from "./routes/likes.js";
import orderRouter from "./routes/orders.js";

const app = express();
dotenv.config();

app.listen(process.env.PORT);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/carts", likeRouter);
app.use("/likes", cartRouter);
app.use("/orders", orderRouter);
