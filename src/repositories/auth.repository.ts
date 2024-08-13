import { Auth } from "../models/auth.schema";
import { IAuth } from "../types";

const AuthRepositories = {
  create: async (auth: IAuth) => {
    try {
      const newRefreshToken = new Auth(auth);

      await newRefreshToken.save();
    } catch (error) {
      console.log(`Error in AuthRepositories.create: ${error}`);
    }
  },
};

export default AuthRepositories;
