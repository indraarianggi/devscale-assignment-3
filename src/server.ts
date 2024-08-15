import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/user.route";
import ErrorHandler from "./middlewares/ErrorHandler";

dotenv.config();

// connect to mongodb using mongoose
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error);
  });

const app = express();

app.use(express.json());

/**
 * Routes
 */
app.use("/users", userRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running at port: ${process.env.PORT || 8000}`);
});
