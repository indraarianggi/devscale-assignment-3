import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepositories from "../repositories/user.repository";
import AuthRepositories from "../repositories/auth.repository";

const UserControllers = {
  handleRegisterUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // input validation
    if (!name || !email || password?.length < 8) {
      return res.status(400).json({ message: "invalid input" });
    }

    try {
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserRepositories.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: "User register success!" });
    } catch (error) {
      console.log(`Error in UserControllers.create: ${error}`);
    }
  },
  handleLoginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // input validation
    if (!email || password?.length < 8) {
      return res.status(400).json({ message: "invalid input" });
    }

    try {
      // find user by email
      const user = await UserRepositories.getByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      if (!user.password) {
        return res.status(400).json({ message: "password not set" });
      }

      // password validation
      const isPasswordMatch = await bcrypt.compare(password, user.password!);

      if (!isPasswordMatch) {
        return res.status(403).json({ message: "invalid password" });
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
      await AuthRepositories.create({ userId: user.id, refreshToken });

      res
        .cookie("accessToken", accessToken, { httpOnly: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "Login success!" });
    } catch (error) {}
  },
};

export default UserControllers;
