import { User } from "../models/user.schema";
import { IUser } from "../types";

const UserRepositories = {
  getByEmail: async (email: string) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  },
  create: async (user: IUser) => {
    try {
      const createUser = new User(user);

      const newUser = await createUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  },
};

export default UserRepositories;
