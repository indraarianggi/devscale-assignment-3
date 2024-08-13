import { User } from "../models/user.schema";
import { IUser } from "../types";

const UserRepositories = {
  getByEmail: async (email: string) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(`Error in UserRepositories.getByEmail: ${error}`);
    }
  },
  create: async (user: IUser) => {
    try {
      const createUser = new User(user);

      const newUser = await createUser.save();

      return newUser;
    } catch (error) {
      console.log(`Error in UserRepositories.create: ${error}`);
    }
  },
};

export default UserRepositories;
