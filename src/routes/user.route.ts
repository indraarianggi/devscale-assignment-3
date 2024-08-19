import express from "express";

import UserControllers from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/register", UserControllers.handleRegisterUser);
userRouter.post("/login", UserControllers.handleLoginUser);
userRouter.post("/logout", UserControllers.handleLogoutUser);
