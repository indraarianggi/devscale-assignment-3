import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthRepositories from "../repositories/auth.repository";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies ?? {};

  // check if access token exists
  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
      next();
    } catch (error1) {
      // access token invalid -> generate new one

      try {
        // check if refresh token exists
        if (!refreshToken) {
          throw {
            statusCode: 401,
            error: new Error("please re-login..."),
          };
        }

        // check if refresh token valid
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

        // if valid, check if refresh token exists in database
        const activeRefreshToken = await AuthRepositories.getOne(
          refreshToken,
          next
        );

        if (!activeRefreshToken) {
          throw {
            statusCode: 401,
            error: new Error("please re-login..."),
          };
        }

        const payload = jwt.decode(refreshToken) as {
          id: string;
          name: string;
          email: string;
        };

        // generate new access token
        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          process.env.JWT_ACCESS_SECRET as string,
          { expiresIn: process.env.JWT_ACCESS_EXPIRES_TIME || 360 }
        );

        res.cookie("accessToken", newAccessToken, { httpOnly: true });
        next();
      } catch (error) {
        next(error);
      }
    }
  } else {
    next({
      statusCode: 401,
      error: new Error("access token not provided"),
    });
  }
};
