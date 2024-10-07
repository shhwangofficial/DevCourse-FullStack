import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import bookRouter from "./routes/books.js";
import cartRouter from "./routes/carts.js";
import likeRouter from "./routes/likes.js";
import orderRouter from "./routes/orders.js";
import categoryRouter from "./routes/category.js";

const app = express();
dotenv.config();

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/carts", cartRouter);
app.use("/likes", likeRouter);
app.use("/orders", orderRouter);
app.use("/category", categoryRouter);

console.log("PORT:", process.env.PORT);
app.listen(process.env.PORT);
