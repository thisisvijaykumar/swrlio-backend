import * as Joi from "@hapi/joi";
import { Request, Response } from "express";

import AuthSerivce from "../services/auth.service";

export default class AuthCtrl {
  public static async login(req: Request, res: Response) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const input = {
      email: req.body.email,
      password: req.body.password,
    };

    const validateResult = schema.validate(input);
    if (validateResult.error) {
      res.status(401).send({
        code: 401,
        msg: "email and password is required",
      });
    } else {
      try {
        const data = await AuthSerivce.login(input);

        res.status(200).send({
          ...data,
          message:"Successfully logged in"
        });
      } catch (error) {
        res.status(400).send({
          code: 400,
          msg: "Bad Credentials",
          error,
        });
      }
    }
  }
  public static async signup(req: Request, res: Response) {
    const schema = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required(),
      name: Joi.string().required(),
      profile_photo: Joi.string().allow("", null),
    });

    const input = {
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      profile_photo: req.body.profile_photo,
    };
    console.log(input, "signup");
    const validateResult = schema.validate(input);
    if (validateResult.error) {
      res.status(403).send({
        code: 401,
        msg: "Input details are wrong",
        error: validateResult.error,
      });
    } else {
      try {
        const data = await AuthSerivce.signup(input);

        res.status(200).send({
          ...data,
          msg: "Successfully user created",
        });
      } catch (error) {
        res.status(400).send({
          code: 400,
          msg: "Somthing went wrong",
          error,
        });
      }
    }
  }
}
