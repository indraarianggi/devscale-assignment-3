import type { NextFunction } from "express";
import { Auth } from "../models/auth.schema";
import { IAuth } from "../types";

const AuthRepositories = {
  create: async (auth: IAuth, next: NextFunction) => {
    try {
      const newRefreshToken = new Auth(auth);

      await newRefreshToken.save();
    } catch (error) {
      next(error);
    }
  },
};

export default AuthRepositories;
