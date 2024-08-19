import bcrypt from "bcrypt";

import { IUser } from "../types";
import UserRepositories from "../repositories/user.repository";
import { createError } from "../utils/error";

const UserServices = {
  create: async (user: IUser) => {
    try {
      const { name, email, password } = user;

      // input validation
      if (!name || !email || password?.length < 8) {
        throw createError(
          400,
          "name or email can not be empty, and password must contains 8 or more characters"
        );
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserRepositories.create({
        name,
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
