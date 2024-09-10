import express from "express";
import userRouter from "./routes/user.js";
import channelRouter from "./routes/channel.js";
const app = express();
const port = 3000;

app.listen(port);

app.use("/", userRouter);
app.use("/", channelRouter);
