import type { NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser } from "../types";
import UserRepositories from "../repositories/user.repository";
import AuthRepositories from "../repositories/auth.repository";

const AuthServices = {
  login: async (credential: Omit<IUser, "name">, next: NextFunction) => {
    try {
      const { email, password } = credential;

      // input validation
      if (!email || password?.length < 8) {
        throw {
          statusCode: 400,
          error: new Error("name or password can not be empty"),
        };
      }

      // find user by email
      const user = await UserRepositories.getByEmail(email, next);

      if (!user) {
        throw {
          statusCode: 404,
          error: new Error("user not found"),
        };
      }

      if (!user.password) {
        throw {
          statusCode: 400,
          error: new Error("password not set"),
        };
      }

      // password validation
      const isPasswordMatch = await bcrypt.compare(password, user.password!);

      if (!isPasswordMatch) {
        throw {
          statusCode: 403,
          error: new Error("invalid password"),
        };
      }

      // authorization
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_TIME || 3600 }
      );

      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_TIME || "7d" }
      );

      // save refresh token to database
      await AuthRepositories.create({ userId: user.id, refreshToken }, next);

      return { accessToken, refreshToken };
    } catch (error) {
      next(error);
    }
  },
};

export default AuthServices;
