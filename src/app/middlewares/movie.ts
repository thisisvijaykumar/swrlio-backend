import { NextFunction, Request, Response } from "express";

import validate from "./validate-token";

const MovieValidate = async (
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
      }
    }
    next();
  } catch (error) {
    return res.status(403).send({
      code: 403,
      msg: "Invalid Token",
      error,
    });
  }
};

export default MovieValidate;
