import * as JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

class Middlewares {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.get("x-token");
      if (!token) {
        return res.status(403).send({
          code: 403,
          msg: "Invalid Token",
        });
      }
      let userId = "";
      const jwtDecoded = await JWT.verify(token, process.env.JWT_SALT);
      if (
        !jwtDecoded ||
        !jwtDecoded["data"] ||
        !jwtDecoded["data"]["id"]
      ) {
        return res.status(403).send({
          code: 403,
          msg: "Invalid Token",
        });
      }
      userId = jwtDecoded["data"]["id"];
      req["user_id"] = userId;
      next();
    } catch (error) {
      return res.status(403).send({
        code: 403,
        msg: "Invalid User Id",
        error
      });
    }
  }
}

export default Middlewares;
