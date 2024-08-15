import type { NextFunction } from "express";
import bcrypt from "bcrypt";

import { IUser } from "../types";
import UserRepositories from "../repositories/user.repository";

const UserServices = {
  create: async (user: IUser, next: NextFunction) => {
    try {
      const { name, email, password } = user;

      // input validation
      if (!name || !email || password?.length < 8) {
        throw {
          statusCode: 400,
          error: new Error(
            "name or email can not be empty, and password must contains 8 or more characters"
          ),
        };
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserRepositories.create(
        {
          name,
          email,
          password: hashedPassword,
        },
        next
      );

      return newUser;
    } catch (error) {
      next(error);
    }
  },
};

export default UserServices;
