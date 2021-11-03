import { NextFunction, Request, Response } from "express";
import validate from "./validate-token";

const UserValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("x-token");
    if (token) {
      const userId = await validate(token);
      if (userId) {
        req["user_id"] = userId;
        return next();
      }
    }
  } catch (error) {
    console.error(error);
  }
  res.status(401).json({
    code: 401,
    message: "Unauthorized",
  });
};

export default UserValidate;
