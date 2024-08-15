import type { NextFunction } from "express";

import { User } from "../models/user.schema";
import { IUser } from "../types";

const UserRepositories = {
  getByEmail: async (email: string, next: NextFunction) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      next(error);
    }
  },
  create: async (user: IUser, next: NextFunction) => {
    try {
      const createUser = new User(user);

      const newUser = await createUser.save();

      return newUser;
    } catch (error) {
      next(error);
    }
  },
};

export default UserRepositories;
