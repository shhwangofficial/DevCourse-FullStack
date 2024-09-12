import express from "express";
import userRouter from "./routes/users.js";
import channelRouter from "./routes/channels.js";
const app = express();
const port = 3000;

app.listen(port);

app.use("/", userRouter);
app.use("/channels", channelRouter);
