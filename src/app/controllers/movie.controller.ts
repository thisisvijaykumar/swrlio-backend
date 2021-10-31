import * as Joi from "@hapi/joi";
import { Request, Response } from "express";

import MovieSerivce from "../services/movie.service";

export default class MovieCtrl {
  public static async getAllMovies(req: Request, res: Response) {
    try {
      console.log("api call");

      const data = await MovieSerivce.getAllMovies({
        limit: req.query.limit ?? 50,
        query: req.query.query ?? "",
        order: req.query.order ?? "ASC",
        start: req.query.start ?? 0,
      });
      res.status(200).send({
        ...data,
        msg: "Successfully retreived movies",
      });
    } catch (error) {
      res.status(400).send({
        code: 400,
        msg: "Something went wrong",
        error: error,
      });
    }
  }
  public static async getMoviesWithUserRating(req: Request, res: Response) {
    try {

      const options = {
        limit: req.query.limit ?? 50,
        query: req.query.query ?? "",
        order: req.query.order ?? "ASC",
        start: req.query.start ?? 0,
        user_id: req["user_id"],
      };
      console.log(req.query,"api films call");

      const data = await MovieSerivce.getMoviesWithUserRating(options);
      res.status(200).send({
        ...data,
        msg: "Successfully retreived movies",
      });
    } catch (error) {
      res.status(400).send({
        code: 400,
        msg: "Something went wrong",
        error: error,
      });
    }
  }

  public static async getMyListOfMovies(req: Request, res: Response) {
    try {

      const options = {
        limit: req.query.limit ?? 50,
        query: req.query.query ?? "",
        order: req.query.order ?? "ASC",
        start: req.query.start ?? 0,
        user_id: req["user_id"],
      };
      console.log(req.query,"api films call");

      const data = await MovieSerivce.getMyListOfMovies(options);
      res.status(200).send({
        ...data,
        msg: "Successfully retreived movies",
      });
    } catch (error) {
      res.status(400).send({
        code: 400,
        msg: "Something went wrong",
        error: error,
      });
    }
  }
}
