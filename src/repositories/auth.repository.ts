import type { NextFunction } from "express";
import { Auth } from "../models/auth.schema";
import { IAuth } from "../types";

const AuthRepositories = {
  getOne: async (refreshToken: string, next: NextFunction) => {
    try {
      const auth = Auth.findOne({ refreshToken });
      return auth;
    } catch (error) {
      next(error);
    }
  },
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
